import views from '../data/views'

export default [
  {
    id: 'array',
    label: 'Array (Standard)',
    modelIds: ['array'],
    view: views.array
  },
  {
    id: 'array-auto-add',
    label: 'Array (Auto Add)',
    modelIds: ['array-2'],
    view: views.arrayAutoAdd
  },
  {
    id: 'array-custom',
    label: 'Array (Custom)',
    modelIds: ['array'],
    view: views.arrayCustom
  },
  {
    id: 'array-indexed',
    label: 'Array (Indexed)',
    modelIds: ['array-2'],
    view: views.arrayIndexed
  },
  {
    id: 'array-indexed-2',
    label: 'Array (Indexed 2)',
    modelIds: ['array-2'],
    view: views.arrayIndexed2
  },
  {
    id: 'array-inline',
    label: 'Array (Inline)',
    modelIds: ['array'],
    view: views.arrayInline
  },
  {
    id: 'array-sortable',
    label: 'Array (Sortable)',
    modelIds: ['array-2'],
    view: views.arraySortable
  },
  {
    id: 'array-tabs',
    label: 'Array (Tabs)',
    modelIds: ['array'],
    view: views.arrayTabs
  },
  {
    id: 'complex',
    label: 'Complex',
    modelIds: ['complex'],
    view: views.complex
  },
  {
    id: 'complex-conditional-prop-select-form',
    label: 'Complex With Select',
    modelIds: ['complex-conditional-properties'],
    view: views.complexConditionalPropSelectForm
  },
  {
    id: 'conditional-prop-select-form',
    label: 'Conditional Props',
    modelIds: ['conditional-properties'],
    view: views.conditionalPropSelectForm
  },
  {
    id: 'dependencies',
    label: 'Dependencies',
    modelIds: ['dependencies'],
    view: views.dependencies
  },
  {
    id: 'nested-conditionals-form',
    label: 'Nested Conditions',
    modelIds: ['conditions-in-definitions', 'conditions'],
    view: views.nestedConditionalsForm
  },
  {
    id: 'select-detail',
    label: 'Select Detail',
    modelIds: ['select'],
    view: views.selectDetail
  },
  {
    id: 'select-form',
    label: 'Select Form',
    modelIds: ['select'],
    view: views.selectForm
  },
  {
    id: 'select-form-transforms',
    label: 'Select Form (Tranforms)',
    modelIds: ['select'],
    view: views.selectFormTransforms
  },
  {
    id: 'simple',
    label: 'Simple (Standard)',
    modelIds: ['simple'],
    view: views.simple
  },
  {
    id: 'simple-custom',
    label: 'Simple (Custom)',
    modelIds: ['simple'],
    view: views.simpleCustom
  },
  {
    id: 'simple-grouping',
    label: 'Simple (Grouping)',
    modelIds: ['simple'],
    view: views.simpleGrouping
  },
  {
    id: 'simple-transforms',
    label: 'Simple (Transforms)',
    modelIds: ['simple'],
    view: views.simpleTransforms
  },
  {
    id: 'wedding-application-2-column',
    label: 'Two Column',
    modelIds: ['wedding-application'],
    view: views.weddingApplication2Column
  }
]
