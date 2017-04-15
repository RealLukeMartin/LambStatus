import { Metrics, MetricsData } from 'model/metrics'
import https from 'https'

const dummyAPICall = () => {
  return new Promise((resolve, reject) => {
    https.get('https://zvizf3w876.execute-api.ap-northeast-1.amazonaws.com/prod/components', (resp) => {
      let body = ''
      resp.on('data', (d) => {
        body += d
      })
      resp.on('end', () => {
        resolve(body)
      })
    }).on('error', (e) => {
      reject(e.message)
    })
  })
}

export async function handle (event, context, callback) {
  // Continuously access API Gateway to generate demo data.
  await dummyAPICall()

  try {
    const metrics = await new Metrics().list()
    await Promise.all(metrics.map(async (metric) => {
      const metricsData = new MetricsData(metric.metricID, metric.type, metric.props, event.StatusPageS3BucketName)
      await metricsData.collect()
    }))
    callback(null)
  } catch (error) {
    console.log(error.message)
    console.log(error.stack)
    callback('Error: failed to collect metrics data')
  }
}
