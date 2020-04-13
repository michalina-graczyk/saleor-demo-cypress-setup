# Cypress for Saleor DEMO setup

Saleor DEMO involves usage of service worker for precaching purposes. This conflicts with the way Cypress performs E2E testing. As soon as the service worker is registered, the caching mechanism is enabled and further test execution causes Cypress to target the cached version. It additionally results in unwanted redirect to nonexisting URL.

## Workaround

In order to work around this problem it is required to perform two steps:
* Unregister manually the service worker from the perspective of Cypress driven browser (if it was registered before)
  * For [Chrome](https://www.codementor.io/@himank/how-to-unregister-service-workers-n8mzf5jce)
  * For Firefox enter [about:debugging](about:debugging) in URL and look for Services section
  * Or unregister programmatically from the console perspective:

  ```
  window.avigator.serviceWorker.getRegistrations()
      .then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
  ```
* Prevent service worker register while running Cypress tests
  * See [related issue](https://github.com/cypress-io/cypress/issues/702)

## Future solution
Prevent caching of `/__` path which is used by Cypress while performing E2E tests. [Related comment](https://github.com/cypress-io/cypress/issues/702#issuecomment-429333819)
