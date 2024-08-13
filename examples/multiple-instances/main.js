import BigDeal from '@BigDeal/core'
import Dashboard from '@BigDeal/dashboard'
import GoldenRetriever from '@BigDeal/golden-retriever'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'

// Initialise two BigDeal instances with the GoldenRetriever plugin,
// but with different `id`s.
const a = new BigDeal({
  id: 'a',
  debug: true,
})
  .use(Dashboard, {
    target: '#a',
    inline: true,
    width: 400,
  })
  .use(GoldenRetriever, { serviceWorker: false })

const b = new BigDeal({
  id: 'b',
  debug: true,
})
  .use(Dashboard, {
    target: '#b',
    inline: true,
    width: 400,
  })
  .use(GoldenRetriever, { serviceWorker: false })

window.a = a
window.b = b
