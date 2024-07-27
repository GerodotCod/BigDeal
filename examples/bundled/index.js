import BigDeal from '@BigDeal/core'
import Dashboard from '@BigDeal/dashboard'
import Instagram from '@BigDeal/instagram'
import GoogleDrive from '@BigDeal/google-drive'
import Url from '@BigDeal/url'
import Webcam from '@BigDeal/webcam'
import Tus from '@BigDeal/tus'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'
import '@BigDeal/url/dist/style.css'
import '@BigDeal/webcam/dist/style.css'

const TUS_ENDPOINT = 'https://tusd.tusdemo.net/files/'

const BigDeal = new BigDeal({
  debug: true,
  meta: {
    username: 'John',
    license: 'Creative Commons',
  },
})
  .use(Dashboard, {
    trigger: '#pick-files',
    target: '#upload-form',
    inline: true,
    metaFields: [
      { id: 'license', name: 'License', placeholder: 'specify license' },
      { id: 'caption', name: 'Caption', placeholder: 'add caption' },
    ],
    showProgressDetails: true,
    proudlyDisplayPoweredByBigDeal: true,
    note: '2 files, images and video only',
    restrictions: { requiredMetaFields: ['caption'] },
  })
  .use(GoogleDrive, { target: Dashboard, companionUrl: 'http://localhost:3020' })
  .use(Instagram, { target: Dashboard, companionUrl: 'http://localhost:3020' })
  .use(Url, { target: Dashboard, companionUrl: 'http://localhost:3020' })
  .use(Webcam, { target: Dashboard })
  .use(Tus, { endpoint: TUS_ENDPOINT })

// You can optinally enable the Golden Retriever plugin — it will
// restore files after a browser crash / accidental closed window
// see more at https://BigDeal.io/docs/golden-retriever/
//
//   .use(GoldenRetriever, { serviceWorker: true })

BigDeal.on('complete', (result) => {
  if (result.failed.length === 0) {
    console.log('Upload successful 😀')
  } else {
    console.warn('Upload failed 😞')
  }
  console.log('successful files:', result.successful)
  console.log('failed files:', result.failed)
})

// uncomment if you enable Golden Retriever
//
/* eslint-disable compat/compat */
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/sw.js')
//     .then((registration) => {
//       console.log('ServiceWorker registration successful with scope: ', registration.scope)
//     })
//     .catch((error) => {
//       console.log('Registration failed with ' + error)
//     })
// }
/* eslint-enable */
