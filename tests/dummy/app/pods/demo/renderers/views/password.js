export default {
  containers: [{
    id: 'main',
    rows: [
      [
        {
          model: 'foo',
          renderer: 'password'
        }
      ]
    ]
  }],
  rootContainers: [
    {
      container: 'main',
      label: 'Main'
    }
  ],
  type: 'form',
  version: '1.0'
}
