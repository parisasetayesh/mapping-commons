---
id: join-data-to-geography
title: "Join Data to Geography"
summary: "Connect a table to geographic features using a shared identifier and verify that the join worked as intended."
primary_category: working-with-data
categories: [working-with-data, making-maps]
lesson_type: data-workflow
level: beginner
duration_minutes: 45
topics: [table-join, identifiers, geoid, verification, unmatched-records]
tools: [qgis, arcgis-pro]
datasets: []
audiences: [undergraduate-students, scientists, researchers]
learning_objectives:
  - "Identify a valid shared join key."
  - "Prepare identifier formats without losing leading zeros."
  - "Verify matched, unmatched, duplicated, and unexpected records."
prerequisites: [organize-spreadsheet-for-mapping, understand-geographic-units]
materials: ["A geographic file and attribute table sharing an identifier", "QGIS for the guided software steps"]
produces: "A verified join and a short join-quality report."
accessibility: {installation_required: true, account_required: false, large_screen_recommended: true}
authors: ["Parisa Setayesh"]
content_owner: "Parisa Setayesh"
status: complete-draft
license: CC-BY-4.0
source_ids: [src-geoid-guide, src-census-mapping-files, src-tiger-line, src-acs-tiger-join, src-qgis-joins, src-qgis-joins-documentation]
last_reviewed: "2026-09-21"
---


> **Opening question:** How do you know that a successful-looking join connected the correct records?

## At a glance

In this lesson, you will:

- Identify the geographic layer, data table, and shared key involved in a join.
- Check geographic level, boundary period, field type, and key uniqueness.
- Perform an attribute join in QGIS.
- Investigate matches, nonmatches, duplicates, and null results.

**Time:** 45 minutes  
**You will produce:** A verified joined layer and a short join-quality report.

## Why this matters

Many datasets contain information *about* places without containing the shapes needed to draw those places. An American Community Survey table may contain estimates for census tracts, while a TIGER/Line file contains the tract boundaries. A join connects the attributes in the table to the geographic features using a field shared by both.

A map can look plausible even when the join is incomplete or wrong. Names may differ, leading zeros may disappear, boundary versions may not match, or the table may contain several rows for each place. Verification is therefore part of the join—not an optional cleanup step after the map appears.

## Step 1: Identify the two sides of the join

A basic attribute join has:

1. **Geographic layer:** points, lines, or polygons with geometry and attributes.
2. **Data table:** additional attributes you want to attach.
3. **Join key:** a field appearing in both sources that refers to the same entity.

Example:

| Geographic layer | Data table | Shared key |
|---|---|---|
| Census tract polygons | ACS estimates by tract | GEOID |
| Tax-lot polygons | Property table | BBL or parcel identifier |
| Neighborhood polygons | Community observations summarized by neighborhood | Agreed neighborhood code |

The shared key should identify the same kind of place on both sides. A county GEOID cannot be joined directly to a tract GEOID merely because both fields are called `GEOID`.

## Step 2: Confirm geographic compatibility

Before opening software, record:

- Geographic unit in the layer
- Geographic unit in the table
- Place or coverage area
- Boundary or vintage year
- Coordinate reference system of the geographic layer
- Source and date of each file

The coordinate reference system affects the geometry's position and shape, but it does **not** determine whether an attribute join works. Attribute joins match field values. The boundary version still matters because identifiers and shapes can change over time.

Complete:

> Both sources describe **[geographic unit]** in **[coverage area]** for **[year or boundary vintage]**.

If you cannot complete this statement, pause and investigate the documentation.

## Step 3: Inspect the join keys

A good key is stable, consistently formatted, and documented. Geographic names are tempting but fragile: “Staten Island” and “Richmond County” may refer to related geography without matching as text; punctuation, capitalization, abbreviations, and language can also vary.

For each key, check:

| Check | Geographic layer | Data table |
|---|---|---|
| Field name | | |
| Field type: text or number | | |
| Example value | | |
| Expected length | | |
| Leading zeros present? | | |
| Null or blank values | | |
| Duplicate values | | |

### Preserve leading zeros

GEOIDs and other identifiers should normally be treated as text. If a code such as `00123` becomes the number `123`, it will not match the text value `00123`.

Do not add zeros until you know the documented length and structure of the identifier. “Fixing” a code by guessing can produce a valid-looking but incorrect key.

## Step 4: Determine the relationship between records

Count how often each key appears.

- **One-to-one:** one row in the table matches one feature.
- **Many-to-one:** many table records relate to one geographic feature, such as many complaints within one neighborhood.
- **One-to-many:** one table row relates to several geographic records.
- **Many-to-many:** both sides contain repeated keys.

A simple join works most predictably when the geographic layer has one feature per key and the table has one row per key. If the table contains many observations per geography, summarize the observations first—count, rate, median, or another defensible measure—or use a relational workflow designed to preserve multiple records.

Do not allow software to choose one repeated record silently.

## Step 5: Create a join plan

Write the plan before performing the operation:

