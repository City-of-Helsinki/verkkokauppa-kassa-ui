import { matchPath } from "react-router-dom"
// Tilaajan tiedot
// Maksutapa
// Tilauksen yhteenveto
export const timerAllowedPaths = [
  '/:id',
  '/:id/paymentmethod',
  '/:id/summary',
  '/profile/:id',
  '/profile/:id/paymentmethod',
  '/profile/:id/summary',
]

export const isAllowedPathForTimer = (path: string) => {
  return timerAllowedPaths.some(allowedPath => {
    return matchPath(path, {
      path: allowedPath,
      exact: true,
      strict: true
    })
  })
}