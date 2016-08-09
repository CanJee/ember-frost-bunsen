import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from 'ember-frost-bunsen/templates/components/frost-bunsen-error'

export default Component.extend(PropTypeMixin, {
  // == Component Properties ===================================================

  classNameBindings: ['warning:alert-warning:alert-danger'],
  classNames: ['frost-bunsen-error'],
  layout,

  // == State Properties =======================================================

  propTypes: {
    data: PropTypes.object.isRequired,
    warning: PropTypes.bool
  },

  getDefaultProps () {
    return {
      warning: false
    }
  }
})
