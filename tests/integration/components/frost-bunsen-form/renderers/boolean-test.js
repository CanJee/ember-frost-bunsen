import {expect} from 'chai'
import Ember from 'ember'
const {Logger} = Ember
import {describeComponent} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'

import selectors from 'dummy/tests/helpers/selectors'

describeComponent(
  'frost-bunsen-form',
  'Integration: Component | frost-bunsen-form | renderer | boolean',
  {
    integration: true
  },
  function () {
    let props, sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      sandbox.stub(Logger, 'warn', () => {})

      props = {
        bunsenModel: {
          properties: {
            foo: {
              type: 'boolean'
            }
          },
          type: 'object'
        },
        disabled: undefined,
        onChange: sandbox.spy(),
        onValidation: sandbox.spy()
      }

      this.setProperties(props)

      this.render(hbs`{{frost-bunsen-form
        bunsenModel=bunsenModel
        disabled=disabled
        onChange=onChange
        onValidation=onValidation
      }}`)
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('renders as expected', function () {
      expect(
        this.$(selectors.bunsen.renderer.boolean),
        'renders a bunsen boolean input'
      )
        .to.have.length(1)

      expect(
        this.$(selectors.frost.checkbox.input.enabled),
        'renders an enabled checkbox input'
      )
        .to.have.length(1)

      expect(
        this.$(selectors.frost.checkbox.input.enabled).prop('checked'),
        'checkbox is unchecked'
      )
        .to.be.false

      expect(
        this.$(selectors.error),
        'does not have any validation errors'
      )
        .to.have.length(0)

      expect(
        props.onValidation.callCount,
        'informs consumer of validation results'
      )
        .to.equal(1)

      const validationResult = props.onValidation.lastCall.args[0]

      expect(
        validationResult.errors.length,
        'informs consumer there are no errors'
      )
        .to.equal(0)

      expect(
        validationResult.warnings.length,
        'informs consumer there are no warnings'
      )
        .to.equal(0)
    })

    describe('when form explicitly enabled', function () {
      beforeEach(function () {
        this.set('disabled', false)
      })

      it('renders as expected', function () {
        expect(
          this.$(selectors.frost.checkbox.input.enabled),
          'renders an enabled checkbox input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.error),
          'does not have any validation errors'
        )
          .to.have.length(0)
      })
    })

    describe('when form disabled', function () {
      beforeEach(function () {
        this.set('disabled', true)
      })

      it('renders as expected', function () {
        expect(
          this.$(selectors.frost.checkbox.input.disabled),
          'renders a disabled checkbox input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.error),
          'does not have any validation errors'
        )
          .to.have.length(0)
      })
    })

    describe('when user checks checkbox', function () {
      beforeEach(function () {
        props.onValidation = sandbox.spy()
        this.set('onValidation', props.onValidation)

        this.$(selectors.frost.checkbox.input.enabled)
          .trigger('click')
      })

      it('functions as expected', function () {
        expect(
          this.$(selectors.bunsen.renderer.boolean),
          'renders a bunsen boolean input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.frost.checkbox.input.enabled),
          'renders an enabled checkbox input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.frost.checkbox.input.enabled).prop('checked'),
          'checkbox is checked'
        )
          .to.be.true

        expect(
          this.$(selectors.error),
          'does not have any validation errors'
        )
          .to.have.length(0)

        expect(
          props.onChange.lastCall.args[0],
          'informs consumer of change'
        )
          .to.eql({
            foo: true
          })

        expect(
          props.onValidation.callCount,
          'does not provide consumer with validation results via onValidation() property'
        )
          .to.equal(0)
      })

      describe('when user unchecks checkbox', function () {
        beforeEach(function () {
          props.onValidation = sandbox.spy()
          this.set('onValidation', props.onValidation)

          this.$(selectors.frost.checkbox.input.enabled)
            .trigger('click')
        })

        it('functions as expected', function () {
          expect(
            this.$(selectors.bunsen.renderer.boolean),
            'renders a bunsen boolean input'
          )
            .to.have.length(1)

          expect(
            this.$(selectors.frost.checkbox.input.enabled),
            'renders an enabled checkbox input'
          )
            .to.have.length(1)

          expect(
            this.$(selectors.frost.checkbox.input.enabled).prop('checked'),
            'checkbox is unchecked'
          )
            .to.be.false

          expect(
            this.$(selectors.error),
            'does not have any validation errors'
          )
            .to.have.length(0)

          expect(
            props.onChange.lastCall.args[0],
            'informs consumer of change'
          )
            .to.eql({
              foo: false
            })

          expect(
            props.onValidation.callCount,
            'does not provide consumer with validation results via onValidation() property'
          )
            .to.equal(0)
        })
      })
    })
  }
)
