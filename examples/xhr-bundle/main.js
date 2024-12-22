import BigDeal from '@BigDeal/core'
import Dashboard from '@BigDeal/dashboard'
import XHRUpload from '@BigDeal/xhr-upload'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'

const BigDeal = new BigDeal({
  debug: true,
  meta: { something: 'xyz' },
})

BigDeal.use(Dashboard, {
  target: '#app',
  inline: true,
  hideRetryButton: true,
  hideCancelButton: true,
})

BigDeal.use(XHRUpload, {
  bundle: true,
  endpoint: 'http://localhost:9967/upload',
  allowedMetaFields: ['something'],
  fieldName: 'files',
})
