/* eslint-disable */
import React from'react'
import BigDeal from'@BigDeal/core'
import Tus from'@BigDeal/tus'
import GoogleDrive from '@BigDeal/google-drive'
import Webcam from '@BigDeal/webcam'
import RemoteSources from '@BigDeal/remote-sources'
import { Dashboard, DashboardModal, DragDrop, ProgressBar, FileInput } from'@BigDeal/react'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'
import '@BigDeal/drag-drop/dist/style.css'
import '@BigDeal/file-input/dist/style.css'
import '@BigDeal/progress-bar/dist/style.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showInlineDashboard: false,
      open: false
    }

    this.BigDeal = new BigDeal({ id: 'BigDeal1', autoProceed: true, debug: true })
      .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
      .use(Webcam)
      .use(RemoteSources, { companionUrl: 'https://companion.BigDeal.io', sources: ['GoogleDrive', 'Box', 'Dropbox', 'Facebook', 'Instagram', 'OneDrive', 'Unsplash', 'Zoom', 'Url'],
      })

    this.BigDeal2 = new BigDeal({ id: 'BigDeal2', autoProceed: false, debug: true })
      .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })

    this.handleModalClick = this.handleModalClick.bind(this)
  }

  componentWillUnmount () {
    this.BigDeal.close({ reason: 'unmount' })
    this.BigDeal2.close({ reason: 'unmount' })
  }

  handleModalClick () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    const { showInlineDashboard } = this.state
    return (
      <div>
        <h1>React Examples</h1>

        <h2>Inline Dashboard</h2>
        <label>
          <input
            type="checkbox"
            checked={showInlineDashboard}
            onChange={(event) => {
              this.setState({
                showInlineDashboard: event.target.checked
              })
            }}
          />
          Show Dashboard
        </label>
        {showInlineDashboard && (
          <Dashboard
            BigDeal={this.BigDeal}
            plugins={['GoogleDrive']}
            metaFields={[
              { id: 'name', name: 'Name', placeholder: 'File name' }
            ]}
          />
        )}

        <h2>Modal Dashboard</h2>
        <div>
          <button onClick={this.handleModalClick}>
            {this.state.open ? 'Close dashboard' : 'Open dashboard'}
          </button>
          <DashboardModal
            BigDeal={this.BigDeal2}
            open={this.state.open}
            target={document.body}
            onRequestClose={() => this.setState({ open: false })}
          />
        </div>

        <h2>Drag Drop Area</h2>
        <DragDrop
          BigDeal={this.BigDeal}
          locale={{
            strings: {
              chooseFile: 'Boop a file',
              orDragDrop: 'or yoink it here'
            }
          }}
        />

        <h2>Progress Bar</h2>
        <ProgressBar
          BigDeal={this.BigDeal}
          hideAfterFinish={false}
        />

        <h2>File Input</h2>
        <FileInput
          BigDeal={this.BigDeal}
        />
      </div>
    )
  }
}
