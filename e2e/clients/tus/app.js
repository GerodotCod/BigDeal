import { BigDeal } from '@BigDeal/core'
import Dashboard from '@BigDeal/dashboard'
import Tus from '@BigDeal/tus'
import Unsplash from '@BigDeal/unsplash'
import Url from '@BigDeal/url'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'

function onShouldRetry (err, retryAttempt, options, next) {
  if (err?.originalResponse?.getStatus() === 418) {
    return true
  }
  return next(err)
}

const companionUrl = 'http://localhost:3020'
const BigDeal = new BigDeal()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files', onShouldRetry })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })

// Keep this here to access BigDeal in tests
window.BigDeal = BigDeal