> I will join **[table name]** field **[table key]** to **[geographic layer]** field **[layer key]**. I expect **[number]** geographic features and approximately **[number or percentage]** matches. Repeated keys mean **[interpretation]**.

Also identify the fields you actually need from the table. Bringing hundreds of unused columns into the layer can make inspection difficult and increase the chance of mapping the wrong field.

## Step 6: Perform the join in QGIS

The exact interface may vary slightly by version, but the logic remains the same.

1. Open a new or existing QGIS project.
2. Add the geographic layer.
3. Add the data table. A CSV without coordinates can still be added as a non-spatial table.
4. Open both attribute tables and inspect the join-key fields.
5. Open the geographic layer's **Properties**.
6. Open **Joins** and add a new join.
7. Select the data table as the join layer.
8. Select the table's key as the join field.
9. Select the geographic layer's key as the target field.
10. Choose the fields to attach and a clear field-name prefix.
11. Apply the join and reopen the geographic layer's attribute table.

At this point, seeing new columns does not prove that the join is correct. Move directly to verification.

### Temporary and exported joins

A project-level join may remain a relationship stored in the QGIS project rather than a change to the original geographic file. If you need a standalone output, export the joined layer to a new file after verification. Keep the raw layer and source table unchanged.

## Step 7: Measure join coverage

Record:

- Number of geographic features before the join
- Number of geographic features after the join
- Number with a non-null joined key or required attribute
- Number without a match
- Number of table rows not represented in the geography, if checked separately
- Duplicate-key count in each source

Calculate:

> **Join coverage = matched geographic features ÷ total geographic features × 100**

Do not use a legitimate data field to count matches if that field may be blank. Use the joined identifier or another field expected to be present for every matched row.

## Step 8: Investigate nonmatches and duplicates

Inspect several examples rather than reporting only a percentage.

Common causes include:

- Leading zeros removed
- Text on one side and numbers on the other
- Hidden spaces or punctuation
- Different geographic levels
- Different boundary years
- Changed, retired, or newly created identifiers
- Records outside the layer's coverage area
- Summary rows or headers accidentally included
- Suppressed or missing identifiers
- Multiple observations that should have been aggregated

Create a small issue table:

| Key | Problem | Likely cause | Action | Keep visible in report? |
|---|---|---|---|---|
| | | | | |

Correct problems in a documented working copy. Do not overwrite the original key fields.

## Step 9: Manually inspect matched records

Choose at least three locations:

- One expected high value
- One expected low or zero value
- One ordinary case
- Optionally, one feature near a boundary or known change

Compare the joined attributes with the source table. Confirm that the same identifier, place, period, and measure appear in both.

If possible, compare an aggregate such as the sum or count before and after the join. Differences may be legitimate, but they should be explainable.

## Critical pause

An unmatched record is not always a technical mistake. It may reveal:

- A community geography absent from an official boundary system
- A place created, dissolved, or renamed between boundary versions
- A population hidden by suppression or missing identifiers
- An event that falls outside an agency's jurisdiction
- Incompatible institutional definitions of the same term

Before deleting nonmatches, ask what they represent. A perfectly complete join can also be misleading if the shared geographic unit is inappropriate for the phenomenon being studied.

## Step 10: Write the join-quality report

Use this structure:

**Sources and versions**  
Geographic layer:  
Data table:  
Boundary and data period:

**Join method**  
Layer key:  
Table key:  
Expected relationship:

**Results**  
Total geographic features:  
Matched features:  
Unmatched features:  
Join coverage:  
Duplicate keys:

**Investigation**  
The most common causes of nonmatch were...

**Decision**  
The joined layer is **ready / ready with limitations / not ready** for mapping because...

**Limitation to disclose**  
Readers should know that...

## Checkpoint

- [ ] Both sources describe the same geographic unit and compatible period.
- [ ] The join keys refer to the same entity and use compatible formats.
- [ ] Leading zeros and original identifiers are preserved.
- [ ] I checked whether keys are unique or repeated.
- [ ] I recorded feature counts and join coverage.
- [ ] I investigated representative nonmatches and duplicates.
- [ ] I compared several matched records with the source table.
- [ ] I exported only after verification and preserved the raw files.

## Key takeaway

A join is not successful because new columns appear or a map can be drawn. It is successful when the shared identifier is meaningful, the record relationship is understood, coverage is measured, exceptions are investigated, and the resulting layer can be explained.

## Continue

Continue to **Counts, Rates, and Fair Comparisons** before mapping an indicator, or **Symbolize and Classify Data in QGIS** when the joined values are ready for visual encoding.

## Sources and further exploration

- U.S. Census Bureau, *Understanding Geographic Identifiers (GEOIDs)*.
- U.S. Census Bureau, *Census Mapping Files* and *TIGER/Line Shapefiles*.
- U.S. Census Bureau, *Joining ACS Summary Files to TIGER/Line Shapefiles*.
- QGIS Documentation, *Joins and Relations*.
- QGIS Tutorials and Tips, *Performing Table Joins*.
