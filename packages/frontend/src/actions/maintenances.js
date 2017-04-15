import 'whatwg-fetch'
import { sendRequest, buildHeaders } from 'utils/fetch'
import { apiURL } from 'utils/settings'

export const LIST_MAINTENANCES = 'LIST_MAINTENANCES'
export const LIST_MAINTENANCE_UPDATES = 'LIST_MAINTENANCE_UPDATES'
export const ADD_MAINTENANCE = 'ADD_MAINTENANCE'
export const EDIT_MAINTENANCE = 'EDIT_MAINTENANCE'
export const REMOVE_MAINTENANCE = 'REMOVE_MAINTENANCE'

export function listMaintenances (json) {
  return {
    type: LIST_MAINTENANCES,
    maintenances: json
  }
}

export function listMaintenanceUpdates (json, maintenanceID) {
  return {
    type: LIST_MAINTENANCE_UPDATES,
    maintenanceUpdates: json,
    maintenanceID: maintenanceID
  }
}

export function addMaintenance (json) {
  return {
    type: ADD_MAINTENANCE,
    response: json
  }
}

export function editMaintenance (json) {
  return {
    type: EDIT_MAINTENANCE,
    response: json
  }
}

export function removeMaintenance (maintenanceID) {
  return {
    type: REMOVE_MAINTENANCE,
    maintenanceID: maintenanceID
  }
}

export const fetchMaintenances = (callbacks = {}) => {
  return async dispatch => {
    try {
      const json = await sendRequest(apiURL + 'maintenances', {}, callbacks)
      dispatch(listMaintenances(json))
    } catch (error) {
    }
  }
}

export const fetchMaintenanceUpdates = (maintenanceID, callbacks = {}) => {
  return async dispatch => {
    try {
      const json = await sendRequest(apiURL + 'maintenances/' + maintenanceID + '/maintenanceupdates', {}, callbacks)
      dispatch(listMaintenanceUpdates(json, maintenanceID))
    } catch (error) {
    }
  }
}

export const postMaintenance = (name, maintenanceStatus, startAt, endAt, message, components, callbacks = {}) => {
  return async dispatch => {
    try {
      const body = { name, maintenanceStatus, startAt, endAt, message, components }
      const json = await sendRequest(apiURL + 'maintenances', {
        headers: buildHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
      }, callbacks)
      dispatch(addMaintenance(json))
    } catch (error) {
    }
  }
}

export const updateMaintenance = (maintenanceID, name, maintenanceStatus, startAt, endAt, message,
                                  components, callbacks = {}) => {
  return async dispatch => {
    try {
      const body = { name, maintenanceStatus, startAt, endAt, message, components }
      const json = await sendRequest(apiURL + 'maintenances/' + maintenanceID, {
        headers: buildHeaders(),
        method: 'PATCH',
        body: JSON.stringify(body)
      }, callbacks)
      dispatch(editMaintenance(json))
    } catch (error) {
    }
  }
}

export const deleteMaintenance = (maintenanceID, callbacks = {}) => {
  return async dispatch => {
    try {
      await sendRequest(apiURL + 'maintenances/' + maintenanceID, {
        headers: buildHeaders(),
        method: 'DELETE'
      }, callbacks)
      dispatch(removeMaintenance(maintenanceID))
    } catch (error) {
    }
  }
}
