import {expect} from 'chai'
import selectors from 'dummy/tests/helpers/selectors'
import {setupDetailComponentTest} from 'dummy/tests/helpers/utils'
import {beforeEach, describe, it} from 'mocha'

describe('Integration: Component / frost-bunsen-detail / renderer | select enum', function () {
  setupDetailComponentTest({
    bunsenModel: {
      properties: {
        foo: {
          enum: [
            'bar',
            'baz'
          ],
          type: 'string'
        }
      },
      type: 'object'
    },
    hook: 'my-form'
  })

  describe('when no initial value', function () {
    beforeEach(function () {
      this.set('value', undefined)
    })

    it('renders as expected', function () {
      expect(
        this.$(selectors.bunsen.collapsible.handle),
        'does not render collapsible handle'
      )
        .to.have.length(0)

      expect(
        this.$(selectors.bunsen.renderer.static),
        'renders a bunsen static input'
      )
        .to.have.length(1)

      expect(
        this.$(selectors.bunsen.label).text().trim(),
        'renders expected label text'
      )
        .to.equal('Foo')

      expect(
        this.$(selectors.bunsen.value).text().trim(),
        'renders expected value'
      )
        .to.equal('—')
    })

    describe('when label defined in view', function () {
      beforeEach(function () {
        this.set('bunsenView', {
          cells: [
            {
              label: 'FooBar Baz',
              model: 'foo'
            }
          ],
          type: 'form',
          version: '2.0'
        })
      })

      it('renders as expected', function () {
        expect(
          this.$(selectors.bunsen.collapsible.handle),
          'does not render collapsible handle'
        )
          .to.have.length(0)

        expect(
          this.$(selectors.bunsen.renderer.static),
          'renders a bunsen static input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.bunsen.label).text().trim(),
          'renders expected label text'
        )
          .to.equal('FooBar Baz')

        expect(
          this.$(selectors.bunsen.value).text().trim(),
          'renders expected value'
        )
          .to.equal('—')
      })
    })

    describe('when collapsible is set to true in view', function () {
      beforeEach(function () {
        this.set('bunsenView', {
          cells: [
            {
              collapsible: true,
              model: 'foo'
            }
          ],
          type: 'form',
          version: '2.0'
        })
      })

      it('renders as expected', function () {
        expect(
          this.$(selectors.bunsen.collapsible.handle),
          'renders collapsible handle'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.bunsen.renderer.static),
          'renders a bunsen static input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.bunsen.label).text().trim(),
          'renders expected label text'
        )
          .to.equal('Foo')

        expect(
          this.$(selectors.bunsen.value).text().trim(),
          'renders expected value'
        )
          .to.equal('—')
      })
    })

    describe('when collapsible is set to false in view', function () {
      beforeEach(function () {
        this.set('bunsenView', {
          cells: [
            {
              collapsible: false,
              model: 'foo'
            }
          ],
          type: 'form',
          version: '2.0'
        })
      })

      it('renders as expected', function () {
        expect(
          this.$(selectors.bunsen.collapsible.handle),
          'does not render collapsible handle'
        )
          .to.have.length(0)

        expect(
          this.$(selectors.bunsen.renderer.static),
          'renders a bunsen static input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.bunsen.label).text().trim(),
          'renders expected label text'
        )
          .to.equal('Foo')

        expect(
          this.$(selectors.bunsen.value).text().trim(),
          'renders expected value'
        )
          .to.equal('—')
      })
    })
  })

  describe('when initial value', function () {
    beforeEach(function () {
      this.set('value', {
        foo: 'bar'
      })
    })

    it('renders as expected', function () {
      expect(
        this.$(selectors.bunsen.collapsible.handle),
        'does not render collapsible handle'
      )
        .to.have.length(0)

      expect(
        this.$(selectors.bunsen.renderer.static),
        'renders a bunsen static input'
      )
        .to.have.length(1)

      expect(
        this.$(selectors.bunsen.label).text().trim(),
        'renders expected label text'
      )
        .to.equal('Foo')

      expect(
        this.$(selectors.bunsen.value).text().trim(),
        'renders expected value'
      )
        .to.equal('bar')
    })

    describe('when label defined in view', function () {
      beforeEach(function () {
        this.set('bunsenView', {
          cells: [
            {
              label: 'FooBar Baz',
              model: 'foo'
            }
          ],
          type: 'form',
          version: '2.0'
        })
      })

      it('renders as expected', function () {
        expect(
          this.$(selectors.bunsen.collapsible.handle),
          'does not render collapsible handle'
        )
          .to.have.length(0)

        expect(
          this.$(selectors.bunsen.renderer.static),
          'renders a bunsen static input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.bunsen.label).text().trim(),
          'renders expected label text'
        )
          .to.equal('FooBar Baz')

        expect(
          this.$(selectors.bunsen.value).text().trim(),
          'renders expected value'
        )
          .to.equal('bar')
      })
    })

    describe('when collapsible is set to true in view', function () {
      beforeEach(function () {
        this.set('bunsenView', {
          cells: [
            {
              collapsible: true,
              model: 'foo'
            }
          ],
          type: 'form',
          version: '2.0'
        })
      })

      it('renders as expected', function () {
        expect(
          this.$(selectors.bunsen.collapsible.handle),
          'renders collapsible handle'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.bunsen.renderer.static),
          'renders a bunsen static input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.bunsen.label).text().trim(),
          'renders expected label text'
        )
          .to.equal('Foo')

        expect(
          this.$(selectors.bunsen.value).text().trim(),
          'renders expected value'
        )
          .to.equal('bar')
      })
    })

    describe('when collapsible is set to false in view', function () {
      beforeEach(function () {
        this.set('bunsenView', {
          cells: [
            {
              collapsible: false,
              model: 'foo'
            }
          ],
          type: 'form',
          version: '2.0'
        })
      })

      it('renders as expected', function () {
        expect(
          this.$(selectors.bunsen.collapsible.handle),
          'does not render collapsible handle'
        )
          .to.have.length(0)

        expect(
          this.$(selectors.bunsen.renderer.static),
          'renders a bunsen static input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.bunsen.label).text().trim(),
          'renders expected label text'
        )
          .to.equal('Foo')

        expect(
          this.$(selectors.bunsen.value).text().trim(),
          'renders expected value'
        )
          .to.equal('bar')
      })
    })
  })
})
