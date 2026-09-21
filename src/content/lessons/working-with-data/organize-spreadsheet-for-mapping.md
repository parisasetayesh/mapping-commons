---
id: organize-spreadsheet-for-mapping
title: "Organize a Spreadsheet for Mapping"
summary: "Restructure a table so that rows, variables, identifiers, dates, and missing values can be interpreted reliably."
primary_category: working-with-data
categories: [working-with-data, making-maps]
lesson_type: data-workflow
level: beginner
duration_minutes: 40
topics: [spreadsheets, tidy-data, identifiers, dates, cleaning]
tools: [spreadsheet-software]
datasets: []
audiences: [undergraduate-students, community-organizations, researchers]
learning_objectives:
  - "Organize one observation per row and one variable per column."
  - "Preserve identifiers, dates, original values, and missingness."
  - "Create a clean copy without overwriting the raw source."
prerequisites: [is-dataset-ready-to-map]
materials: ["A spreadsheet requiring preparation", "Any spreadsheet application"]
produces: "A map-ready working copy and a short cleaning log."
accessibility: {installation_required: false, account_required: false, large_screen_recommended: true}
authors: ["Parisa Setayesh"]
content_owner: "Parisa Setayesh"
status: complete-draft
license: CC-BY-4.0
source_ids: [src-data-carpentry-spreadsheets, src-gcdi-organize-data]
last_reviewed: "2026-09-21"
---


> **Opening question:** Can another person determine what every row, column, identifier, and blank value means?

## At a glance

In this lesson, you will:

- Identify what one row and one column represent.
- Separate data from formatting and presentation.
- Standardize identifiers, dates, categories, and missing values carefully.
- Preserve a raw source and document every meaningful transformation.

**Time:** 40 minutes  
**You will produce:** A map-ready working copy and a short cleaning log.

## Why this matters

Mapping software needs more than a spreadsheet that looks tidy on screen. It needs a table whose structure is predictable and whose geographic fields can be interpreted consistently.

Merged headings, decorative blank rows, totals mixed with observations, colors used as categories, inconsistent place names, and identifiers converted to numbers may all be understandable to the person who created the sheet. They become problems when software—or another person—has to interpret the data.

Cleaning is not the same as making messy information look uniform. Some inconsistencies are errors; others record real ambiguity or difference. A responsible workflow preserves the source, documents decisions, and does not silently convert uncertainty into certainty.

## Step 1: Preserve the raw file

Do not begin by editing the only copy.

Create a project folder such as:

```text
mapping-project/
  data-raw/
  data-working/
  outputs/
  notes/
```

Place the original download or received file in `data-raw/`. Create a clearly named working copy in `data-working/`, for example:

`flood-observations_working_2026-09-21.xlsx`

Record the original filename, source, download date, and license or access condition in your notes. If the source is updated regularly, also record the period represented by the copy you downloaded.

## Step 2: State what one row represents

Complete this sentence before restructuring the table:

> One row represents one **___**.

Possible units include one person, household, event, sensor reading, parcel, facility, neighborhood, survey response, or month. If one row contains several observations—January, February, and March in separate column groups, for example—the unit may be unclear.

The unit of observation affects what you can count. If one complaint can appear in several status-update rows, counting rows does not equal counting complaints.

Add a note at the top of your cleaning log stating the unit of observation and any uncertainty about it.

## Step 3: Use a rectangular table

A map-ready table generally follows these rules:

- One header row
- One variable per column
- One observation per row
- One value per cell
- No merged cells
- No decorative blank rows or columns inside the table
- No totals or subtotals mixed with observations
- No meaning stored only in font, fill color, comments, or cell position

### Before

| Neighborhood | Jan complaints | Feb complaints | Notes |
|---|---:|---:|---|
| North | 12 | 18 | partial Feb |

### Possible working structure

| neighborhood | month | complaint_count | data_note |
|---|---|---:|---|
| North | 2026-01 | 12 | |
| North | 2026-02 | 18 | partial month |

The second structure makes time an explicit variable. Whether you should reshape the table depends on the intended analysis, but the meaning of each field should always be explicit.

## Step 4: Create clear field names

Use short, stable field names that remain understandable outside the spreadsheet. Prefer:

- `observation_date`
- `neighborhood_name`
- `complaint_count`
- `geoid`
- `latitude`
- `longitude`

Avoid duplicate headings, unexplained abbreviations, punctuation-heavy names, or headings that contain units without documentation. Record a plain-language definition for each important field in a small data dictionary:

| Field | Meaning | Type | Example | Notes |
|---|---|---|---|---|
| `geoid` | Census geographic identifier | Text | `36061000100` | Preserve leading zeros |
| `observation_date` | Date observation was recorded | Date | `2026-07-14` | Not necessarily event start |

## Step 5: Protect identifiers

Identifiers connect records but are not quantities. ZIP codes, GEOIDs, parcel codes, and facility IDs may contain leading zeros or long digit strings. Spreadsheet software may remove zeros, convert values to scientific notation, or alter long numbers.

