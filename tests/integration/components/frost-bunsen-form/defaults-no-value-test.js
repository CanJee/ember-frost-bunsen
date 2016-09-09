import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe} from 'mocha'
import {integrationTestContext} from 'dummy/tests/helpers/template'

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

function tests (ctx) {
  describe('defaults with no value', function () {
    it('has correct classes', function () {
      expect(ctx.rootNode).to.have.class('frost-bunsen-form')
    })

    it('renders an input for bar with the default value', function () {
      expect(ctx.rootNode.find('.frost-bunsen-input-number input').val()).to.eql('100')
    })

    it('renders a checkbox for baz with the default value', function () {
      expect(ctx.rootNode.find('.frost-bunsen-input-boolean input').is(':checked')).to.be.equal(true)
    })

    it('renders an input for foo with the default value', function () {
      expect(ctx.rootNode.find('.frost-bunsen-input-text input').val()).to.eql('bar')
    })
  })
}

describeComponent(...integrationTestContext('frost-bunsen-form'),
  function () {
    let ctx = {}

    beforeEach(function () {
      this.setProperties(props)
      this.render(hbs`{{frost-bunsen-form
        bunsenModel=bunsenModel
      }}`)
      ctx.rootNode = this.$('> *')
    })

    tests(ctx)
  }
)
