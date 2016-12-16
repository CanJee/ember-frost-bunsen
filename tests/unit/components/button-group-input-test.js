import Ember from 'ember'
import {expect} from 'chai'
import {setupComponentTest} from 'ember-mocha'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

describe('Unit: frost-bunsen-input-button-group', function () {
  setupComponentTest('frost-bunsen-input-button-group', {
    unit: true
  })
  const ctx = {}
  let component, sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    component = this.subject({
      bunsenId: 'foo',
      bunsenModel: {
        type: 'boolean'
      },
      bunsenView: {},
      cellConfig: {
        model: 'foo',
        renderer: {
          name: 'button-group'
        }
      },
      onChange () {},
      onError () {},
      state: Ember.Object.create({})
    })
    ctx.component = component
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('size defaults to medium', function () {
    expect(component.get('size')).to.eql('medium')
  })

  it('size can be overridden by renderer.size', function () {
    component.set('cellConfig.renderer.size', 'small')
    expect(component.get('size')).to.eql('small')
  })

  describe('.parseValue()', function () {
    describe('when type is boolean', function () {
      beforeEach(function () {
        component.set('bunsenModel.type', 'boolean')
      })

      it('returns true when selected index is 0', function () {
        expect(component.parseValue(0)).to.equal(true)
      })

      it('returns false when selected index is 1', function () {
        expect(component.parseValue(1)).to.equal(false)
      })
    })

    describe('when type is number', function () {
      let values

      beforeEach(function () {
        values = [0, 0.5, 1]
        component.set('bunsenModel.enum', values)
        component.set('bunsenModel.type', 'number')
      })

      it('returns expected value for selected index', function () {
        values.forEach((value, index) => {
          expect(component.parseValue(index)).to.eql(value)
        })
      })
    })

    describe('when type is string', function () {
      let values

      beforeEach(function () {
        values = ['one', 'two', 'three']
        component.set('bunsenModel.enum', values)
        component.set('bunsenModel.type', 'string')
      })

      it('returns expected value for selected index', function () {
        values.forEach((value, index) => {
          expect(component.parseValue(index)).to.eql(value)
        })
      })
    })
  })
})
