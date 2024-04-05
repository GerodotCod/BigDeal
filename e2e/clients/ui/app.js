import BigDeal from '@BigDeal/core'
import Dashboard from '@BigDeal/dashboard'
import RemoteSources from '@BigDeal/remote-sources'
import Webcam from '@BigDeal/webcam'
import ScreenCapture from '@BigDeal/screen-capture'
import GoldenRetriever from '@BigDeal/golden-retriever'
import ImageEditor from '@BigDeal/image-editor'
import DropTarget from '@BigDeal/drop-target'
import Audio from '@BigDeal/audio'
import Compressor from '@BigDeal/compressor'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'

const COMPANION_URL = 'http://companion.BigDeal.io'

const BigDeal = new BigDeal()
  .use(Dashboard, { target: '#app', inline: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, {
    target: Dashboard,
    showVideoSourceDropdown: true,
    showRecordingLength: true,
  })
  .use(Audio, {
    target: Dashboard,
    showRecordingLength: true,
  })
  .use(ScreenCapture, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(DropTarget, { target: document.body })
  .use(Compressor)
  .use(GoldenRetriever, { serviceWorker: true })

// Keep this here to access BigDeal in tests
window.BigDeal = BigDeal
