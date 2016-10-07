import {expect} from 'chai'
import {generateFacetView} from 'ember-frost-bunsen/utils'
import {describeComponent} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'
import selectors from 'dummy/tests/helpers/selectors'

describeComponent(
  'frost-bunsen-form',
  'Integration: Component | frost-bunsen-form | facet view',
  {
    integration: true
  },
  function () {
    let props, sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()

      const bunsenModel = {
        properties: {
          bar: {
            enum: ['alpha', 'bravo', 'charlie'],
            type: 'string'
          },
          foo: {
            type: 'string'
          }
        },
        type: 'object'
      }

      const facetDef = [
        {
          model: 'foo'
        },
        {
          label: 'Baz',
          model: 'bar'
        }
      ]

      const bunsenView = generateFacetView(facetDef)

      props = {
        bunsenModel,
        bunsenView,
        onChange: sandbox.spy(),
        onValidation: sandbox.spy()
      }

      this.setProperties(props)

      this.render(hbs`{{frost-bunsen-form
        bunsenModel=bunsenModel
        bunsenView=bunsenView
        onChange=onChange
        onValidation=onValidation
      }}`)
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('renders as expected', function () {
      expect(
        this.$(selectors.bunsen.collapsible.handle),
        'renders collapsible handle for each input'
      )
        .to.have.length(2)

      expect(
        this.$(selectors.bunsen.section.clearableButton),
        'renders clearable button for each input'
      )
        .to.have.length(2)

      const $headings = this.$(selectors.bunsen.section.heading)

      expect(
        $headings,
        'renders correct number of headings'
      )
        .to.have.length(2)

      expect(
        $headings.first().text().trim(),
        'renders correct heading text for first input'
      )
        .to.equal('Foo')

      expect(
        $headings.last().text().trim(),
        'renders correct heading text for second input'
      )
        .to.equal('Baz')

      expect(
        this.$(selectors.bunsen.renderer.text),
        'renders a bunsen text input'
      )
        .to.have.length(1)

      expect(
        this.$(selectors.bunsen.renderer.select),
        'renders a bunsen select input'
      )
        .to.have.length(1)

      const $textInput = this.$(selectors.frost.text.input.enabled)
      const $selectInput = this.$(selectors.frost.select.input.enabled)

      expect(
        $textInput,
        'renders an enabled text input'
      )
        .to.have.length(1)

      expect(
        $selectInput,
        'renders an enabled select input'
      )
        .to.have.length(1)

      expect(
        $textInput.prop('placeholder'),
        'text input does not have placeholder text'
      )
        .to.equal('')

      expect(
        $textInput.val(),
        'text input has correct value'
      )
        .to.equal('')

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

    describe('when user inputs value', function () {
      const input = 'spam'

      beforeEach(function () {
        props.onChange.reset()
        props.onValidation.reset()

        this.$(selectors.frost.text.input.enabled)
          .val(input)
          .trigger('input')
      })

      it('renders as expected', function () {
        expect(
          this.$(selectors.bunsen.collapsible.handle),
          'renders collapsible handle for each input'
        )
          .to.have.length(2)

        expect(
          this.$(selectors.bunsen.section.clearableButton),
          'renders clearable button for each input'
        )
          .to.have.length(2)

        const $headings = this.$(selectors.bunsen.section.heading)

        expect(
          $headings,
          'renders correct number of headings'
        )
          .to.have.length(2)

        expect(
          $headings.first().text().trim(),
          'renders correct heading text for first input'
        )
          .to.equal('Foo')

        expect(
          $headings.last().text().trim(),
          'renders correct heading text for second input'
        )
          .to.equal('Baz')

        expect(
          this.$(selectors.bunsen.renderer.text),
          'renders a bunsen text input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.bunsen.renderer.select),
          'renders a bunsen select input'
        )
          .to.have.length(1)

        const $textInput = this.$(selectors.frost.text.input.enabled)
        const $selectInput = this.$(selectors.frost.select.input.enabled)

        expect(
          $textInput,
          'renders an enabled text input'
        )
          .to.have.length(1)

        expect(
          $selectInput,
          'renders an enabled select input'
        )
          .to.have.length(1)

        expect(
          $textInput.prop('placeholder'),
          'text input does not have placeholder text'
        )
          .to.equal('')

        expect(
          $textInput.val(),
          'text input has correct value'
        )
          .to.equal(input)

        expect(
          this.$(selectors.error),
          'does not have any validation errors'
        )
          .to.have.length(0)

        expect(
          props.onChange.callCount,
          'only informs consumer of one change'
        )
          .to.equal(1)

        expect(
          props.onChange.lastCall.args[0],
          'informs consumer of change'
        )
          .to.eql({
            foo: input
          })

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

      describe('user presses clear button', function () {
        beforeEach(function () {
          props.onChange.reset()
          props.onValidation.reset()

          this.$(selectors.bunsen.section.clearableButton)
            .first()
            .click()
        })

        it('renders as expected', function () {
          expect(
            this.$(selectors.bunsen.collapsible.handle),
            'renders collapsible handle for each input'
          )
            .to.have.length(2)

          expect(
            this.$(selectors.bunsen.section.clearableButton),
            'renders clearable button for each input'
          )
            .to.have.length(2)

          const $headings = this.$(selectors.bunsen.section.heading)

          expect(
            $headings,
            'renders correct number of headings'
          )
            .to.have.length(2)

          expect(
            $headings.first().text().trim(),
            'renders correct heading text for first input'
          )
            .to.equal('Foo')

          expect(
            $headings.last().text().trim(),
            'renders correct heading text for second input'
          )
            .to.equal('Baz')

          expect(
            this.$(selectors.bunsen.renderer.text),
            'renders a bunsen text input'
          )
            .to.have.length(1)

          expect(
            this.$(selectors.bunsen.renderer.select),
            'renders a bunsen select input'
          )
            .to.have.length(1)

          const $textInput = this.$(selectors.frost.text.input.enabled)
          const $selectInput = this.$(selectors.frost.select.input.enabled)

          expect(
            $textInput,
            'renders an enabled text input'
          )
            .to.have.length(1)

          expect(
            $selectInput,
            'renders an enabled select input'
          )
            .to.have.length(1)

          expect(
            $textInput.prop('placeholder'),
            'text input does not have placeholder text'
          )
            .to.equal('')

          expect(
            $textInput.val(),
            'text input has correct value'
          )
            .to.equal('')

          expect(
            this.$(selectors.error),
            'does not have any validation errors'
          )
            .to.have.length(0)

          expect(
            props.onChange.callCount,
            'only informs consumer of one change'
          )
            .to.equal(1)

          expect(
            props.onChange.lastCall.args[0],
            'informs consumer of change'
          )
            .to.eql({})

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
      })
    })
  }
)