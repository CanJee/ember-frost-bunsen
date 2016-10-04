import AbstractInput from './abstract-input'
import * as listUtils from '../../list-utils'
import utils from 'bunsen-core/utils'
import Ember from 'ember'
import computed from 'ember-computed-decorators'
import _ from 'lodash'
import layout from 'ember-frost-bunsen/templates/components/frost-bunsen-input-select'

export default AbstractInput.extend({
  // == Dependencies ===========================================================

  dbStore: Ember.inject.service('store'),

  // == Component Properties ===================================================

  classNames: [
    'frost-bunsen-input-select',
    'frost-field'
  ],

  layout,

  // == State Properties =======================================================

  getDefaultProps () {
    return {
      options: Ember.A([]),
      optionsInitialized: false,
      queryDisabled: false
    }
  },

  selectedOptions: [],

  // == Computed Properties ====================================================

  @computed('bunsenId', 'cellConfig', 'bunsenModel', 'formDisabled', 'queryDisabled')
  disabled (bunsenId, cellConfig, bunsenModel, formDisabled, queryDisabled) {
    if (formDisabled || _.get(cellConfig, 'disabled') || !bunsenModel || queryDisabled) {
      return true
    }

    return false
  },

  // == Functions ==============================================================

  isQueryDisabled (formValue) {
    const bunsenId = this.get('bunsenId')
    const modelDef = this._getModelDef()
    return modelDef.query !== undefined && !utils.hasValidQueryValues(formValue, modelDef.query, bunsenId)
  },

  _getModelDef () {
    const cellConfig = this.get('cellConfig')
    const modelDef = this.get('bunsenModel')
    const options = _.get(cellConfig, 'renderer.options')

    if (options) {
      return _.assign(options, modelDef)
    }

    return modelDef
  },

  formValueChanged (newValue) {
    if (this.get('isDestroyed') || this.get('isDestroying')) {
      return
    }

    const modelDef = this._getModelDef()
    const oldValue = this.get('formValue')

    if (!modelDef) {
      return
    }

    const isQueryDisabled = this.isQueryDisabled(newValue)

    if (this.get('queryDisabled') !== isQueryDisabled) {
      this.set('queryDisabled', isQueryDisabled)
    }

    if (!isQueryDisabled && this.hasQueryChanged(oldValue, newValue, modelDef.query) || this.needsInitialOptions()) {
      // setting required variables once above condition is true
      const dbStore = this.get('dbStore')
      const bunsenId = this.get('bunsenId')
      // prevent multiple api calls when multiple formValueChanged is fired before options has a chance to be set

      this.set('optionsInitialized', true)
      listUtils.getOptions(newValue, modelDef, bunsenId, dbStore).then((opts) => {
        this.set('options', opts)
      })
    }
  },

  hasQueryParams (query) {
    if (!query || _.isEmpty(query)) {
      return false
    }

    const queryString = JSON.stringify(query)
    const parts = queryString.split('${')

    if (parts.length < 2) {
      return false
    }

    return true
  },

  needsInitialOptions () {
    const modelDef = this._getModelDef()
    const optionsInitialized = this.get('optionsInitialized')
    return !optionsInitialized &&
      (('enum' in modelDef) || !this.hasQueryParams(modelDef.query))
  },

  /**
   * Checks if query has been changed
   * @param {Object} oldValue - old formValue
   * @param {Object} newValue - new formValue
   * @param {Object} query - query model
   * @returns {Boolean} true if query has been changed
   */
  hasQueryChanged (oldValue, newValue, query) {
    if (!this.hasQueryParams(query)) {
      return false
    }

    const bunsenId = this.get('bunsenId')
    const queryString = JSON.stringify(query)
    const parts = queryString.split('${')

    const valueVariable = parts[1].split('}')[0]

    // If valueVariable exists in newAttrs & oldAttrs only then evaluate further
    let newValueResult = utils.findValue(newValue, valueVariable, bunsenId)
    let oldValueResult = utils.findValue(oldValue, valueVariable, bunsenId)

    if (newValueResult || oldValueResult) {
      let oldQuery
      let newQuery

      // parse old and new query before look for differences
      try {
        oldQuery = utils.populateQuery(oldValue, query, bunsenId)
      } catch (e) {
        oldQuery = {}
      }

      try {
        newQuery = utils.populateQuery(newValue, query, bunsenId)
      } catch (e) {
        newQuery = {}
      }
      // returns false when every top level key/value pair are equal
      return !Object.keys(query)
        .every((key) => {
          return newQuery[key] === oldQuery[key]
        })
    }

    return false
  },

  /**
   * Get variables for parsing template strings
   * @param {String} value - value of selected item
   * @returns {Object} variables
   */
  getTemplateVariables (value) {
    let index = -1
    let label = ''
    value = value || ''

    const id = this.get('bunsenId')
    const options = this.get('options')

    options.forEach((option, optionIndex) => {
      if (option.value === value) {
        index = optionIndex
        label = option.label
      }
    })

    return {id, index, label, value}
  },

  /**
   * This should be overriden by inherited inputs to convert the value to the appropriate format
   * @param {Boolean|String} data - value to parse
   * @returns {any} parsed value
   */
  parseValue (data) {
    return data[0]
  },

  // == Events ================================================================

  init () {
    this._super(...arguments)
    this.registerForFormValueChanges(this)
  },

  willDestroyElement () {
    this.unregisterForFormValueChanges(this)
  },

  didReceiveAttrs ({oldAttrs, newAttrs}) {
    this._super(...arguments)
  },

  // == Actions ================================================================

  actions: {
    /**
     * perform a filter on the widget
     * @param  {String} filter the filter text
     */
    onInput (filter) {
      const modelDef = this._getModelDef()
      const bunsenId = this.get('bunsenId')
      const dbStore = this.get('dbStore')
      const value = this.get('formValue')
      listUtils.getOptions(value, modelDef, bunsenId, dbStore, filter).then((opts) => {
        this.set('options', opts)
      })
    }
  }
})
