---
id: is-dataset-ready-to-map
title: "Is This Dataset Ready to Map?"
summary: "Assess a dataset's structure, location information, documentation, and preparation needs before choosing a mapping workflow."
primary_category: working-with-data
categories:
  - working-with-data
  - making-maps
lesson_type: data-workflow
level: beginner
duration_minutes: 40
topics:
  - data-readiness
  - data-cleaning
  - location-fields
  - geocoding
  - joins
tools: []
datasets: []
audiences:
  - undergraduate-students
  - community-organizations
  - researchers
learning_objectives:
  - "Identify the location strategy a dataset can support."
  - "Recognize common structural problems that prevent reliable mapping."
  - "Assign an actionable readiness status and next step."
prerequisites:
  - read-metadata-before-you-map
materials:
  - "A spreadsheet or table considered for mapping"
  - "Its metadata or data dictionary"
produces: "A map-readiness assessment with a specific next action."
accessibility:
  installation_required: false
  account_required: false
  large_screen_recommended: true
authors:
  - "Parisa Setayesh"
status: complete-draft
license: CC-BY-4.0
source_ids:
  - src-metadata-for-all
  - src-open-data-quality
  - src-data-carpentry-spreadsheets
  - src-census-mapping-files
last_reviewed: "2026-09-21"
---

> **Opening question:** What must be true about a table before mapping software can interpret its rows as locations?

## At a glance

In this lesson, you will:

- Determine how the dataset refers to location.
- Inspect the structure required for mapping.
- Recognize whether the data needs cleaning, geocoding, or a geographic join.
- Assign a readiness label and next action.

**Time:** 40 minutes  
**You will produce:** A documented map-readiness assessment.

## Why this matters

“Spatial data” does not always arrive as a map file. It may be a spreadsheet with coordinates, addresses, neighborhood names, parcel identifiers, facility codes, or Census GEOIDs. Each form requires a different workflow. The central question is not simply whether the table mentions places, but whether its location information is sufficiently structured, documented, and consistent to connect each record to an appropriate geography.

## Step 1: Identify the location strategy

Find all fields that appear to describe location. Determine which of these patterns applies:

### Coordinates

The table contains longitude and latitude, X and Y, or another coordinate pair.

**Likely next step:** Import the table as points after confirming the coordinate reference system and checking that the fields are numeric and correctly ordered.

### Addresses

The table contains street addresses, possibly with city, state, and postal code.

**Likely next step:** Clean the address fields and geocode them. Review match quality and privacy before mapping.

### Geographic names

The table uses neighborhood, county, country, ZIP code, or other place names.

**Likely next step:** Standardize names and determine whether they match a reliable geographic reference file. Names alone may be ambiguous.

### Geographic identifiers

The table contains a code such as a GEOID, BBL, FIPS code, facility identifier, or another stable key.

**Likely next step:** Join the table to a geographic file using a shared identifier. Preserve leading zeros by treating identifiers as text.

### Existing geometry

The dataset is already a GeoJSON, shapefile, GeoPackage, geodatabase, KML, or another spatial format.

**Likely next step:** Inspect its coordinate reference system, geometry type, attributes, extent, and documentation before adding it to a project.

### No usable location field

The table uses descriptive text without a consistent address, coordinate, name, or identifier.

**Likely next step:** Decide whether location can be added responsibly. The dataset may not be suitable for mapping.

## Step 2: Inspect the table structure

A durable mapping table generally follows these principles:

- One header row
- One observation or unit per row
- One variable per column
- Consistent data types within each column
- No merged cells
- No decorative titles inside the data range
- Stable identifiers where needed
- Dates stored consistently
- Missing values represented consistently
- Original values preserved during cleaning

Check five rows near the beginning, middle, and end of the table. Do not assume the first rows represent the entire file.

## Step 3: Test the location fields

Inspect the location values for:

- Missing records
- Duplicate records
- Inconsistent abbreviations
- Coordinates stored as text
- Latitude and longitude reversed
- Leading zeros removed from identifiers
- Multiple locations placed in one cell
- Geographic names that refer to different kinds of areas
- Addresses that expose private or sensitive locations

Record the number or approximate share of records affected. A problem that appears in one row may be a correctable exception; a problem affecting half the dataset may require a different strategy.

## Step 4: Confirm the unit of observation

State what one row represents and test whether the identifier supports that claim.

For example:

- Multiple sensor readings at the same location may correctly produce repeated coordinates.
- Repeated household records may represent different survey waves—or unintended duplicates.
- A tract-level table should not contain several conflicting values for the same tract and time period unless another field explains the difference.

Mapping software will display the rows you give it. It will not determine whether the repeated records make conceptual sense.

## Step 5: Determine whether a join is required

A table can contain information about places without containing geometry. If it includes a stable geographic identifier, you may need a second file containing the boundaries.

Before joining, confirm:

- Both files use the same geographic level.
- Identifiers are formatted the same way.
- Leading zeros are preserved.
- Each identifier means the same thing in both files.
- The geographic file corresponds to the correct year or boundary version.

## Critical pause

Map readiness is not only a technical question. Ask:

- Should these records be mapped at their most precise available location?
- Could an address or point expose individuals or sensitive facilities?
- Would aggregation protect privacy or distort the phenomenon?
- Did the people represented consent to public spatial display?
- Does the proposed geography reproduce an administrative boundary that is inappropriate for the community or environmental process?

A technically mappable dataset may still be unsuitable for the intended public map.

## Step 6: Assign a readiness label

Choose the status that best describes the dataset:

### Ready to map

The location fields, structure, definitions, and intended use are clear. Only routine import checks are needed.

### Requires cleaning

The location strategy is valid, but formatting, missing values, categories, dates, or identifiers must be standardized.

### Requires geocoding

The data contains addresses or place descriptions that must be converted into coordinates. Match quality and privacy require review.

### Requires a geographic join

The data contains stable geographic identifiers but no geometry. A compatible boundary file is needed.

### Requires specialist interpretation

The data may be technically usable, but its categories, model outputs, survey structure, uncertainty, or geography require additional expertise.

### Not ready or not appropriate to map

Essential documentation or location information is absent, or mapping would create unacceptable interpretive or privacy risks.

## Step 7: Record the next action

Complete this statement:

> This dataset is **[readiness label]** because **[evidence]**. Before mapping, I need to **[specific next action]**.

## Checkpoint

- [ ] I can identify the dataset's location strategy.
- [ ] I checked its structure beyond the first few rows.
- [ ] I can state what one row represents.
- [ ] I know whether coordinates, geocoding, names, identifiers, or existing geometry will be used.
- [ ] I considered privacy and interpretive suitability.
- [ ] I assigned a readiness status and next action.

## Key takeaway

Map readiness is a documented decision, not a property implied by a filename. A useful assessment connects table structure, location strategy, conceptual fit, and responsible use to a specific next step.

## Continue

Continue to **Organize a Spreadsheet for Mapping**, **Join Data to Geography**, **Import a CSV Into QGIS**, or **Data Ownership Privacy and Uncertainty**.

## Sources and further exploration

- Data Carpentry, *Data Organization in Spreadsheets*.
- NYC Open Data, *Metadata for All Guide*.
- NYC Open Data, *Data Quality Standards and Review Process*.
- U.S. Census Bureau, *Census Mapping Files*.

