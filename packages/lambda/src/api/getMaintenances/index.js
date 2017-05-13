import { Maintenances } from 'model/maintenances'

export async function handle (event, context, callback) {
  try {
    let maintenances = await new Maintenances().all()

    // Show the maintenances as if will happen tomorrow.
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowDate = tomorrow.toISOString().replace(/T[0-9:.]+Z$/, '')
    maintenances = maintenances.map((maintenance) => {
      maintenance.updatedAt = tomorrowDate + maintenance.updatedAt.replace(/^[0-9-]+/, '')
      maintenance.startAt = tomorrowDate + maintenance.startAt.replace(/^[0-9-]+/, '')
      maintenance.endAt = tomorrowDate + maintenance.endAt.replace(/^[0-9-]+/, '')
      return maintenance
    })
    callback(null, JSON.stringify(maintenances.map(maintenance => maintenance.objectify())))
  } catch (error) {
    console.log(error.message)
    console.log(error.stack)
    callback('Error: failed to get maintenances list')
  }
}
