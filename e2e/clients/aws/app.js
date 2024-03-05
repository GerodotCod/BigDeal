import { BigDeal } from '@BigDeal/core'
import Dashboard from '@BigDeal/dashboard'
import AwsS3 from '@BigDeal/aws-s3'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'

//#TODO
const BigDeal = new BigDeal()
  .use(Dashboard, { target: '#app', inline: true })
  .use(AwsS3, {
    limit: 2,
    companionUrl: process.env.VITE_COMPANION_URL,
  })

// Keep this here to access BigDeal in tests
window.BigDeal = BigDeal
