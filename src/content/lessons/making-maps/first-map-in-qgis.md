---
id: first-map-in-qgis
title: "Make Your First Map in QGIS"
summary: "Build and save a simple QGIS project while learning how layers, attributes, symbology, and project files relate."
primary_category: making-maps
categories:
  - making-maps
  - working-with-data
  - reading-maps-critically
lesson_type: technical-workflow
level: beginner
duration_minutes: 60
topics:
  - desktop-gis
  - layers
  - attributes
  - symbology
  - coordinate-reference-systems
tools:
  - qgis
datasets:
  - "A documented polygon or point layer supplied with the lesson"
audiences:
  - undergraduate-students
  - graduate-students
  - researchers
  - community-organizations
learning_objectives:
  - "Explain the relationship among a QGIS project, a data layer, geometry, and attributes."
  - "Add and inspect a spatial layer."
  - "Apply a basic symbol based on the data's meaning."
  - "Save a portable project without confusing the project file with the underlying data."
prerequisites:
  - start-mappable-question
  - is-dataset-ready-to-map
materials:
  - "A computer with a current long-term-release or current stable version of QGIS"
  - "The lesson dataset and its documentation"
produces: "A saved QGIS project containing one inspected and styled layer plus a brief interpretation note."
accessibility:
  installation_required: true
  account_required: false
  large_screen_recommended: true
authors:
  - "Parisa Setayesh"
status: complete-draft
license: CC-BY-4.0
source_ids:
  - src-qgis-training
  - src-qgis-basic-map
  - src-qgis-crs
last_reviewed: "2026-09-21"
---

> **Opening question:** What is the minimum you need to understand in QGIS before its interface begins to feel like a mapping workspace rather than an aviation control panel?

## At a glance

In this lesson, you will:

- Create and save a QGIS project.
- Add one documented spatial layer.
- Inspect its geometry, attributes, extent, and coordinate reference system.
- Apply a simple symbol based on what the data represents.
- Write one interpretation and one limitation.

**Time:** 60 minutes  
**You will produce:** A saved QGIS project with one readable layer and an interpretation note.

## Before you begin

This lesson assumes that QGIS is already installed and that you have a supplied practice dataset. Interface labels can change slightly among versions and operating systems, but the underlying workflow remains consistent.

Create a working folder containing:

```text
first-qgis-map/
├── data/
├── project/
├── exports/
└── notes/
```

Place the supplied dataset and documentation in `data/`. Do not edit the original file during this lesson.

## Step 1: State the map's purpose

Before opening QGIS, complete:

> I am creating this map to help **[audience]** understand **[question or condition]**.

> The map will be used in **[class, report, meeting, exploration, or another setting]**.

This statement guides later decisions about what to add, emphasize, and export.

## Step 2: Create and save the project

Open QGIS and create a new project. Immediately save it inside the `project/` folder with a descriptive name, such as:

```text
first-qgis-map.qgz
```

The `.qgz` project stores references to layers, styles, layouts, and project settings. It does not automatically contain all the source data. Moving or deleting the files in `data/` can therefore break the project.

Save early and save regularly.

## Step 3: Recognize the main interface regions

Locate:

- **Map canvas:** where layers are drawn
- **Layers panel:** the drawing order and visibility of loaded layers
- **Browser panel:** a way to navigate files and data connections
- **Toolbars and menus:** commands for navigation, editing, analysis, and layout
- **Status bar:** scale, coordinates, project coordinate reference system, and rendering information

You do not need to learn every button. For this lesson, focus on adding, inspecting, navigating, styling, and saving.

## Step 4: Add the practice layer

Use the Browser panel or the appropriate **Add Layer** command to open the supplied dataset.

After it appears:

1. Confirm that the layer is listed in the Layers panel.
2. Zoom to the layer if it is not visible.
3. Toggle its visibility off and on.
4. Rename the displayed layer if its filename is unclear. This changes the project label, not the original dataset.

If the layer appears in the wrong part of the world or not at all, stop and investigate its coordinate reference system rather than dragging or editing the geometry.

## Step 5: Inspect what the layer represents

Open the layer properties or information and record:

- Geometry type: point, line, or polygon
- Feature count
- Geographic extent
- Coordinate reference system
- Source filename and format

Then open the attribute table. Ask:

- What does one feature or row represent?
- Which field is the identifier?
- Which fields are labels, categories, counts, rates, or dates?
- Are missing values present?
- Does the table match the documentation?

Select one row and observe the corresponding feature on the map. This is the essential GIS relationship: geometry provides location and shape; attributes describe the feature.

## Step 6: Check the coordinate reference system

The coordinate reference system, or CRS, defines how coordinates relate to locations on Earth and how the curved Earth is represented on a flat display.

Record:

- The layer CRS
- The project CRS
- Whether QGIS is transforming the layer for display

For this first exercise, preserve the supplied layer's defined CRS unless the lesson dataset explicitly requires another choice. Do not assign a CRS merely because the map “looks wrong.” Assigning a CRS and transforming data into another CRS are different operations.

## Step 7: Apply a meaningful symbol

Open the layer's symbology settings. Begin with a single symbol and make deliberate choices:

- Is the feature a point, line, or area?
- Does color represent a category, quantity, or simply feature identity?
- Is the symbol readable against the background?
- Does the outline help distinguish adjacent features?
- Is transparency useful, or does it make the map ambiguous?

If you symbolize by an attribute, confirm what the field represents before choosing graduated or categorized styling. Do not classify an identifier as though it were a quantity.

For the first map, a simple and legible choice is more valuable than an elaborate one.

## Step 8: Navigate without changing the data

Practice:

- Pan
- Zoom in and out
- Zoom to the layer
- Identify a feature
- Select and clear a selection
- Turn the layer off and on

These actions change your view or selection. They do not edit the source data.

## Critical pause

The layer may look authoritative once it is displayed in GIS. Pause and ask:

- Who created the geometry and attributes?
- What date or boundary version does it represent?
- What variation is hidden inside the mapped features?
- Does the geographic unit fit the process or community being studied?
- What would someone misunderstand if they saw only this layer?
- Is any location sensitive or inappropriate to display precisely?

Software can render a dataset without establishing that it is complete, current, ethical, or appropriate.

## Step 9: Save and document the project

Save the project. In `notes/`, record:

- Project purpose
- Dataset title and source
- What one feature represents
- Layer and project CRS
- Fields used for labels or symbols
- One interpretation supported by the map
- One limitation

Use this structure for the interpretation:

> The map shows **[features or indicator]** for **[place and time]**. The visible pattern suggests **[limited interpretation]**. It does not establish **[causal or missing claim]**.

## Checkpoint

- [ ] I saved the QGIS project in a dedicated project folder.
- [ ] I can distinguish the project file from the source dataset.
- [ ] I can explain what one feature and one row represent.
- [ ] I recorded the layer and project CRS.
- [ ] My symbol reflects the meaning of the data.
- [ ] I wrote one supported interpretation and one limitation.

## Key takeaway

A first GIS map is not merely a layer displayed on a canvas. It is a documented relationship among a question, an audience, geometry, attributes, coordinate systems, and visual choices.

## Continue

Continue to **Import a CSV Into QGIS**, **Join Data to Geography**, **Symbolize and Classify Data in QGIS**, or **Export and Share a Map**.

## Sources and further exploration

- QGIS, *Training Manual*.
- QGIS, *Creating and Exploring a Basic Map*.
- QGIS, *A Gentle Introduction to Coordinate Reference Systems*.

