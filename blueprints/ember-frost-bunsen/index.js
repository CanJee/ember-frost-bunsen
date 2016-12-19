module.exports = {
  afterInstall: function () {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-ajax', target: '^2.5.2'},
        {name: 'ember-browserify', target: '^1.1.12'},
        {name: 'ember-bunsen-core', target: '0.15.0'},
        {name: 'ember-frost-core', target: '^1.1.3'},
        {name: 'ember-frost-fields', target: '^4.0.0'},
        {name: 'ember-frost-popover', target: '^4.0.1'},
        {name: 'ember-frost-tabs', target: '^5.0.0'},
        {name: 'ember-getowner-polyfill', target: '^1.0.1'},
        {name: 'ember-lodash-shim', target: '^1.0.0'},
        {name: 'ember-prop-types', target: '^3.0.2'},
        {name: 'ember-redux-shim', target: '0.0.2'},
        {name: 'ember-redux-thunk', target: '0.0.1'},
        {name: 'ember-spread', target: '0.0.7'},
        {name: 'ember-sortable', target: '^1.8.1'}
      ]
    })
      .then(() => {
        const isAddon = this.project.isEmberCLIAddon()
        const pathPrefix = isAddon ? 'tests/dummy/' : ''

        return this.insertIntoFile(
          `${pathPrefix}app/styles/app.scss`,
          "@import './ember-frost-bunsen';"
        )
      })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  }
}
