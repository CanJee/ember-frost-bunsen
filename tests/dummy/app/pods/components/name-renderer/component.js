import computed, {readOnly} from 'ember-computed-decorators'
import _ from 'lodash'

import {AbstractInput} from 'ember-frost-bunsen'

export default AbstractInput.extend({
  classNames: [
    'container-fluid',
    'name-renderer'
  ],

  @readOnly
  @computed('value')
  renderValue (name) {
    let value = ''

    if (!_.isPlainObject(name)) {
      return ''
    }

    if (name.first) {
      value += name.first
    }

    if (name.last) {
      value += ` ${name.last}`
    }

    return value
  },

  parseValue (e) {
    const parts = e.target.value.split(' ')
    const first = parts[0]
    const last = (parts.length > 1) ? parts.slice(1).join(' ') : undefined

    return {
      first,
      last
    }
  }
})
