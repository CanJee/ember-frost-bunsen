export default {
  version: '2.0',
  type: 'form',
  cells: [
    {
      extends: 'main'
    }
  ],
  cellDefinitions: {
    main: {
      children: [
        {
          model: 'alias'
        },
        {
          model: 'firstName',
          label: 'First'
        },
        {
          model: 'lastName'
        },
        {
          model: 'onlyChild'
        }
      ]
    }
  }
}
