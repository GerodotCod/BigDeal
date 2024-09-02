import BigDeal from '@BigDeal/core'
import Webcam from '@BigDeal/webcam'
import Dashboard from '@BigDeal/dashboard'
import XHRUpload from '@BigDeal/xhr-upload'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'
import '@BigDeal/webcam/dist/style.css'

const BigDeal = new BigDeal({
  debug: true,
  autoProceed: false,
})

BigDeal.use(Webcam)
BigDeal.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['Webcam'],
})
BigDeal.use(XHRUpload, {
  endpoint: 'http://localhost:3020/upload.php',
})
