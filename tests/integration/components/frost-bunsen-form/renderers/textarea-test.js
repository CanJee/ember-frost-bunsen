import {expect} from 'chai'

import {
  expectBunsenInputToHaveError,
  expectCollapsibleHandles,
  expectOnValidationState
} from 'dummy/tests/helpers/ember-frost-bunsen'

import selectors from 'dummy/tests/helpers/selectors'
import {setupFormComponentTest} from 'dummy/tests/helpers/utils'
import {beforeEach, describe, it} from 'mocha'

describe('Integration: Component / frost-bunsen-form / renderer / textarea', function () {
  const ctx = setupFormComponentTest({
    bunsenModel: {
      properties: {
        foo: {
          type: 'string'
        }
      },
      type: 'object'
    },
    bunsenView: {
      cells: [
        {
          model: 'foo',
          renderer: {
            name: 'textarea'
          }
        }
      ],
      type: 'form',
      version: '2.0'
    }
  })

  it('renders as expected', function () {
    expectCollapsibleHandles(0)

    expect(
      this.$(selectors.bunsen.renderer.textarea),
      'renders a bunsen textarea input'
    )
      .to.have.length(1)

    const $input = this.$(selectors.frost.textarea.input.enabled)

    expect(
      $input,
      'renders an enabled textarea input'
    )
      .to.have.length(1)

    expect(
      $input.prop('placeholder'),
      'does not have placeholder text'
    )
      .to.equal('')

    expect(
      $input.attr('cols'),
      'does not have cols property set'
    )
      .to.be.equal(undefined)

    expect(
      $input.attr('rows'),
      'does not have cols property set'
    )
      .to.be.equal(undefined)

    expect(
      this.$(selectors.bunsen.label).text().trim(),
      'renders expected label text'
    )
      .to.equal('Foo')

    expect(
      this.$(selectors.error),
      'does not have any validation errors'
    )
      .to.have.length(0)

    expectOnValidationState(ctx.props.onValidation, {count: 1})
  })

  describe('when rows defined in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            model: 'foo',
            renderer: {
              cols: 3,
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)

      expect(
        this.$(selectors.bunsen.renderer.textarea),
        'renders a bunsen textarea input'
      )
        .to.have.length(1)

      const $input = this.$(selectors.frost.textarea.input.enabled)

      expect(
        $input,
        'renders an enabled textarea input'
      )
        .to.have.length(1)

      expect(
        $input.prop('placeholder'),
        'does not have placeholder text'
      )
        .to.equal('')

      expect(
        $input.attr('cols'),
        'has expected number of cols'
      )
        .to.equal('3')

      expect(
        $input.attr('rows'),
        'does not have rows property set'
      )
        .to.be.equal(undefined)

      expect(
        this.$(selectors.bunsen.label).text().trim(),
        'renders expected label text'
      )
        .to.equal('Foo')

      expect(
        this.$(selectors.error),
        'does not have any validation errors'
      )
        .to.have.length(0)

      expectOnValidationState(ctx.props.onValidation, {count: 1})
    })
  })

  describe('when label defined in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            label: 'FooBar Baz',
            model: 'foo',
            renderer: {
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)

      expect(
        this.$(selectors.bunsen.renderer.textarea),
        'renders a bunsen textarea input'
      )
        .to.have.length(1)

      const $input = this.$(selectors.frost.textarea.input.enabled)

      expect(
        $input,
        'renders an enabled textarea input'
      )
        .to.have.length(1)

      expect(
        $input.prop('placeholder'),
        'does not have placeholder text'
      )
        .to.equal('')

      expect(
        this.$(selectors.bunsen.label).text().trim(),
        'renders expected label text'
      )
        .to.equal('FooBar Baz')

      expect(
        this.$(selectors.error),
        'does not have any validation errors'
      )
        .to.have.length(0)

      expectOnValidationState(ctx.props.onValidation, {count: 1})
    })
  })

  describe('when collapsible is set to true in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            collapsible: true,
            model: 'foo',
            renderer: {
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(1)

      expect(
        this.$(selectors.bunsen.renderer.textarea),
        'renders a bunsen textarea input'
      )
        .to.have.length(1)

      const $input = this.$(selectors.frost.textarea.input.enabled)

      expect(
        $input,
        'renders an enabled textarea input'
      )
        .to.have.length(1)

      expect(
        $input.prop('placeholder'),
        'does not have placeholder text'
      )
        .to.equal('')

      expect(
        this.$(selectors.bunsen.label).text().trim(),
        'renders expected label text'
      )
        .to.equal('Foo')

      expect(
        this.$(selectors.error),
        'does not have any validation errors'
      )
        .to.have.length(0)

      expectOnValidationState(ctx.props.onValidation, {count: 1})
    })
  })

  describe('when collapsible is set to false in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            collapsible: false,
            model: 'foo',
            renderer: {
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)

      expect(
        this.$(selectors.bunsen.renderer.textarea),
        'renders a bunsen textarea input'
      )
        .to.have.length(1)

      const $input = this.$(selectors.frost.textarea.input.enabled)

      expect(
        $input,
        'renders an enabled textarea input'
      )
        .to.have.length(1)

      expect(
        $input.prop('placeholder'),
        'does not have placeholder text'
      )
        .to.equal('')

      expect(
        this.$(selectors.bunsen.label).text().trim(),
        'renders expected label text'
      )
        .to.equal('Foo')

      expect(
        this.$(selectors.error),
        'does not have any validation errors'
      )
        .to.have.length(0)

      expectOnValidationState(ctx.props.onValidation, {count: 1})
    })
  })

  describe('when placeholder defined in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            model: 'foo',
            placeholder: 'Foo bar',
            renderer: {
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })
    })

    it('renders as expected', function () {
      expect(
        this.$(selectors.bunsen.renderer.textarea),
        'renders a bunsen textarea input'
      )
        .to.have.length(1)

      const $input = this.$(selectors.frost.textarea.input.enabled)

      expect(
        $input,
        'renders an enabled textarea input'
      )
        .to.have.length(1)

      expect(
        $input.prop('placeholder'),
        'has expected placeholder text'
      )
        .to.equal('Foo bar')

      expect(
        this.$(selectors.error),
        'does not have any validation errors'
      )
        .to.have.length(0)

      expectOnValidationState(ctx.props.onValidation, {count: 1})
    })
  })

  describe('when rows defined in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            model: 'foo',
            renderer: {
              name: 'textarea',
              rows: 5
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })
    })

    it('renders as expected', function () {
      expect(
        this.$(selectors.bunsen.renderer.textarea),
        'renders a bunsen textarea input'
      )
        .to.have.length(1)

      const $input = this.$(selectors.frost.textarea.input.enabled)

      expect(
        $input,
        'renders an enabled textarea input'
      )
        .to.have.length(1)

      expect(
        $input.prop('placeholder'),
        'does not have placeholder text'
      )
        .to.equal('')

      expect(
        $input.attr('cols'),
        'does not have cols property set'
      )
        .to.be.equal(undefined)

      expect(
        $input.attr('rows'),
        'has expected number of rows'
      )
        .to.equal('5')

      expect(
        this.$(selectors.bunsen.label).text().trim(),
        'renders expected label text'
      )
        .to.equal('Foo')

      expect(
        this.$(selectors.error),
        'does not have any validation errors'
      )
        .to.have.length(0)

      expectOnValidationState(ctx.props.onValidation, {count: 1})
    })
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

  describe('when property explicitly enabled in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            disabled: false,
            model: 'foo',
            renderer: {
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })
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

  describe('when property disabled in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            disabled: true,
            model: 'foo',
            renderer: {
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })
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

    beforeEach(function () {
      ctx.props.onValidation.reset()

      this.$(selectors.frost.textarea.input.enabled)
        .val(input)
        .trigger('input')
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
        ctx.props.onChange.lastCall.args[0],
        'informs consumer of change'
      )
        .to.eql({
          foo: input
        })

      expectOnValidationState(ctx.props.onValidation, {count: 1})
    })
  })

  describe('when field is required', function () {
    beforeEach(function () {
      ctx.props.onValidation.reset()

      this.set('bunsenModel', {
        properties: {
          foo: {
            type: 'string'
          }
        },
        required: ['foo'],
        type: 'object'
      })
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

      expectOnValidationState(ctx.props.onValidation, {
        count: 1,
        errors: [
          {
            code: 'OBJECT_MISSING_REQUIRED_PROPERTY',
            params: ['foo'],
            message: 'Field is required.',
            path: '#/foo',
            isRequiredError: true
          }
        ]
      })
    })

    describe('when showAllErrors is false', function () {
      beforeEach(function () {
        ctx.props.onValidation.reset()
        this.set('showAllErrors', false)
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

        expectOnValidationState(ctx.props.onValidation, {count: 0})
      })
    })

    describe('when showAllErrors is true', function () {
      beforeEach(function () {
        ctx.props.onValidation.reset()
        this.set('showAllErrors', true)
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

        expectBunsenInputToHaveError('foo', 'Field is required.')

        expectOnValidationState(ctx.props.onValidation, {count: 0})
      })
    })
  })

  describe('transforms', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
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
        ],
        type: 'form',
        version: '2.0'
      })
    })

    describe('value matches literal string read transform', function () {
      const input = 'Matt'

      beforeEach(function () {
        ctx.props.onValidation.reset()

        this.$(selectors.frost.textarea.input.enabled)
          .val(input)
          .trigger('input')
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
          ctx.props.onChange.lastCall.args[0],
          'informs consumer of change'
        )
          .to.eql({
            foo: input
          })

        expectOnValidationState(ctx.props.onValidation, {count: 1})
      })
    })

    describe('value matches regex string read transform', function () {
      const input = 'Chris'

      beforeEach(function () {
        ctx.props.onValidation.reset()

        this.$(selectors.frost.textarea.input.enabled)
          .val(input)
          .trigger('input')
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
          ctx.props.onChange.lastCall.args[0],
          'informs consumer of change'
        )
          .to.eql({
            foo: input
          })

        expectOnValidationState(ctx.props.onValidation, {count: 1})
      })
    })

    describe('applies literal string write transform', function () {
      beforeEach(function () {
        ctx.props.onValidation.reset()

        this.$(selectors.frost.textarea.input.enabled)
          .val('Johnathan')
          .trigger('input')
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
          ctx.props.onChange.lastCall.args[0],
          'informs consumer of change'
        )
          .to.eql({
            foo: 'John'
          })

        expectOnValidationState(ctx.props.onValidation, {count: 1})
      })
    })

    describe('applies regex string write transform', function () {
      beforeEach(function () {
        ctx.props.onValidation.reset()

        this.$(selectors.frost.textarea.input.enabled)
          .val('Alexander')
          .trigger('input')
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
          ctx.props.onChange.lastCall.args[0],
          'informs consumer of change'
        )
          .to.eql({
            foo: 'Alex'
          })

        expectOnValidationState(ctx.props.onValidation, {count: 1})
      })
    })
  })
})
