import Ember from 'ember'
const {Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  classNameBindings: ['state.expanded:expanded:collapsed'],
  classNames: ['frost-bunsen-section'],

  propTypes: {
    collapsible: PropTypes.bool,
    expanded: PropTypes.bool,
    expandedOnInitialRender: PropTypes.bool,
    instructions: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.string
    ]),
    onToggle: PropTypes.func,
    renderContentWhenCollapsed: PropTypes.bool,
    required: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  },

  getDefaultProps () {
    return {
      expandedOnInitialRender: true,
      renderContentWhenCollapsed: false
    }
  },

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  @readOnly
  @computed('state.expanded', 'renderContentWhenCollapsed')
  /**
   * Whether or not to show section content
   * @param {Boolean} expanded - whether or not section is exapnded
   * @param {Boolean} renderContentWhenCollapsed - whether or not to render content when section is collapsed
   * @returns {Boolean} whether or not to show content
   */
  showContent (expanded, renderContentWhenCollapsed) {
    return expanded || renderContentWhenCollapsed
  },

  // ==========================================================================
  // Functions
  // ==========================================================================

  /**
   * Initialize state
   */
  init () {
    this._super()
    let initialState
    if (this.get('expanded') === undefined) {
      initialState = {
        expanded: this.get('expandedOnInitialRender')
      }
    }
    this.set('state', Ember.Object.create(initialState))
  },

  /**
   * Handle updates to properties by consumer
   */
  didReceiveAttrs () {
    this._super(...arguments)
    const expanded = this.get('expanded')

    if (expanded !== undefined && this.get('state.expanded') !== expanded) {
      this.set('state.expanded', expanded)
    }
  },

  // ==========================================================================
  // Events
  // ==========================================================================

  // ==========================================================================
  // Actions
  // ==========================================================================

  actions: {
    /**
     * Handle when user expands/collapses section
     * @param {Event} e - event
     */
    onToggle (e) {
      e.stopPropagation()
      e.preventDefault()

      const expanded = !this.get('state.expanded')
      const parentOnToggle = this.get('onToggle')

      this.set('state.expanded', expanded)

      if (parentOnToggle) {
        parentOnToggle(expanded)
      }
    }
  }
})
