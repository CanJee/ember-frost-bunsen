import {expect} from 'chai'
import {it} from 'ember-mocha'
import {describe} from 'mocha'
import {setupComponentTest} from 'dummy/tests/helpers/template'

const props = {
  bunsenModel: {
    properties: {
      bar: {type: 'number'},
      baz: {type: 'boolean'},
      foo: {type: 'string'}
    },
    type: 'object'
  },
  bunsenView: {
    containers: [
      {
        id: 'main',
        children: [
          [{model: 'foo'}],
          [{model: 'bar'}],
          [{model: 'baz'}]
        ]
      }
    ],
    cells: [{label: 'Main', container: 'main'}],
    type: 'form',
    version: '2.0'
  }
}

function tests (ctx) {
  describe('one root container', function () {
    it('does not render frost-tabs', function () {
      expect(ctx.rootNode.find('.frost-tabs').length).to.equal(0)
    })
  })
}

setupComponentTest('frost-bunsen-form', props, tests)