Store identifiers as text. Check:

- Are expected leading zeros present?
- Is the length consistent for the same identifier type?
- Are spaces or punctuation meaningful or accidental?
- Does each identifier refer to the same geographic level and boundary version?
- Are there duplicates, and are they expected?

Never calculate averages or sums of identifiers. Their digits label records; they do not measure them.

## Step 6: Standardize values without erasing meaning

Look for variations such as:

- `Brooklyn`, `BROOKLYN`, and `Bklyn`
- `Yes`, `Y`, `1`, and `TRUE`
- `7/4/26`, `July 4, 2026`, and `2026-07-04`
- `N/A`, `Unknown`, blank, `0`, and `Not applicable`

Create standardized values only after deciding whether the differences are equivalent. Preserve the original field when interpretation is involved. For example:

| neighborhood_original | neighborhood_clean |
|---|---|
| Bklyn | Brooklyn |

This allows another person to inspect your decision.

### Missing values are information

Do not automatically replace blanks with zero.

- **Zero** means the phenomenon was measured and none was recorded.
- **Unknown** means the value exists in principle but is not known.
- **Not collected** means the project did not gather it.
- **Not applicable** means the field does not apply.
- **Suppressed** may mean the value was withheld for privacy or reliability.

Choose a consistent representation and document it. Mapping software often renders null values differently from zero—if the distinction survives the spreadsheet.

## Step 7: Check dates, coordinates, and geographic fields

### Dates

Use a consistent date representation, preferably an unambiguous format such as `YYYY-MM-DD`. Keep date and time in separate fields if that improves use, and document the time zone when time matters.

Do not assume the only date field represents when an event occurred. It may record when a case was created, updated, closed, or published.

### Coordinates

For latitude and longitude:

- Keep each coordinate in its own numeric column.
- Confirm which field is latitude and which is longitude.
- Record the coordinate reference system, commonly WGS 84 for longitude/latitude data.
- Check that values fall within the expected geographic range.
- Preserve enough decimal precision for the intended use without implying unnecessary precision.

### Place names and join keys

If the table will be joined to geographic boundaries, use a stable identifier where possible. Place names can differ in spelling, language, abbreviation, or boundary meaning. Keep the readable name, but do not rely on it as the only key when an appropriate identifier exists.

## Step 8: Separate source fields from derived fields

A derived field is calculated or classified from other information: a rate, year extracted from a date, grouped category, or cleaned label.

Use a new column rather than overwriting the source field. Record:

- New field name
- Source fields
- Formula or rule
- Date created
- Reason
- Person responsible, when relevant

This makes the workflow reviewable and allows a correction without reconstructing the source.

## Critical pause

Cleaning contains interpretive decisions. Ask:

- Who defined the categories being standardized?
- Does combining labels erase a distinction important to participants?
- Are unfamiliar place names errors, local terms, or another language?
- Does removing duplicate rows remove repeated events or repeated reporting?
- Are suppressed or missing values connected to privacy, access, or institutional neglect?
- Who should review corrections that change the meaning of a record?

Do not use “clean” as a synonym for simple, complete, or institutionally familiar.

## Step 9: Create a cleaning log

Record each meaningful change:

| Date | Field or rows | Change | Reason | Check performed |
|---|---|---|---|---|
| 2026-09-21 | `geoid` | Converted to text and restored two leading zeros | Required for boundary join | Checked length against documentation |

Mechanical changes can be grouped, but interpretive changes should be individually reviewable.

Before saving, check:

- Row count before and after
- Duplicate count
- Missing values in required fields
- Unexpected categories
- Identifier length and uniqueness
- Coordinate ranges
- Date range
- Formulas converted or preserved intentionally

Export to CSV only after preserving the richer working file and documentation. CSV does not retain multiple sheets, formatting, formulas, or data types reliably.

## Checkpoint

- [ ] I preserved an unchanged raw copy.
- [ ] I can state what one row represents.
- [ ] The table has one header row, one variable per column, and one value per cell.
- [ ] Identifiers are stored as text and retain leading zeros.
- [ ] Dates and missing values are consistent and documented.
- [ ] Original and derived fields remain distinguishable.
- [ ] I checked row counts, duplicates, required fields, and geographic values.
- [ ] My cleaning log explains the consequential changes.

## Key takeaway

A map-ready spreadsheet is not merely visually neat. It preserves the identity and meaning of each observation, makes geographic fields predictable, distinguishes absence from zero, and leaves a trace of how the working data came to be.

## Continue

Continue to **Join Data to Geography** when the table shares an identifier with a geographic file, or **Import a CSV Into QGIS** when the table contains usable coordinates.

## Sources and further exploration

- Data Carpentry, *Data Organization in Spreadsheets*.
- CUNY Graduate Center Digital Initiatives, *How to Organize Data for Maps*.
