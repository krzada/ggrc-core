# Copyright (C) 2016 Google Inc., authors, and contributors <see AUTHORS file>
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
# Created By: anze@reciprocitylabs.com
# Maintained By: anze@reciprocitylabs.com

"""Rename control_assessments to assessments

Revision ID: 1abb0a2e8ca0
Revises: 5410607088f9
Create Date: 2016-01-13 15:20:55.866368

"""

# revision identifiers, used by Alembic.
revision = '1abb0a2e8ca0'
down_revision = '4003827b3d48'

from alembic import op

def upgrade():
  op.execute("RENAME TABLE control_assessments TO assessments")
  # Migrate all possible mappings where object_type = 'ControlAssessment'
  objects = {
      "relationships": ("source_type", "destination_type"),
      "object_people": ("personable_type",),
      "object_owners": ("ownable_type",),
      "object_documents": ("documentable_type",),
      "fulltext_record_properties": ("type",),
      "events": ("resource_type",),
      "revisions": ("resource_type",),
      "custom_attribute_values": ("attributable_type",),
      "audit_objects": ("auditable_type",),
  }
  for key, values in objects.iteritems():
    for value in values:
      sql = """UPDATE {key} SET {value} = 'Assessment'
               WHERE {value} = 'ControlAssessment'"""
      op.execute(sql.format(key=key, value=value))
  # Custom attribute definitions use table name:
  sql = """UPDATE {key} SET {value} = 'assessment'
           WHERE {value} = 'control_assessment'"""
  op.execute(sql.format(key='custom_attribute_definitions',
                        value='definition_type'))

def downgrade():
  op.execute("RENAME TABLE assessments TO control_assessments")
