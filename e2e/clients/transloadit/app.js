import { BigDeal } from '@BigDeal/core'
import Dashboard from '@BigDeal/dashboard'
import Transloadit from '@BigDeal/transloadit'

import generateSignatureIfSecret from './generateSignatureIfSecret.js'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'

// Environment variables:
// https://en.parceljs.org/env.html
const BigDeal = new BigDeal()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Transloadit, {
    service: process.env.VITE_TRANSLOADIT_SERVICE_URL,
    waitForEncoding: true,
    getAssemblyOptions: () => generateSignatureIfSecret(process.env.VITE_TRANSLOADIT_SECRET, {
      auth: { key: process.env.VITE_TRANSLOADIT_KEY },
      template_id: process.env.VITE_TRANSLOADIT_TEMPLATE,
    }),
  })

// Keep this here to access BigDeal in tests
window.BigDeal = BigDeal
