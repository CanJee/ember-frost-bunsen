import {expect} from 'chai'
import Ember from 'ember'
const {Logger, run} = Ember
import {describeComponent} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'

import selectors from 'dummy/tests/helpers/selectors'

describeComponent(
  'frost-bunsen-form',
  'Integration: Component | frost-bunsen-form | renderer | textarea',
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
              type: 'string'
            }
          },
          type: 'object'
        },
        bunsenView: {
          cellDefinitions: {
            main: {
              children: [
                {
                  model: 'foo',
                  renderer: {
                    name: 'textarea'
                  }
                }
              ]
            }
          },
          cells: [
            {
              extends: 'main',
              label: 'Main'
            }
          ],
          type: 'form',
          version: '2.0'
        },
        disabled: undefined,
        onChange: sandbox.spy(),
        onValidation: sandbox.spy()
      }

      this.setProperties(props)

      this.render(hbs`{{frost-bunsen-form
        bunsenModel=bunsenModel
        bunsenView=bunsenView
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
        this.$(selectors.bunsen.renderer.textarea),
        'renders a bunsen textarea input'
      )
        .to.have.length(1)

      expect(
        this.$(selectors.frost.textarea.input.enabled),
        'renders an enabled textarea input'
      )
        .to.have.length(1)

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
          this.$(selectors.frost.textarea.input.enabled),
          'renders an enabled textarea input'
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
          this.$(selectors.frost.textarea.input.disabled),
          'renders a disabled textarea input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.error),
          'does not have any validation errors'
        )
          .to.have.length(0)
      })
    })

    describe('when user inputs value', function () {
      const input = 'bar'

      beforeEach(function (done) {
        props.onValidation = sandbox.spy()
        this.set('onValidation', props.onValidation)

        this.$(selectors.frost.textarea.input.enabled)
          .val(input)
          .trigger('input')

        // FIXME: remove this if/when frost-textarea removes later call (MRD - 2016-07-21)
        // Required because frost-textarea uses Ember.run.later() to inform consumer of change
        // @reference https://github.com/ciena-frost/ember-frost-core/blob/master/addon/components/frost-textarea.js#L54
        run.later(() => {
          done()
        }, 10)
      })

      it('functions as expected', function () {
        expect(
          this.$(selectors.bunsen.renderer.textarea),
          'renders a bunsen textarea input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.frost.textarea.input.enabled),
          'renders an enabled textarea input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.frost.textarea.input.enabled).val(),
          'input maintains user input value'
        )
          .to.equal(`${input}`)

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
            foo: input
          })

        expect(
          props.onValidation.callCount,
          'does not provide consumer with validation results via onValidation() property'
        )
          .to.equal(0)
      })
    })

    describe('transforms', function () {
      beforeEach(function () {
        this.set('bunsenView', {
          cellDefinitions: {
            main: {
              children: [
                {
                  model: 'foo',
                  renderer: {
                    name: 'textarea'
                  },
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
              ]
            }
          },
          cells: [
            {
              extends: 'main',
              label: 'Main'
            }
          ],
          type: 'form',
          version: '2.0'
        })
      })

      describe('value matches literal string read transform', function () {
        const input = 'Matt'

        beforeEach(function (done) {
          props.onValidation = sandbox.spy()
          this.set('onValidation', props.onValidation)

          this.$(selectors.frost.textarea.input.enabled)
            .val(input)
            .trigger('input')

          // FIXME: remove this if/when frost-textarea removes later call (MRD - 2016-07-21)
          // Required because frost-textarea uses Ember.run.later() to inform consumer of change
          // @reference https://github.com/ciena-frost/ember-frost-core/blob/master/addon/components/frost-textarea.js#L54
          run.later(() => {
            done()
          }, 50)
        })

        it('functions as expected', function () {
          expect(
            this.$(selectors.bunsen.renderer.textarea),
            'renders a bunsen textarea input'
          )
            .to.have.length(1)

          expect(
            this.$(selectors.frost.textarea.input.enabled),
            'renders an enabled textarea input'
          )
            .to.have.length(1)

          expect(
            this.$(selectors.frost.textarea.input.enabled).val(),
            'renders transformed value in textarea input'
          )
            .to.equal('Matthew')

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
              foo: input
            })

          expect(
            props.onValidation.callCount,
            'does not provide consumer with validation results via onValidation() property'
          )
            .to.equal(0)
        })
      })

      describe('value matches regex string read transform', function () {
        const input = 'Chris'

        beforeEach(function (done) {
          props.onValidation = sandbox.spy()
          this.set('onValidation', props.onValidation)

          this.$(selectors.frost.textarea.input.enabled)
            .val(input)
            .trigger('input')

          // FIXME: remove this if/when frost-textarea removes later call (MRD - 2016-07-21)
          // Required because frost-textarea uses Ember.run.later() to inform consumer of change
          // @reference https://github.com/ciena-frost/ember-frost-core/blob/master/addon/components/frost-textarea.js#L54
          run.later(() => {
            done()
          }, 50)
        })

        it('functions as expected', function () {
          expect(
            this.$(selectors.bunsen.renderer.textarea),
            'renders a bunsen textarea input'
          )
            .to.have.length(1)

          expect(
            this.$(selectors.frost.textarea.input.enabled),
            'renders an enabled textarea input'
          )
            .to.have.length(1)

          expect(
            this.$(selectors.frost.textarea.input.enabled).val(),
            'renders transformed value in textarea input'
          )
            .to.equal('Christopher')

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
              foo: input
            })

          expect(
            props.onValidation.callCount,
            'does not provide consumer with validation results via onValidation() property'
          )
            .to.equal(0)
        })
      })

      describe('applies literal string write transform', function () {
        beforeEach(function (done) {
          props.onValidation = sandbox.spy()
          this.set('onValidation', props.onValidation)

          this.$(selectors.frost.textarea.input.enabled)
            .val('Johnathan')
            .trigger('input')

          // FIXME: remove this if/when frost-textarea removes later call (MRD - 2016-07-21)
          // Required because frost-textarea uses Ember.run.later() to inform consumer of change
          // @reference https://github.com/ciena-frost/ember-frost-core/blob/master/addon/components/frost-textarea.js#L54
          run.later(() => {
            done()
          }, 50)
        })

        it('functions as expected', function () {
          expect(
            this.$(selectors.bunsen.renderer.textarea),
            'renders a bunsen textarea input'
          )
            .to.have.length(1)

          expect(
            this.$(selectors.frost.textarea.input.enabled),
            'renders an enabled textarea input'
          )
            .to.have.length(1)

          expect(
            this.$(selectors.frost.textarea.input.enabled).val(),
            'renders transformed value in textarea input'
          )
            .to.equal('John')

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
              foo: 'John'
            })

          expect(
            props.onValidation.callCount,
            'does not provide consumer with validation results via onValidation() property'
          )
            .to.equal(0)
        })
      })

      describe('applies regex string write transform', function () {
        beforeEach(function (done) {
          props.onValidation = sandbox.spy()
          this.set('onValidation', props.onValidation)

          this.$(selectors.frost.textarea.input.enabled)
            .val('Alexander')
            .trigger('input')

          // FIXME: remove this if/when frost-textarea removes later call (MRD - 2016-07-21)
          // Required because frost-textarea uses Ember.run.later() to inform consumer of change
          // @reference https://github.com/ciena-frost/ember-frost-core/blob/master/addon/components/frost-textarea.js#L54
          run.later(() => {
            done()
          }, 50)
        })

        it('functions as expected', function () {
          expect(
            this.$(selectors.bunsen.renderer.textarea),
            'renders a bunsen textarea input'
          )
            .to.have.length(1)

          expect(
            this.$(selectors.frost.textarea.input.enabled),
            'renders an enabled textarea input'
          )
            .to.have.length(1)

          expect(
            this.$(selectors.frost.textarea.input.enabled).val(),
            'renders transformed value in textarea input'
          )
            .to.equal('Alex')

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
              foo: 'Alex'
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
