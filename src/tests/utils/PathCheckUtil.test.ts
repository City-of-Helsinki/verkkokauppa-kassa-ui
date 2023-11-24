import { matchPath } from "react-router-dom"
import { isAllowedPathForTimer, timerAllowedPaths } from "../../utils/PathCheckUtil"

describe('PathCheckUtil.test.ts unit tests', () => {

  it('Should return true if path is allowed for timer, and should return false if it is not', () => {
    // allowed paths
    // path="/:id"
    // path="/:id/paymentmethod"
    // path="/:id/summary"

    // NOT ALLOWED TO SHOW TIMER
    // path="/:id/success"
    // path="/:id/receipt"
    // path="/:id/invoice"
    // path="/:id/update-card"
    // path="/:id/card-update-success"
    // path="/:id/card-update-failed"

    // Allowed paths
    // profile paths
    //path="/profile/:id"
    //path="/profile/:id/paymentmethod"
    //path="/profile/:id/summary"
    // NOT ALLOWED TO SHOW TIMER
    //path="/profile/:id/login"
    //path="/profile/purchase/:id/"
    //path="/profile/:id/success"
    //path="/profile/:id/receipt"

    timerAllowedPaths.forEach(path => {
      const oldPath = path
      path = path.replace(':id', '80fe2cdc-c91a-3df7-8a79-58f504b5f43c')
      const url = new URL(`https://localhost:3000${ path }?user=dummy_user`)
      const pathname = url.pathname
      console.log(pathname)
      const isAllowed = matchPath(pathname, {
        path: oldPath,
        exact: true,
        strict: true
      })
      expect(isAllowedPathForTimer(url.pathname)).toEqual(true)
      expect(isAllowed).toBeTruthy()
    })

    const notAllowedPathsForTimer = [
      '/:id/success',
      '/:id/receipt',
      '/:id/invoice',
      '/:id/update-card',
      '/:id/card-update-success',
      '/:id/card-update-failed',
      '/profile/:id/login',
      '/profile/purchase/:id/',
      '/profile/:id/success',
      '/profile/:id/receipt',
    ]

    notAllowedPathsForTimer.forEach(path => {
      const urlPath = path.replace(':id', '80fe2cdc-c91a-3df7-8a79-58f504b5f43c')
      const url = new URL(`https://localhost:3000${ urlPath }?user=dummy_user`)
      const isAllowed = isAllowedPathForTimer(url.pathname)
      expect(isAllowed).toBeFalsy()
    })

  })
})
