---
id: import-csv-qgis
title: "Import a CSV Into QGIS"
summary: "Turn a documented table with coordinates into a point layer and verify that its locations are correct."
primary_category: making-maps
categories: [making-maps, working-with-data]
lesson_type: technical-workflow
level: beginner
duration_minutes: 35
topics: [qgis, csv, coordinates, point-layer, crs, verification]
tools: [qgis]
datasets: ["A CSV with documented longitude and latitude fields"]
audiences: [undergraduate-students, researchers, community-organizations]
learning_objectives:
  - "Identify valid coordinate fields and their reference system."
  - "Import a delimited table as points."
  - "Verify extent, location, missing records, and coordinate order."
prerequisites: [first-map-in-qgis, is-dataset-ready-to-map]
materials: ["QGIS", "A coordinate-based CSV and metadata"]
produces: "A verified point layer and import note."
accessibility: {installation_required: true, account_required: false, large_screen_recommended: true}
authors: ["Parisa Setayesh"]
content_owner: "Parisa Setayesh"
status: structured-stub
license: CC-BY-4.0
source_ids: [src-qgis-csv, src-qgis-crs]
last_reviewed: null
---

> **Opening question:** How can you confirm that a table of coordinates became the locations its documentation describes?

## Planned learning sequence

1. Inspect coordinate field names, types, ranges, missingness, and documentation.
2. Confirm X and Y order and the coordinate reference system.
3. Add the delimited text layer without editing the source.
4. Zoom to the layer and check for points at zero, swapped coordinates, or unexpected extents.
5. Compare sample records with known locations.
6. Save an appropriate spatial copy if needed.

## Critical pause

Do point locations expose people or sensitive facilities, and would aggregation or restricted access be more responsible?

## Planned checkpoint

Learners verify representative records and report how many rows failed to produce valid points.

