/*
    Copyright (C) 2019 Google Inc.
    Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import {
  Proxy,
  Direct,
  Search,
  Multi,
  CustomFilter,
} from '../mappers/mapper-helpers';
import Mappings from './mappings';
import CustomAttributeDefinition from '../custom-attributes/custom-attribute-definition';
import AccessControlRole from '../custom-roles/access-control-role';
import {getRoleableModels} from '../../plugins/utils/models-utils';

const businessObjects = [
  'Assessment', 'AccessGroup', 'Audit', 'Contract', 'Control', 'DataAsset',
  'Document', 'Facility', 'Issue', 'Market', 'Metric', 'Objective', 'OrgGroup',
  'Policy', 'Process', 'Product', 'ProductGroup', 'Program', 'Project',
  'Regulation', 'Requirement', 'Risk', 'Standard', 'System',
  'TechnologyEnvironment', 'Threat', 'Vendor',
];

const coreObjects = _.difference(businessObjects,
  ['Assessment', 'Audit', 'Document', 'Program']);

const scopingObjects = [
  'AccessGroup', 'DataAsset', 'Facility', 'Market', 'Metric', 'OrgGroup',
  'Process', 'Product', 'ProductGroup', 'Project', 'System',
  'TechnologyEnvironment', 'Vendor',
];

new Mappings({
  Person: {
    indirectMappings: ['CycleTaskGroupObjectTask', 'TaskGroupTask', 'Workflow',
      ...getRoleableModels().map((model) => model.model_singular)],
  },

  Program: {
    map: [...coreObjects, 'Document'],
    indirectMappings: ['Audit', 'Person', 'TaskGroup', 'Workflow'],
  },

  Document: {
    map: [...coreObjects, 'Program'],
    indirectMappings: ['Person'],
  },

  // Core objects
  Issue: {
    map: [...coreObjects, 'Document', 'Program'],
    indirectMappings: ['Assessment', 'Audit', 'Person', 'TaskGroup',
      'Workflow'],
  },
  Contract: {
    map: _.difference(businessObjects, ['Assessment', 'Contract']),
    indirectMappings: ['Assessment', 'Person', 'TaskGroup', 'Workflow'],
  },
  Control: {
    map: _.difference(businessObjects, ['Assessment']),
    indirectMappings: ['Assessment', 'Person', 'TaskGroup', 'Workflow'],
  },
  Objective: {
    map: _.difference(businessObjects, ['Assessment']),
    indirectMappings: ['Assessment', 'Person', 'TaskGroup', 'Workflow'],
  },
  Policy: {
    map: _.difference(businessObjects, ['Assessment', 'Policy']),
    indirectMappings: ['Assessment', 'Person', 'TaskGroup', 'Workflow'],
  },
  Requirement: {
    map: _.difference(businessObjects, ['Assessment']),
    indirectMappings: ['Assessment', 'Person', 'TaskGroup', 'Workflow'],
  },
  Regulation: {
    map: _.difference(businessObjects,
      [...scopingObjects, 'Assessment', 'Regulation']),
    indirectMappings:
      [...scopingObjects, 'Assessment', 'Person', 'TaskGroup', 'Workflow'],
  },
  Risk: {
    map: _.difference(businessObjects, ['Assessment']),
    indirectMappings: ['Assessment', 'Person', 'TaskGroup', 'Workflow'],
  },
  Standard: {
    map: _.difference(businessObjects,
      [...scopingObjects, 'Assessment', 'Standard']),
    indirectMappings:
      [...scopingObjects, 'Assessment', 'Person', 'TaskGroup', 'Workflow'],
  },
  Threat: {
    map: _.difference(businessObjects, ['Assessment']),
    indirectMappings: ['Assessment', 'Person', 'TaskGroup', 'Workflow'],
  },

  // Scoping objects
  AccessGroup: {
    map: _.difference(businessObjects,
      ['Assessment', 'AccessGroup', 'Standard', 'Regulation']),
    indirectMappings: ['Assessment', 'Person', 'Regulation', 'Standard',
      'TaskGroup', 'Workflow'],
  },
  DataAsset: {
    map: _.difference(businessObjects,
      ['Assessment', 'Standard', 'Regulation']),
    indirectMappings: ['Assessment', 'Person', 'Regulation', 'Standard',
      'TaskGroup', 'Workflow'],
  },
  Facility: {
    map: _.difference(businessObjects,
      ['Assessment', 'Standard', 'Regulation']),
    indirectMappings: ['Assessment', 'Person', 'Regulation', 'Standard',
      'TaskGroup', 'Workflow'],
  },
  Market: {
    map: _.difference(businessObjects,
      ['Assessment', 'Standard', 'Regulation']),
    indirectMappings: ['Assessment', 'Person', 'Regulation', 'Standard',
      'TaskGroup', 'Workflow'],
  },
  Metric: {
    map: _.difference(businessObjects,
      ['Assessment', 'Standard', 'Regulation']),
    indirectMappings: ['Assessment', 'Person', 'Regulation', 'Standard',
      'TaskGroup', 'Workflow'],
  },
  OrgGroup: {
    map: _.difference(businessObjects,
      ['Assessment', 'Standard', 'Regulation']),
    indirectMappings: ['Assessment', 'Person', 'Regulation', 'Standard',
      'TaskGroup', 'Workflow'],
  },
  Process: {
    map: _.difference(businessObjects,
      ['Assessment', 'Standard', 'Regulation']),
    indirectMappings: ['Assessment', 'Person', 'Regulation', 'Standard',
      'TaskGroup', 'Workflow'],
  },
  Product: {
    map: _.difference(businessObjects,
      ['Assessment', 'Standard', 'Regulation']),
    indirectMappings: ['Assessment', 'Person', 'Regulation', 'Standard',
      'TaskGroup', 'Workflow'],
  },
  ProductGroup: {
    map: _.difference(businessObjects,
      ['Assessment', 'Standard', 'Regulation']),
    indirectMappings: ['Assessment', 'Person', 'Regulation', 'Standard',
      'TaskGroup', 'Workflow'],
  },
  Project: {
    map: _.difference(businessObjects,
      ['Assessment', 'Standard', 'Regulation']),
    indirectMappings: ['Assessment', 'Person', 'Regulation', 'Standard',
      'TaskGroup', 'Workflow'],
  },
  System: {
    map: _.difference(businessObjects,
      ['Assessment', 'Standard', 'Regulation']),
    indirectMappings: ['Assessment', 'Person', 'Regulation', 'Standard',
      'TaskGroup', 'Workflow'],
  },
  TechnologyEnvironment: {
    map: _.difference(businessObjects,
      ['Assessment', 'Standard', 'Regulation']),
    indirectMappings: ['Assessment', 'Person', 'Regulation', 'Standard',
      'TaskGroup', 'Workflow'],
  },
  Vendor: {
    map: _.difference(businessObjects,
      ['Assessment', 'Standard', 'Regulation']),
    indirectMappings: ['Assessment', 'Person', 'Regulation', 'Standard',
      'TaskGroup', 'Workflow'],
  },

  // Audit
  Audit: {
    map: coreObjects,
    indirectMappings:
      ['Assessment', 'AssessmentTemplate', 'Evidence', 'Person', 'Program'],
  },
  Assessment: {
    map: coreObjects,
    indirectMappings: ['Audit', 'Evidence', 'Person'],
  },
  Evidence: {
    indirectMappings: ['Assessment', 'Audit', 'Person'],
  },
  AssessmentTemplate: {
    indirectMappings: ['Audit'],
  },

  // Workflow
  TaskGroup: {
    map: [...coreObjects, 'Program'],
  },
  TaskGroupTask: {
    indirectMappings: ['Person', 'Workflow'],
  },
  Workflow: {
    indirectMappings: ['Person', 'TaskGroup', 'TaskGroupTask'],
  },
  CycleTaskGroupObjectTask: {
    // It is needed for an object list generation. This object list
    // describes which objects can be mapped to CycleTaskGroupObjectTask.
    // Types placed within this collection will be intersected
    // with TreeViewConfig.base_widgets_by_type["CycleTaskGroupObjectTask"]
    // collection. The result of the operation is the total list.
    map: [...coreObjects, 'Audit', 'Program'],
    indirectMappings: ['Person'],
    // Needed for related_objects mapper
    related_objects_as_source: Proxy(
      null,
      'destination', 'Relationship',
      'source', 'related_destinations'
    ),
    // Needed for related_objects mapper
    related_objects_as_destination: Proxy(
      null,
      'source', 'Relationship',
      'destination', 'related_sources'
    ),
    // Needed to show mapped objects for CycleTaskGroupObjectTask
    related_objects: Multi(
      ['related_objects_as_source', 'related_objects_as_destination']
    ),
    /**
       * "cycle" mapper is needed for mapped objects under
       * CycleTaskGroupObjectTask into mapping-tree-view component.
       */
    cycle: Direct(
      'Cycle', 'cycle_task_group_object_tasks', 'cycle'),
    /**
       * This mapping name is needed for objects mapped to CTGOT.
       * It helps to filter results of objects mapped to CTGOT.
       * We can just remove some objects from results.
       */
    info_related_objects: CustomFilter(
      'related_objects',
      function (relatedObjects) {
        return !_.includes([
          'CycleTaskGroup',
          'Comment',
          'Document',
          'Person',
        ],
        relatedObjects.instance.type);
      }
    ),
  },

  // Other
  UserRole: {
    person: Direct('Person', 'user_roles', 'person'),
    role: Direct('Role', 'user_roles', 'role'),
  },
  MultitypeSearch: {
    map: [
      'AccessGroup', 'Assessment', 'AssessmentTemplate', 'Audit',
      'Contract', 'Control', 'CycleTaskGroupObjectTask', 'DataAsset',
      'Document', 'Evidence', 'Facility', 'Issue', 'Market', 'Metric',
      'Objective', 'OrgGroup', 'Person', 'Process', 'Product',
      'ProductGroup', 'Project', 'Policy', 'Program', 'Regulation',
      'Requirement', 'Risk', 'Standard', 'System', 'TaskGroup',
      'TaskGroupTask', 'TechnologyEnvironment', 'Threat',
      'Vendor', 'Workflow',
    ],
  },
  // Used by Custom Attributes widget
  CustomAttributable: {
    custom_attribute_definitions: Search(function (binding) {
      return CustomAttributeDefinition.findAll({
        definition_type: binding.instance.root_object,
        definition_id: null,
      });
    }, 'CustomAttributeDefinition'),
  },
  // used by the Custom Roles admin panel tab
  Roleable: {
    access_control_roles: Search(function (binding) {
      return AccessControlRole.findAll({
        object_type: binding.instance.model_singular,
        internal: false,
      });
    }, 'AccessControlRole'),
  },
});
