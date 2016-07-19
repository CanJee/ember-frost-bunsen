export default {
  version: '2.0',
  type: 'form',
  containers: [
    {
      id: 'main',
      children: [
        [{container: 'name'}],
        [{
          model: 'addresses',
          container: 'address',
          item: {
            label: 'Addr'
          }
        }],
        [{container: 'nameModel', model: 'name'}],
        [{
          label: 'Custom Name',
          model: 'name',
          renderer: {
            name: 'NameRenderer'
          }
        }]
      ]
    },
    {
      id: 'name',
      children: [
        [{model: 'name.first'}],
        [{model: 'name.last'}]
      ]
    },
    {
      id: 'address',
      children: [
        [{model: 'street'}],
        [{model: 'city'}, {model: 'state'}, {model: 'zip'}]
      ]
    },
    {
      id: 'nameModel',
      children: [
        [{model: 'first'}],
        [{model: 'last'}]
      ]
    }
  ],
  cells: [{label: 'Main', container: 'main'}]
}
