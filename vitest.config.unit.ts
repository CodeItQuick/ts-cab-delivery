// vitest.config.unit.ts

import { defineConfig } from 'vitest/config'

import { config } from 'dotenv';

const env = config({ path: '.env.test' });
console.log(env.parsed)
export default defineConfig({
    test: {
        include: ['tests/**/*.spec.ts'],
        env: env.parsed,
    },
    resolve: {
        alias: {
            // auth: '/src/auth',
            // quotes: '/src/quotes',
            // lib: '/src/lib'
        }
    }
})