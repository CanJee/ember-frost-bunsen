import {expect} from 'chai'
import {setupComponentTest} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

const props = {
  bunsenModel: {
    properties: {
      bar: {
        default: 100,
        type: 'number'
      },
      baz: {
        default: true,
        type: 'boolean'
      },
      foo: {
        default: 'bar',
        type: 'string'
      }
    },
    type: 'object'
  }
}

describe('Integration: frost-bunsen-form', function () {
  setupComponentTest('frost-bunsen-form', {
    integration: true
  })

  let rootNode

  beforeEach(function () {
    this.setProperties(props)
    this.render(hbs`{{frost-bunsen-form
      bunsenModel=bunsenModel
    }}`)
    rootNode = this.$('> *')
  })

  describe('defaults with no value', function () {
    it('has correct classes', function () {
      expect(rootNode).to.have.class('frost-bunsen-form')
    })

    it('renders an input for bar with the default value', function () {
      expect(rootNode.find('.frost-bunsen-input-number input').val()).to.eql('100')
    })

    it('renders a checkbox for baz with the default value', function () {
      expect(rootNode.find('.frost-bunsen-input-boolean input').is(':checked')).to.be.equal(true)
    })

    it('renders an input for foo with the default value', function () {
      expect(rootNode.find('.frost-bunsen-input-text input').val()).to.eql('bar')
    })
  })
})
