import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  // == Component Properties ===================================================

  classNames: ['frost-bunsen-validation-result'],

  // == State Properties =======================================================

  propTypes: {
    model: PropTypes.shape({
      errors: PropTypes.array,
      warnings: PropTypes.array
    }).isRequired
  }
})
