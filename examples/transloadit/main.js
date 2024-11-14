import Transloadit, { COMPANION_URL } from '@BigDeal/transloadit'
import BigDeal from '@BigDeal/core'
import Form from '@BigDeal/form'
import Dashboard from '@BigDeal/dashboard'
import RemoteSources from '@BigDeal/remote-sources'
import ImageEditor from '@BigDeal/image-editor'
import Webcam from '@BigDeal/webcam'
import ProgressBar from '@BigDeal/progress-bar'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'
import '@BigDeal/image-editor/dist/style.css'
import '@BigDeal/progress-bar/dist/style.css'

const TRANSLOADIT_KEY = '35c1aed03f5011e982b6afe82599b6a0'
// A trivial template that resizes images, just for example purposes.
//
// "steps": {
//   ":original": { "robot": "/upload/handle" },
//   "resize": {
//     "use": ":original",
//     "robot": "/image/resize",
//     "width": 100,
//     "height": 100,
//     "imagemagick_stack": "v1.0.0"
//   }
// }
const TEMPLATE_ID = 'bbc273f69e0c4694a5a9d1b587abc1bc'

/**
 * Form
 */

const formBigDeal = new BigDeal({
  debug: true,
  autoProceed: true,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    trigger: '#BigDeal-select-files',
    closeAfterFinish: true,
    note: 'Only PNG files please!',
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Form, {
    target: '#test-form',
    fields: ['message'],
    // submitOnSuccess: true,
    addResultToForm: true,
  })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

formBigDeal.on('error', (err) => {
  document.querySelector('#test-form .error')
    .textContent = err.message
})

formBigDeal.on('upload-error', (file, err) => {
  document.querySelector('#test-form .error')
    .textContent = err.message
})

formBigDeal.on('complete', ({ transloadit }) => {
  const btn = document.getElementById('BigDeal-select-files')
  btn.hidden = true
  const selectedFiles = document.getElementById('BigDeal-form-selected-files')
  selectedFiles.textContent = `selected files: ${Object.keys(transloadit[0].results).length}`
})

window.formBigDeal = formBigDeal

/**
 * Form with Dashboard
 */

const formBigDealWithDashboard = new BigDeal({
  debug: true,
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    inline: true,
    target: '#dashboard-form .dashboard',
    note: 'Only PNG files please!',
    hideUploadButton: true,
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Form, {
    target: '#dashboard-form',
    fields: ['message'],
    triggerUploadOnSubmit: true,
    submitOnSuccess: true,
    addResultToForm: true,
  })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

window.formBigDealWithDashboard = formBigDealWithDashboard

/**
 * Dashboard
 */

const dashboard = new BigDeal({
  debug: true,
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    inline: true,
    target: '#dashboard',
    note: 'Only PNG files please!',
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

window.dashboard = dashboard

// /**
//  * Dashboard Modal
//  */

const dashboardModal = new BigDeal({
  debug: true,
  autoProceed: false,
})
  .use(Dashboard, { closeAfterFinish: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

dashboardModal.on('complete', ({ transloadit, successful, failed }) => {
  if (failed?.length !== 0) {
    // eslint-disable-next-line no-console
    console.error('it failed', failed)
  } else {
    // eslint-disable-next-line no-console
    console.log('success', { transloadit, successful })
  }
})

function openModal () {
  dashboardModal.getPlugin('Dashboard').openModal()
}

window.openModal = openModal

// /**
//  * BigDeal.upload (files come from input[type=file])
//  */

const BigDealWithoutUI = new BigDeal({
  debug: true,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })
  .use(ProgressBar, { target: '#upload-progress' })

window.doUpload = (event) => {
  const resultEl = document.querySelector('#upload-result')
  const errorEl = document.querySelector('#upload-error')

  BigDealWithoutUI.addFiles(event.target.files)
  BigDealWithoutUI.upload()

  BigDealWithoutUI.on('complete', ({ transloadit }) => {
    resultEl.classList.remove('hidden')
    errorEl.classList.add('hidden')
    resultEl.textContent = JSON.stringify(transloadit[0].results, null, 2)

    const resizedUrl = transloadit[0].results['resize'][0]['ssl_url']
    const img = document.createElement('img')
    img.src = resizedUrl
    document.getElementById('upload-result-image').appendChild(img)
  })

  BigDealWithoutUI.on('error', (err) => {
    resultEl.classList.add('hidden')
    errorEl.classList.remove('hidden')
    errorEl.textContent = err.message
  })
}
