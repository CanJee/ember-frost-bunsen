import {utils} from 'bunsen-core'
const {parseVariables} = utils
import Ember from 'ember'
const {get, inject, Logger} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import countries from 'ember-frost-bunsen/fixtures/countries'
import subFormModel from 'ember-frost-bunsen/fixtures/geolocation-model'
import subFormView from 'ember-frost-bunsen/fixtures/geolocation-view'
import layout from 'ember-frost-bunsen/templates/components/frost-bunsen-input-geolocation'
import {PropTypes} from 'ember-prop-types'
import AbstractInput from './abstract-input'

const REVERSE_ENDPOINT = 'http://www.mapquestapi.com/geocoding/v1/reverse'

const subFormValueShape = {
  address: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  postalCode: PropTypes.string,
  state: PropTypes.string
}

const areaHandlers = {
  city (value) {
    this._updateProperty('city', value)
  },

  country (value) {
    const country = countries.find((country) => {
      return country.code === value
    })

    if (!country) {
      return
    }

    this._updateProperty('country', country.name)
  },

  state (value) {
    this._updateProperty('state', value)
  }
}

export default AbstractInput.extend({
  // == Dependencies ===========================================================

  ajax: inject.service(),

  // == Component Properties ===================================================

  classNames: [
    'frost-bunsen-input-geolocation',
    'frost-field'
  ],

  layout,

  // == State Properties =======================================================

  propTypes: {
    // private
    internalFormValue: PropTypes.shape(subFormValueShape),
    isLoading: PropTypes.bool,
    subFormModel: PropTypes.object,
    subFormView: PropTypes.object
  },

  getDefaultProps () {
    return {
      internalFormValue: {},
      isLoading: false,
      subFormModel,
      subFormView
    }
  },

  @readOnly
  @computed('cellConfig', 'value')
  subFormValue (cellConfig, value) {
    const internalFormValue = this.get('internalFormValue')
    const refs = get(cellConfig, 'renderer.refs') || {}
    const stringifiedFormValue = parseVariables(value, JSON.stringify(refs), '', true)

    try {
      const formValue = JSON.parse(stringifiedFormValue)

      Object.keys(subFormValueShape)
        .forEach((key) => {
          if (key in refs) {
            return
          }

          formValue[key] = internalFormValue[key]
        })

      return formValue
    } catch (e) {
      return {}
    }
  },

  // == Functions ==============================================================

  /**
   * Convert bunsen model property reference to bunsen ID
   * @param {String} ref - bunsen model property reference
   * @returns {String} bunsen ID
   */
  _getRefBunsenId (ref) {
    const bunsenId = this.get('bunsenId')
    return bunsenId + ref.replace(/^\$\{\.\/(.+)}/g, '.$1').replace(/\//g, '.')
  },

  /**
   * Convert API response key to bunsen model property
   * @param {String} key - API key
   * @returns {String} bunsen model property
   */
  _normalizeKey (key) {
    if (key === 'street') {
      return 'address'
    }

    return key
  },

  /**
   * Handle error from browsers geolocation lookup API
   */
  _onGetCurrentPositionError () {
    Logger.error('Failed to get users location', arguments)
    this.stopLoading()
  },

  /**
   * Handle success from browsers geolocation lookup API
   */
  _onGetCurrentPositionSuccess ({coords}) {
    this._updateProperty('latitude', coords.latitude)
    this._updateProperty('longitude', coords.longitude)
    this._performReverseLookup(coords.latitude, coords.longitude)
  },

  /**
   * Handle error from reverse lookup API
   * @param {Error} e - error
   */
  _onReverseLookupError (e) {
    Logger.error('Failed to perform reverse lookup', e)
  },

  /**
   * Handle success from reverse lookup API
   * @param {Object} resp - reverse lookup response
   */
  _onReverseLookupSuccess (resp) {
    const location = get(resp, 'results.0.locations.0') || {}

    for (let i = 1; i < 7; i++) {
      let type = location[`adminArea${i}Type`]

      if (!type) {
        continue
      }

      type = type.toLowerCase()

      if (type in areaHandlers) {
        areaHandlers[type].call(this, location[`adminArea${i}`])
      }
    }

    ;[
      'postalCode',
      'street'
    ]
      .forEach((key) => {
        if (location[key]) {
          const normalizedKey = this._normalizeKey(key)
          this._updateProperty(normalizedKey, location[key])
        }
      })

    Logger.info('Reverse lookup response', resp)
  },

  /**
   * Lookup location information from street address
   */
  _performLookup () {
    // TODO: implement functionality
  },

  /**
   * Lookup street address information from location
   * @param {String} latitude - latitude
   * @param {String} longitude - longitude
   */
  _performReverseLookup (latitude, longitude) {
    const key = this.get('cellConfig.renderer.apiKey')
    let url = `${REVERSE_ENDPOINT}?location=${latitude},${longitude}`

    if (key) {
      url += `&key=${key}`
    }

    this.get('ajax').request(url)
      .then(this._onReverseLookupSuccess.bind(this))
      .catch(this._onReverseLookupError.bind(this))
      .finally(() => {
        this._stopLoading()
      })
  },

  /**
   * Update UI to reflect lookup is occurring
   */
  _startLoading () {
    this.set('isLoading', true)
  },

  /**
   * Update UI to reflect that lookup has completed
   */
  _stopLoading () {
    this.set('isLoading', false)
  },

  /**
   * Update the value of one of the address/location properties
   * @param {String} key - property to update
   * @param {String} value - new value to set property to
   */
  _updateProperty (key, value) {
    const onChange = this.get('onChange')
    const refs = this.get('cellConfig.renderer.refs') || {}

    if (refs[key]) {
      onChange(this._getRefBunsenId(refs[key]), value)
    } else {
      this.set(`internalFormValue.${key}`, value)
      // TODO: trigger re-render?
    }
  },

  // == Actions ================================================================

  actions: {
    handleSubFormChange (formValue) {
      const oldFormValue = this.get('internalFormValue')

      Object.keys(subFormValueShape)
        .forEach((key) => {
          if (oldFormValue[key] !== formValue[key]) {
            const ref = this.get(`cellConfig.renderer.refs.${key}`)

            if (ref) {
              const bunsenId = this._getRefBunsenId(ref)
              this.get('onChange')(bunsenId, formValue[key])
            }
          }
        })

      this.set('internalFormValue', formValue)
      this._performLookup()
    },

    useCurrentLocation () {
      this._startLoading()

      navigator.geolocation.getCurrentPosition(
        this._onGetCurrentPositionSuccess.bind(this),
        this._onGetCurrentPositionError.bind(this)
      )
    }
  }
})
