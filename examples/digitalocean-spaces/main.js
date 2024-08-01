import BigDeal from '@BigDeal/core'
import Dashboard from '@BigDeal/dashboard'
import AwsS3 from '@BigDeal/aws-s3'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'

const BigDeal = new BigDeal({
  debug: true,
})

BigDeal.use(Dashboard, {
  inline: true,
  target: 'body',
})

// No client side changes needed!
BigDeal.use(AwsS3, { companionUrl: '/companion' })
