export default [
  {
    id: 'John',
    modelIds: ['simple'],
    label: 'John',
    value: {
      firstName: 'John',
      lastName: 'Christianson',
      alias: 'Little Johnny Christmas',
      onlyChild: true,
      age: 40
    }
  },
  {
    id: 'SelectExample',
    modelIds: ['select'],
    label: 'Example',
    value: {
      enumExample: 'value 1',
      queryExample: '1',
      multiSelectExample: ['value 1', 'value 2']
    }
  },
  {
    id: 'Dependencies',
    label: 'Dependencies',
    modelIds: ['dependencies'],
    value: {
      name: 'Johnny Appleseed',
      email: 'ja@gmail.com',
      paymentInfo: {
        ccv: '123',
        creditCardNumber: '5555 5555 5555 5555',
        useCreditCard: 'selected'
      }
    }
  },
  {
    id: 'complex',
    label: 'Complex',
    modelIds: ['complex'],
    value: {
      network: {
        host: {
          name: 'SomeHost',
          interfaces: [{
            name: 'SomeInterface',
            adminState: 'no'
          }]
        },
        firewall: {
          name: 'SomeFirewall',
          interfaces: [{
            name: 'SomeOtherInterface',
            adminState: 'no'
          }, {
            name: 'SomeThirdInterface',
            adminState: 'no'
          }]
        }
      }
    }
  },
  {
    id: 'array',
    label: 'Array',
    modelIds: ['array'],
    value: {
      addresses: [
        {
          street: '1060 West Addison Street',
          city: 'Chicago',
          state: 'IL',
          zip: '55555'
        }
      ],
      name: {
        first: 'Elwood',
        last: 'Blues'
      }
    }
  },
  {
    id: 'conditions',
    label: 'conditions',
    modelIds: ['conditions'],
    value: {
      tagType: 'double-tagged'
    }
  }
]
