import Dashboard from '@BigDeal/dashboard'
import AwsS3Multipart from '@BigDeal/aws-s3-multipart'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'

const BigDeal = new BigDeal()
  .use(Dashboard, { target: '#app', inline: true })
  .use(AwsS3Multipart, {
    limit: 2,
    companionUrl: process.env.VITE_COMPANION_URL,
    async prepareUploadParts (file, { uploadId, key, parts, signal }) {
      const { number: partNumber, chunk: body } = parts[0]
      const plugin = BigDeal.getPlugin('AwsS3Multipart')
      const { url } = await plugin.signPart(file, { uploadId, key, partNumber, body, signal })
      return { presignedUrls: { [partNumber]: url } }
    },
  })

window.BigDeal = BigDeal
