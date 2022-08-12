import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}"
    // viewportWidth: 375,
    // viewportHeight: 667
  }
})
