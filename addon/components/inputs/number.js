import _ from 'lodash'
import computed from 'ember-computed-decorators'
import AbstractInput from './abstract-input'

export default AbstractInput.extend({
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  classNames: [
    'frost-bunsen-input-number',
    'frost-field'
  ],

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  @computed('value')
  /**
   * Text to render for value
   * @param {Number} value - value
   * @returns {String} text to render
   */
  renderValue (value) {
    if ([null, undefined].indexOf(value) !== -1) {
      return ''
    }

    if (_.isNumber(value)) {
      return value.toString()
    }

    return value
  },

  // ==========================================================================
  // Functions
  // ==========================================================================

  /**
   * Parse value into a number
   * @param {String} value - value to parse
   * @returns {Number} parse value
   */
  parseValue (value) {
    let result = null
    if (value !== undefined && value !== null) {
      const number = parseFloat(this._super(value))
      result = _.isFinite(number) ? number : null
    }
    return result
  }

  // ==========================================================================
  // Events
  // ==========================================================================

  // ==========================================================================
  // Actions
  // ==========================================================================
})
