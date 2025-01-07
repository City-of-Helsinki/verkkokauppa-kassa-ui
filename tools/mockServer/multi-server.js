// Import dependencies
import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import cors from 'cors'
import { Low } from 'lowdb'
import { v4 as uuidv4 } from 'uuid'
import { JSONFile } from 'lowdb/node'
// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Function to setup LowDB with default data
const setupDB = async (dbFilePath, defaultDataPath) => {
  const adapter = new JSONFile(dbFilePath, {})
  const db = new Low(adapter, {})

  // Read data
  await db.read()

  // If database is empty, initialize with default data
  if (!db.data || Object.keys(db.data).length === 0) {
    if (fs.existsSync(defaultDataPath)) {
      const defaultData = JSON.parse(fs.readFileSync(defaultDataPath, 'utf-8'))
      db.data = defaultData
    } else {
      db.data = { items: [] } // Default structure
    }
    await db.write()
  }

  return db
}

// Define routes and their responses
const createService = async (port, routes, dbFilePath, defaultDataPath, httpsOptions) => {
  const app = express()

  // Setup LowDB
  const db = await setupDB(dbFilePath, defaultDataPath)

  // Middleware to enable CORS for all origins
  app.use(cors())

  // Middleware to parse JSON body
  app.use(express.json())

  // Middleware to ensure all responses have 'Content-Type: application/json'
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })

  // Middleware to log every request and response
  app.use((req, res, next) => {
    const startTime = Date.now()
    res.on('finish', () => {
      const duration = Date.now() - startTime
      console.log(`${ req.method } ${ req.originalUrl } - Status: ${ res.statusCode } - Duration: ${ duration }ms`)
    })
    next()
  })

  // Custom routes
  app.post('/v1/order/:orderId/customer', async (req, res) => {
    const { orderId } = req.params // Extract orderId from the URL
    const { customer } = req.body // Extract customer details from the request body

    try {
      // Read the database
      await db.read()

      // Locate the order by orderId
      const orders = db.data.orders || []
      const orderIndex = orders.findIndex((order) => order.orderId === orderId)

      if (orderIndex === -1) {
        return res.status(404).json({ error: 'Order not found' })
      }

      // Update the customer details for the located order
      orders[orderIndex].customer = {
        ...orders[orderIndex].customer, // Preserve existing fields
        ...customer, // Overwrite with new values
      }

      // Save changes to the database
      db.data.orders = orders
      await db.write()

      // Return the updated order
      res.json(orders[orderIndex])
    } catch (error) {
      console.error('Error updating order:', error)
      res.status(500).json({ error: 'Failed to update order' })
    }
  })

  app.post('/v1/order/:orderId/confirmAndCreatePayment', async (req, res) => {
    const { orderId } = req.params // Extract orderId from the URL
    const { paymentMethod, language, gateway } = req.body // Extract body parameters

    try {
      await db.read() // Read the database

      // Retrieve the order by orderId
      const orders = db.data.orders || []
      const order = orders.find((o) => o.orderId === orderId)

      if (!order) {
        return res.status(404).json({ error: 'Order not found' })
      }
      const orderIndex = orders.findIndex((o) => o.orderId === orderId)

      if (orderIndex === -1) {
        return res.status(404).json({ error: 'Order not found' })
      }

      // Update the order status to confirmed
      orders[orderIndex].status = 'confirmed'

      // Save the updated order back to the database
      db.data.orders = orders
      await db.write()

      // Return a JSON response with the payment gateway
      res.status(200).json({
        payment: {
          paymentGateway: 'free',
          paymentUrl: order.receiptUrl,
        },
      })
    } catch (error) {
      console.error('Error handling confirmAndCreatePayment:', error)
      res.status(500).json({ error: 'Failed to process payment' })
    }
  })


  // CRUD Routes
  routes.forEach(({ path: routePath, method, searchField, collectionName }) => {
    // const collectionName = routePath.replace(/\/:fieldValue/g, '').replace(/\//g, '_').slice(1).replace('v1_','')  // Derive collection name

    if (method === 'GET') {
      // Read all items or by searchField
      app.get(routePath, async (req, res) => {
        await db.read()
        const data = db.data[collectionName] || []
        const fieldValue = req.params.fieldValue
        if (fieldValue) {
          const item = data.find(item => item[searchField] == fieldValue)
          return res.json(item || { error: 'Not found' })
        }
        res.json(data)
      })
    }

    if (method === 'POST') {
      // Create new item
      app.post(routePath.replace('/:fieldValue', ''), async (req, res) => {
        await db.read()
        const data = db.data[collectionName] || []
        const newItem = { id: uuidv4(), ...req.body }
        data.push(newItem)
        db.data[collectionName] = data
        await db.write()
        res.json(newItem)
      })
    }

    if (method === 'PUT') {
      // Update item by searchField
      app.put(routePath, async (req, res) => {
        await db.read()
        const data = db.data[collectionName] || []
        const fieldValue = req.params.fieldValue
        const updates = req.body
        const index = data.findIndex(item => item[searchField] == fieldValue)
        if (index === -1) {
          return res.status(404).json({ error: 'Item not found' })
        }
        data[index] = { ...data[index], ...updates }
        db.data[collectionName] = data
        await db.write()
        res.json(data[index])
      })
    }

    if (method === 'DELETE') {
      // Delete item by searchField
      app.delete(routePath, async (req, res) => {
        await db.read()
        const data = db.data[collectionName] || []
        const fieldValue = req.params.fieldValue
        const index = data.findIndex(item => item[searchField] == fieldValue)
        if (index === -1) {
          return res.status(404).json({ error: 'Item not found' })
        }
        const deletedItem = data.splice(index, 1)
        db.data[collectionName] = data
        await db.write()
        res.json(deletedItem[0])
      })
    }
  })


  // app.get('/v1/payment/:orderId/paymentMethods', async (req, res) => {
  //   const { orderId } = req.params; // Extract orderId from the route
  //   try {
  //     await db.read();
  //
  //     // Simulate retrieving payment methods (replace with actual logic if needed)
  //     const paymentMethods = db.data || {};
  //
  //     // Example: You could filter or validate based on orderId if needed
  //     if (!orderId) {
  //       return res.status(400).json({ error: 'Order ID is required' });
  //     }
  //
  //     // Return the payment methods
  //     res.json(paymentMethods);
  //   } catch (error) {
  //     console.error('Error retrieving payment methods:', error);
  //     res.status(500).json({ error: 'Failed to retrieve payment methods' });
  //   }
  // });

  const listRoutes = (app) => {
    console.log('Registered routes:')
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        // This is a route middleware
        const { path } = middleware.route
        const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase()
        console.log(`${ methods } ${ path }`)
      } else if (middleware.name === 'router') {
        // This is a router middleware (contains nested routes)
        middleware.handle.stack.forEach((nestedMiddleware) => {
          if (nestedMiddleware.route) {
            const { path } = nestedMiddleware.route
            const methods = Object.keys(nestedMiddleware.route.methods).join(', ').toUpperCase()
            console.log(`${ methods } ${ path }`)
          }
        })
      }
    })
  }

  listRoutes(app)

  // Start the server
  if (httpsOptions) {
    https.createServer(httpsOptions, app).listen(port, () => {
      console.log(`Service running on https://localhost:${ port }`)
    })
  } else {
    app.listen(port, () => {
      console.log(`Service running on http://localhost:${ port }`)
    })
  }

}

