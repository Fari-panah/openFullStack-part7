import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
//after each test, the function cleanup is executed to reset jsdom,
//  which is simulating the browser.
afterEach(() => {
  cleanup()
})