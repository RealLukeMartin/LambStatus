import { Maintenances } from 'model/maintenances'

export async function handle (event, context, callback) {
  try {
    const maintenances = new Maintenances()
    const maintenance = await maintenances.lookup(event.params.maintenanceid)
    let maintenanceUpdates = await maintenance.getMaintenanceUpdates()

    // Show the incidents as if the incident has happened yesterday.
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayDate = yesterday.toISOString().replace(/T[0-9:.]+Z$/, '')
    maintenanceUpdates = maintenanceUpdates.map(maintenanceUpdate => {
      maintenanceUpdate.updatedAt = yesterdayDate + maintenanceUpdate.updatedAt.replace(/^[0-9-]+/, '')
      return maintenanceUpdate
    })
    callback(null, JSON.stringify(maintenanceUpdates))
  } catch (error) {
    console.log(error.message)
    console.log(error.stack)
    switch (error.name) {
      case 'NotFoundError':
        callback('Error: an item not found')
        break
      default:
        callback('Error: failed to get maintenance updates')
    }
  }
}
