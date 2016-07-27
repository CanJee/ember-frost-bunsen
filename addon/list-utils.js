import * as utils from 'bunsen-core/utils'
import Ember from 'ember'
const {RSVP} = Ember

function promiseValue (value) {
  return new Ember.RSVP.Promise(function (resolve) {
    resolve(value)
  })
}

/**
 * set a list's available options
 * @param  {Object} value the current value object for the form instance
 * @param  {Object} modelDef the bunsen model definition
 * @param  {String} bunsenId the bunsen id for this property
 * @param  {Object} dbStore the ember-data store
 * @param  {String} filter the optional string to filter on
 * @returns {Ember.RSVP.Promise} a promise that resolves to a list of items
 */
export function getOptions (value, modelDef, bunsenId, dbStore, filter = '') {
  const enumDef = modelDef.items ? modelDef.items.enum : modelDef.enum
  const queryDef = modelDef.query
  if (enumDef) {
    return promiseValue(getEnumValues(enumDef, filter))
  } else if (queryDef) {
    return getAsyncDataValues(value, modelDef, bunsenId, dbStore, filter)
  }
  return promiseValue([])
}

/**
 * take enum values and make into a collection
 * @param  {String[]} values the values to make into a collection
 * @param {String} filter - filter
 * @returns {Object[]} a list of item objects
 */
export function getEnumValues (values = [], filter = '') {
  const filteredValues = []
  values.filter((value) => {
    if (!filter || value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
      filteredValues.push({label: value, value})
    }
  })
  return filteredValues
}

/**
 * Fetch the list of network functions from the backend and set them
 * @param  {Object} value the bunsen value for this form
 * @param  {Object} modelDef the full bunsen model def for this property
 * @param  {Object} bunsenId the bunsenId for this form
 * @param  {Object} dbStore the ember-data store
 * @param  {String} filter the partial match query filter to populate
 * @returns {Ember.RSVP.Promise} a promise that resolves to the list of items
 */
export function getAsyncDataValues (value, modelDef, bunsenId, dbStore, filter) {
  let query

  try {
    query = utils.populateQuery(value, modelDef.query, bunsenId)
  } catch (e) {
    return RSVP.reject(e)
  }

  const labelAttr = modelDef.labelAttribute || 'label'
  const valueAttr = modelDef.valueAttribute || 'id'
  if (filter) {
    const pQuery = `${labelAttr}:${filter}`
    query.p = query.p ? [query.p, pQuery].join(',') : pQuery
  }
  const modelType = modelDef.modelType || 'resources'
  return dbStore.query(modelType, query).then((resp) => {
    const items = resp.map((resource) => {
      const label = resource.get(labelAttr) || resource.get('title')
      const value = resource.get(valueAttr)
      return {
        label,
        value
      }
    })
    return items
  }).catch((err) => { // eslint-disable-line handle-callback-err
    Ember.Logger.log(`Error fetching ${modelType}`, err)
  })
}
