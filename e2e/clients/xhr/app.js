import { BigDeal } from '@BigDeal/core'
import Dashboard from '@BigDeal/dashboard'
import XHRUpload from '@BigDeal/xhr-upload'
import Unsplash from '@BigDeal/unsplash'
import Url from '@BigDeal/url'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'

const companionUrl = 'http://localhost:3020'
const BigDeal = new BigDeal()
  .use(Dashboard, { target: '#app', inline: true })
  .use(XHRUpload, { endpoint: 'https://xhr-server.herokuapp.com/upload', limit: 6 })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })

// Keep this here to access BigDeal in tests
window.BigDeal = BigDeal
