import {expect} from 'chai'
import {describeComponent} from 'ember-mocha'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'
import {unitTest} from 'dummy/tests/helpers/template'
import {addChangeSet} from './changeset-helper'

describeComponent(...unitTest('frost-bunsen-cell'), function () {
  describe('when bunsenId and nested config model', function () {
    let component, onChangeSpy, sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      onChangeSpy = sandbox.spy()

      component = this.subject({
        bunsenId: 'foo',
        bunsenModel: {
          properties: {
            foo: {
              properties: {
                bar: {
                  properties: {
                    baz: {type: 'string'}
                  },
                  type: 'object'
                }
              },
              type: 'object'
            }
          },
          type: 'object'
        },
        bunsenView: {},
        cellConfig: {
          model: 'bar.baz'
        },
        errors: {},
        onChange: onChangeSpy,
        value: {}
      })
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('errorMessage returns null when no erorrs', function () {
      component.set('errors', {})
      expect(component.get('errorMessage')).to.be.equal(null)
    })

    it('errorMessage returns signle error', function () {
      const error = 'baz is invalid'
      component.set('errors', {'foo.bar.baz': [error]})
      expect(component.get('errorMessage').toString()).to.eql(error)
    })

    it('errorMessage returns multiple errors', function () {
      const error1 = 'baz is invalid'
      const error2 = 'bar is feeling lonely'
      component.set('errors', {'foo.bar.baz': [error1, error2]})
      expect(component.get('errorMessage').toString()).to.eql(`${error1}<br>${error2}`)
    })

    it('isArrayItem() returns false', function () {
      expect(component.get('isArrayItem')).to.be.equal(false)
    })

    it('isSubModelArray returns false', function () {
      expect(component.get('isSubModelArray')).to.be.equal(false)
    })

    it('isSubModelObject returns false', function () {
      expect(component.get('isSubModelObject')).to.be.equal(false)
    })

    it('nonIndexId returns expected value', function () {
      expect(component.get('nonIndexId')).to.equal('foo.bar.baz')
    })

    it('readOnly defaults to false', function () {
      expect(component.get('readOnly')).to.be.equal(false)
    })

    it('renderId returns ${bunsenId}.${model}', function () {
      expect(component.get('renderId')).to.equal('foo.bar.baz')
    })

    it('subModel returns expected value', function () {
      expect(component.get('subModel')).to.eql({type: 'string'})
    })

    describe('when value is present', function () {
      beforeEach(function () {
        component.set('value', {
          foo: {
            bar: {
              baz: 'spam'
            }
          }
        })
        addChangeSet(component)
        component.didReceiveAttrs({
          oldAttrs: {}
        })
      })

      it('renderValue returns value for config model', function () {
        expect(component.get('renderValue')).to.equal('spam')
      })
    })

    describe('when value is not present', function () {
      beforeEach(function () {
        component.set('value', null)
      })

      it('renderValue returns undefined', function () {
        expect(component.get('renderValue')).to.be.equal(undefined)
      })
    })
  })
})
