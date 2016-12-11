import {expect} from 'chai'
import {setupDetailComponentTest} from 'dummy/tests/helpers/utils'
import {describe, it} from 'mocha'

describe('Integration: frost-bunsen-detail / single root container', function () {
  setupDetailComponentTest({
    bunsenModel: {
      properties: {
        bar: {type: 'number'},
        baz: {type: 'boolean'},
        foo: {type: 'string'}
      },
      type: 'object'
    },
    bunsenView: {
      cellDefinitions: {
        main: {
          children: [
            {model: 'foo'},
            {model: 'bar'},
            {model: 'baz'}
          ]
        }
      },
      cells: [{extends: 'main'}],
      type: 'form',
      version: '2.0'
    }
  })

  describe('one root cell', function () {
    it('does not render frost-tabs', function () {
      expect(this.$('.frost-tabs').length).to.equal(0)
    })
  })
})
