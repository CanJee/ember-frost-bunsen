import {expect} from 'chai'
import selectors from 'dummy/tests/helpers/selectors'
import {setupDetailComponentTest} from 'dummy/tests/helpers/utils'
import {beforeEach, describe, it} from 'mocha'

describe('Integration: Component / frost-bunsen-detail / renderer | password', function () {
  setupDetailComponentTest({
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
            name: 'password'
          }
        }
      ],
      type: 'detail',
      version: '2.0'
    },
    value: {
      foo: 'Baz'
    }
  })

  it('renders as expected', function () {
    expect(
      this.$(selectors.bunsen.collapsible.handle),
      'does not render collapsible handle'
    )
      .to.have.length(0)

    expect(
      this.$(selectors.bunsen.renderer.password.input),
      'renders a bunsen password input'
    )
      .to.have.length(1)

    expect(
      this.$(selectors.bunsen.renderer.password.text).text().trim(),
      'does not reveal password'
    )
      .to.equal('************')

    expect(
      this.$(selectors.bunsen.label).text().trim(),
      'renders expected label text'
    )
      .to.equal('Foo')
  })

  describe('when label defined in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            label: 'FooBar Baz',
            model: 'foo',
            renderer: {
              name: 'password'
            }
          }
        ],
        type: 'detail',
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
        this.$(selectors.bunsen.renderer.password.input),
        'renders a bunsen password input'
      )
        .to.have.length(1)

      expect(
        this.$(selectors.bunsen.renderer.password.text).text().trim(),
        'does not reveal password'
      )
        .to.equal('************')

      expect(
        this.$(selectors.bunsen.label).text().trim(),
        'renders expected label text'
      )
        .to.equal('FooBar Baz')
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
              name: 'password'
            }
          }
        ],
        type: 'detail',
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
        this.$(selectors.bunsen.renderer.password.input),
        'renders a bunsen password input'
      )
        .to.have.length(1)

      expect(
        this.$(selectors.bunsen.renderer.password.text).text().trim(),
        'does not reveal password'
      )
        .to.equal('************')

      expect(
        this.$(selectors.bunsen.label).text().trim(),
        'renders expected label text'
      )
        .to.equal('Foo')
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
              name: 'password'
            }
          }
        ],
        type: 'detail',
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
        this.$(selectors.bunsen.renderer.password.input),
        'renders a bunsen password input'
      )
        .to.have.length(1)

      expect(
        this.$(selectors.bunsen.renderer.password.text).text().trim(),
        'does not reveal password'
      )
        .to.equal('************')

      expect(
        this.$(selectors.bunsen.label).text().trim(),
        'renders expected label text'
      )
        .to.equal('Foo')
    })
  })

  describe('user presses reveal icon', function () {
    beforeEach(function () {
      this.$(selectors.bunsen.renderer.password.reveal).click()
    })

    it('renders as expected', function () {
      expect(
        this.$(selectors.bunsen.collapsible.handle),
        'does not render collapsible handle'
      )
        .to.have.length(0)

      expect(
        this.$(selectors.bunsen.renderer.password.input),
        'renders a bunsen password input'
      )
        .to.have.length(1)

      expect(
        this.$(selectors.bunsen.renderer.password.text).text().trim(),
        'reveals password'
      )
        .to.equal('Baz')

      expect(
        this.$(selectors.bunsen.label).text().trim(),
        'renders expected label text'
      )
        .to.equal('Foo')
    })

    describe('user presses reveal icon again', function () {
      beforeEach(function () {
        this.$(selectors.bunsen.renderer.password.reveal).click()
      })

      it('renders as expected', function () {
        expect(
          this.$(selectors.bunsen.collapsible.handle),
          'does not render collapsible handle'
        )
          .to.have.length(0)

        expect(
          this.$(selectors.bunsen.renderer.password.input),
          'renders a bunsen password input'
        )
          .to.have.length(1)

        expect(
          this.$(selectors.bunsen.renderer.password.text).text().trim(),
          'does not reveal password'
        )
          .to.equal('************')

        expect(
          this.$(selectors.bunsen.label).text().trim(),
          'renders expected label text'
        )
          .to.equal('Foo')
      })
    })
  })
})