const REACT_APP_ORDER_API_URL = 'http://localhost:8084/v1/order/'
const REACT_APP_PAYMENT_API_URL = 'https://example.test:8285/v1/payment/'
const REACT_APP_MERCHANT_API_URL = 'http://localhost:8086/v1/merchant/'

// HTTPS options with key and cert files
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '../../config/cert.key')),
  cert: fs.readFileSync(path.join(__dirname, '../../config/cert.crt')),
}

// Define routes for each service and start them
createService(
  8084,
  [
    { path: '/v1/order/:fieldValue', method: 'GET', searchField: 'orderId', collectionName: 'orders' },
    { path: '/v1/order', method: 'POST', searchField: 'orderId', collectionName: 'orders' },
    { path: '/v1/order/:fieldValue', method: 'PUT', searchField: 'orderId', collectionName: 'orders' },
    { path: '/v1/order/:fieldValue', method: 'DELETE', searchField: 'orderId', collectionName: 'orders' },
    // { path: '/v1/order/:orderId/customer', method: 'POST', searchField: 'orderId', collectionName: 'orders' },
  ],
  path.join(__dirname, './db/order.json'),
  path.join(__dirname, './defaultData/orderDefault.json'),
  null
)

createService(
  8285,
  [
    { path: '/v1/payment/:orderId/paymentMethods', method: 'GET', collectionName: 'paymentMethods' },
    { path: '/v1/payment/:orderId', method: 'GET', searchField: 'orderId', collectionName: 'payments' },
  ],
  './db/payment.json',
  './defaultData/paymentDefault.json',
  httpsOptions
)