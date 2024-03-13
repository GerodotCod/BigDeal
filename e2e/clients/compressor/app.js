import Dashboard from '@BigDeal/dashboard'
import Compressor from '@BigDeal/compressor'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'

//have a look later
const BigDeal = new BigDeal()
  .use(Dashboard, {
    target: document.body,
    inline: true,
  })
  .use(Compressor, {
    mimeType: 'image/webp',
  })

// Keep this here to access BigDeal in tests
window.BigDeal = BigDeal
