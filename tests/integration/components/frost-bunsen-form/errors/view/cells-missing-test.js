import {expect} from 'chai'
import {describe, it} from 'mocha'

import selectors from 'dummy/tests/helpers/selectors'
import {setupFormComponentTest} from 'dummy/tests/helpers/utils'

describe('Integration: Component / frost-bunsen-form / errors / view / cells missing', function () {
  setupFormComponentTest({
    bunsenModel: {
      properties: {
        foo: {
          type: 'boolean'
        }
      },
      type: 'object'
    },
    bunsenView: {
      cellDefinitions: {
        main: {
          children: [
            {
              model: 'foo'
            }
          ]
        }
      },
      type: 'form',
      version: '2.0'
    }
  })

  it('renders as expected', function () {
    const $heading = this.$(selectors.bunsen.validationErrors.heading)
    const $error = this.$(selectors.bunsen.validationErrors.error)

    expect(
      $heading,
      'has validation errors heading'
    )
      .to.have.length(1)

    expect(
      $heading.text().trim(),
      'validation errors heading has expected text'
    )
      .to.equal('There seems to be something wrong with your view schema')

    expect(
      $error,
      'has one validation error'
    )
      .to.have.length(1)

    expect(
      $error.text().trim().replace(/\s+/g, ' '),
      'validation error has correct text'
    )
      .to.equal('ERROR: #/cells Field is required.')
  })
})
