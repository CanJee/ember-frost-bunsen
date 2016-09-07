import {expect} from 'chai'
import {describeComponent} from 'ember-mocha'
import {afterEach, beforeEach, it} from 'mocha'
import {PropTypes} from 'ember-prop-types'
import {builtInRenderers} from 'bunsen-core/validator'
import {validatePropTypes} from 'dummy/tests/helpers/template'

describeComponent.only(
  'frost-bunsen-array-inline-item',
  'Unit: Component | frost-bunsen-array-inline-item',
  {
    unit: true
  },
  function () {
    let component, onChangeSpy, onRemoveSpy, sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      onChangeSpy = sandbox.spy()
      onRemoveSpy = sandbox.spy()

      component = this.subject({
        bunsenId: 'foo',
        bunsenModel: {
          properties: {
            foo: {
              items: {
                properties: {
                  bar: {type: 'string'}
                },
                type: 'object'
              },
              type: 'array'
            }
          },
          type: 'object'
        },
        bunsenStore: Ember.Object.create({
          formValue: {
            foo: [{}]
          },
          renderers: builtInRenderers,
          view: {}
        }),
        bunsenView: {},
        cellConfig: {
          arrayOptions: {
            itemCell: {}
          }
        },
        errors: {},
        index: 0,
        onChange: onChangeSpy,
        onRemove: onRemoveSpy,
        sortable: false,
        value: {foo: []}
      })
    })

    afterEach(function () {
      sandbox.restore()
    })

    validatePropTypes({
      bunsenId: PropTypes.string.isRequired,
      bunsenModel: PropTypes.object.isRequired,
      bunsenStore: PropTypes.EmberObject.isRequired,
      bunsenView: PropTypes.object.isRequired,
      cellConfig: PropTypes.object.isRequired,
      errors: PropTypes.object.isRequired,
      formDisabled: PropTypes.bool,
      index: PropTypes.number.isRequired,
      onChange: PropTypes.func.isRequired,
      onRemove: PropTypes.func,
      readOny: PropTypes.bool,
      registerForFormValueChanges: PropTypes.func.isRequired,
      renderers: PropTypes.oneOfType([
        PropTypes.EmberObject,
        PropTypes.object
      ]),
      showAllErrors: PropTypes.bool,
      showRemoveButton: PropTypes.bool,
      sortable: PropTypes.bool.isRequired,
      value: PropTypes.object.isRequired
    })

    it('compact returns false when view config property is missing', function () {
      expect(component.get('compact')).to.be.false
    })

    it('compact returns false when view config property is set to false', function () {
      component.set('cellConfig.arrayOptions.compact', false)
      expect(component.get('compact')).to.be.false
    })

    it('compact returns true when view config property set to true', function () {
      component.set('cellConfig.arrayOptions.compact', true)
      expect(component.get('compact')).to.be.fooBarBaz
      expect(false).to.be.ok
    })

    it('errorMessage returns multiple errors', function () {
      const error1 = 'what is foo without a little bar'
      const error2 = 'baz is feeling lonely'
      component.set('errors', {'foo.0': [error1, error2]})
      expect(component.get('errorMessage').toString()).to.eql(`${error1}<br>${error2}`)
    })
  }
)
