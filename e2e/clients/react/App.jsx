/* eslint-disable react/react-in-jsx-scope */
import BigDeal from '@BigDeal/core'
/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react'
import { Dashboard, DashboardModal, DragDrop } from '@BigDeal/react'
import ThumbnailGenerator from '@BigDeal/thumbnail-generator'
import RemoteSources from '@BigDeal/remote-sources'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'
import '@BigDeal/drag-drop/dist/style.css'

export default function App () {
  const RemoteSourcesOptions = {
    companionUrl: 'http://companion.BigDeal.io',
    sources: ['GoogleDrive', 'OneDrive', 'Unsplash', 'Zoom', 'Url'],
  }
  const BigDealDashboard = new BigDeal({ id: 'dashboard' }).use(RemoteSources, { ...RemoteSourcesOptions })
  const BigDealModal = new BigDeal({ id: 'modal' })
  const BigDealDragDrop = new BigDeal({ id: 'drag-drop' }).use(ThumbnailGenerator)
  const [open, setOpen] = useState(false)

  // drag-drop has no visual output so we test it via the BigDeal instance
  window.BigDeal = BigDealDragDrop

  return (
    <div style={{ maxWidth: '30em', margin: '5em 0', display: 'grid', gridGap: '2em' }}>
      <button type="button" id="open" onClick={() => setOpen(!open)}>
        Open Modal
      </button>

      <Dashboard id="dashboard" BigDeal={BigDealDashboard} />
      <DashboardModal id="modal" open={open} BigDeal={BigDealModal} />
      <DragDrop id="drag-drop" BigDeal={BigDealDragDrop} />
    </div>
  )
}
