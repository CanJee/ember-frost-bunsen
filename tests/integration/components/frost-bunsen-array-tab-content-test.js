import {expect} from 'chai'
import {it} from 'ember-mocha'
import {setupComponentTest} from 'dummy/tests/helpers/template'

const props = {
  bunsenId: 'addresses',
  bunsenModel: {
    items: {
      properties: {
        city: {type: 'string'},
        street: {type: 'string'},
        state: {type: 'string'},
        zip: {type: 'string'}
      },
      required: ['street', 'city', 'state', 'zip'],
      type: 'object'
    },
    minItems: 1
  },
  bunsenStore: Ember.Object.create({}),
  cellConfig: Ember.Object.create({
    item: Ember.Object.create({})
  }),
  errors: {},
  index: 0,
  onChange () {},
  value: {
    addresses: [
      {
        city: 'Petaluma',
        state: 'CA',
        street: '1383 N McDowell Blvd',
        zip: '94954'
      }
    ]
  }
}

function tests (ctx) {
  it('has correct classes', function () {
    expect(ctx.rootNode).to.have.class('frost-bunsen-array-tab-content')
  })
}

setupComponentTest('frost-bunsen-array-tab-content', props, tests)
