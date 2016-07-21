import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import {beforeEach, describe} from 'mocha'
import {integrationTestContext, renderWithProps} from 'dummy/tests/helpers/template'

const cellConfig = {
  model: 'name',
  transforms: {
    read: [
      {
        from: '^Chris$',
        regex: true,
        to: 'Christopher'
      },
      {
        from: 'Matt',
        to: 'Matthew'
      }
    ],
    write: [
      {
        from: '^Alexander$',
        regex: true,
        to: 'Alex'
      },
      {
        from: 'Johnathan',
        to: 'John'
      }
    ]
  }
}

const view = {
  cellDefinitions: {
    main: {
      children: [
        cellConfig
      ]
    }
  },
  cells: [{
    extends: 'main',
    label: 'Main'
  }],
  type: 'form',
  version: '2.0'
}

describeComponent(...integrationTestContext('frost-bunsen-input-text'), function () {
  let rootNode

  beforeEach(function () {
    const props = {
      bunsenId: 'name',
      bunsenModel: {
        type: 'string'
      },
      bunsenStore: Ember.Object.create({
        view
      }),
      cellConfig: Ember.Object.create(cellConfig),
      onChange () {},
      state: Ember.Object.create({}),
      value: undefined // Must be present so we can set it via this.set('value', value)
    }

    rootNode = renderWithProps(this, 'frost-bunsen-input-text', props)
  })

  describe('render with read transforms', function () {
    it('applies non-regex string transform', function () {
      this.set('value', 'Matt')
      const $input = rootNode.find('.frost-text input')
      expect($input.val()).to.equal('Matthew')
    })

    it('applies regex string transform', function () {
      this.set('value', 'Chris')
      const $input = rootNode.find('.frost-text input')
      expect($input.val()).to.equal('Christopher')
    })
  })

  describe('applies write transforms to changes', function () {
    it('applies non-regex string transform', function (done) {
      this.set('onChange', (id, value) => {
        expect(id).to.equal('name')
        expect(value).to.equal('John')
        done()
      })

      rootNode.find('.frost-text input')
        .val('Johnathan')
        .trigger('input')
    })

    it('applies regex string transform', function (done) {
      this.set('onChange', (id, value) => {
        expect(id).to.equal('name')
        expect(value).to.equal('Alex')
        done()
      })

      rootNode.find('.frost-text input')
        .val('Alexander')
        .trigger('input')
    })
  })
})
