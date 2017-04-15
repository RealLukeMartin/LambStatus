import { Incidents } from 'model/incidents'

export async function handle (event, context, callback) {
  try {
    const incidents = new Incidents()
    const incident = await incidents.lookup(event.params.incidentid)
    let incidentUpdates = await incident.getIncidentUpdates()

    // Show the incident updates as if they have happened yesterday.
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayDate = yesterday.toISOString().replace(/T[0-9:.]+Z$/, '')
    incidentUpdates = incidentUpdates.map(incidentUpdate => {
      incidentUpdate.updatedAt = yesterdayDate + incidentUpdate.updatedAt.replace(/^[0-9-]+/, '')
      return incidentUpdate
    })
    callback(null, JSON.stringify(incidentUpdates))
  } catch (error) {
    console.log(error.message)
    console.log(error.stack)
    switch (error.name) {
      case 'NotFoundError':
        callback('Error: an item not found')
        break
      default:
        callback('Error: failed to get incident updates')
    }
  }
}
