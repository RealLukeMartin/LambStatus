import { Metrics } from 'model/metrics'

export async function handle (event, context, callback) {
  try {
    let externalMetrics = await new Metrics().listExternal(event.type)
    externalMetrics = externalMetrics.filter((metric) => {
      return metric.Dimensions.reduce((prev, dim) => {
        return prev || dim.Value.includes('demo') || dim.Value.includes('Demo')
      }, false)
    })
    externalMetrics.reverse()
    callback(null, JSON.stringify(externalMetrics))
  } catch (error) {
    console.log(error.message)
    console.log(error.stack)
    callback('Error: failed to get external metrics list')
  }
}
