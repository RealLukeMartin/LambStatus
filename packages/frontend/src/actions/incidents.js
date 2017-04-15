import 'whatwg-fetch'
import { sendRequest, buildHeaders } from 'utils/fetch'
import { apiURL } from 'utils/settings'

export const LIST_INCIDENTS = 'LIST_INCIDENTS'
export const LIST_INCIDENT_UPDATES = 'LIST_INCIDENT_UPDATES'
export const ADD_INCIDENT = 'ADD_INCIDENT'
export const EDIT_INCIDENT = 'EDIT_INCIDENT'
export const REMOVE_INCIDENT = 'REMOVE_INCIDENT'

export function listIncidents (json) {
  return {
    type: LIST_INCIDENTS,
    incidents: json
  }
}

export function listIncidentUpdates (json, incidentID) {
  return {
    type: LIST_INCIDENT_UPDATES,
    incidentUpdates: json,
    incidentID: incidentID
  }
}

export function addIncident (json) {
  return {
    type: ADD_INCIDENT,
    response: json
  }
}

export function editIncident (json) {
  return {
    type: EDIT_INCIDENT,
    response: json
  }
}

export function removeIncident (incidentID) {
  return {
    type: REMOVE_INCIDENT,
    incidentID: incidentID
  }
}

export const fetchIncidents = (callbacks = {}) => {
  return async dispatch => {
    try {
      const json = await sendRequest(apiURL + 'incidents', {}, callbacks)
      dispatch(listIncidents(json))
    } catch (error) {
    }
  }
}

export const fetchIncidentUpdates = (incidentID, callbacks = {}) => {
  return async dispatch => {
    try {
      const json = await sendRequest(apiURL + 'incidents/' + incidentID + '/incidentupdates', {}, callbacks)
      dispatch(listIncidentUpdates(json, incidentID))
    } catch (error) {
    }
  }
}

export const postIncident = (name, incidentStatus, message, components, callbacks = {}) => {
  return async dispatch => {
    try {
      const body = {
        name: name,
        incidentStatus: incidentStatus,
        message: message,
        components: components
      }
      const json = await sendRequest(apiURL + 'incidents', {
        headers: buildHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
      }, callbacks)
      dispatch(addIncident(json))
    } catch (error) {
    }
  }
}

export const updateIncident = (incidentID, name, incidentStatus, message, components, callbacks = {}) => {
  return async dispatch => {
    try {
      const body = {
        name: name,
        incidentStatus: incidentStatus,
        message: message,
        components: components
      }
      const json = await sendRequest(apiURL + 'incidents/' + incidentID, {
        headers: buildHeaders(),
        method: 'PATCH',
        body: JSON.stringify(body)
      }, callbacks)
      dispatch(editIncident(json))
    } catch (error) {
    }
  }
}

export const deleteIncident = (incidentID, callbacks = {}) => {
  return async dispatch => {
    try {
      await sendRequest(apiURL + 'incidents/' + incidentID, {
        headers: buildHeaders(),
        method: 'DELETE'
      }, callbacks)
      dispatch(removeIncident(incidentID))
    } catch (error) {
    }
  }
}
