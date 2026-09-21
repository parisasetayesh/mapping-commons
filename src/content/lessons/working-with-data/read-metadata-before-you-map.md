---
id: read-metadata-before-you-map
title: "Read the Metadata Before You Map"
summary: "Learn to use documentation and data dictionaries to determine what a dataset represents and whether it can answer your question."
primary_category: working-with-data
categories:
  - working-with-data
  - reading-maps-critically
lesson_type: data-workflow
level: beginner
duration_minutes: 35
topics:
  - metadata
  - data-dictionaries
  - open-data
  - documentation
tools: []
datasets: []
audiences:
  - undergraduate-students
  - community-organizations
  - researchers
learning_objectives:
  - "Identify the population, unit, time period, geography, and collection method described by dataset documentation."
  - "Use a data dictionary to interpret fields and coded values."
  - "Decide whether a dataset is relevant to a mapping question before downloading it."
prerequisites:
  - start-mappable-question
materials:
  - "A dataset landing page or documentation page"
  - "A data dictionary if available"
produces: "A dataset identity card and a preliminary decision to use, investigate, or reject the dataset."
accessibility:
  installation_required: false
  account_required: false
  large_screen_recommended: false
authors:
  - "Parisa Setayesh"
status: complete-draft
license: CC-BY-4.0
source_ids:
  - src-metadata-for-all
  - src-open-data-quality
  - src-nyc-open-data-how-to
last_reviewed: "2026-09-21"
---

> **Opening question:** A dataset has a promising title. What must you learn before deciding that it actually contains the information you need?

## At a glance

In this lesson, you will:

- Distinguish a dataset title from a precise description of its contents.
- Locate essential metadata and data-dictionary fields.
- Identify the dataset's population, unit, geography, time period, and collection method.
- Decide whether the dataset is suitable for your question.

**Time:** 35 minutes  
**You will produce:** A dataset identity card and an initial use decision.

## Why this matters

Data portals make discovery easy enough to be dangerous. A search result may contain the right words while measuring the wrong population, time period, geographic unit, or process. Downloading first and investigating later often produces hours of avoidable cleaning—or a polished map that answers a different question.

Metadata is information about the dataset. A data dictionary explains the fields within it. Together, they help you decide what the rows and columns mean before you turn them into symbols.

## Step 1: Begin with your question

Write the question you hope the dataset will help answer. Underline:

- The phenomenon or condition
- The population or subject
- The place or geographic unit
- The time period
- The type of comparison, if any

Example:

> How did reported street-flooding complaints vary among New York City neighborhoods during the summer of 2026?

This question requires more than a dataset containing the words *flooding* and *New York City*. It requires reported events, a usable date, and location information that can support a neighborhood comparison.

## Step 2: Find the dataset description

Locate the official description, “About” section, user guide, or documentation page. Record:

- Dataset title
- Publishing organization
- Short description
- Data owner or responsible office
- Date first published
- Date last updated
- Update frequency
- License or use conditions

If these are missing, do not invent them. Record the gap as part of your evaluation.

## Step 3: Identify the unit of observation

Ask what one row represents. A row might represent:

- One person or household
- One service request
- One inspection
- One sensor reading
- One facility
- One parcel
- One census tract
- One summarized month

The unit of observation determines what can be counted or compared. Ten rows do not necessarily mean ten distinct people, incidents, or places. The same person, sensor, or location may appear more than once.

Complete this statement:

> One row represents...

## Step 4: Establish coverage

Record the dataset's:

- **Population:** Who or what could appear in it?
- **Geographic coverage:** What places are included?
- **Time coverage:** What dates or reporting periods are available?
- **Collection method:** Survey, sensor, administrative record, model, volunteered report, or another method?
- **Exclusions:** Who or what is explicitly or implicitly absent?

Coverage is not the same as completeness. A dataset may cover all five boroughs while still missing unreported incidents or periods when a sensor was offline.

## Step 5: Read the data dictionary

Choose five fields likely to matter for your map. For each field, record:

| Field | Plain-language meaning | Type | Example | Missing or coded values |
|---|---|---|---|---|
| Example: `created_date` | Date the record entered the system | Date and time | 2026-07-12 14:30 | Blank if unavailable |

Pay particular attention to:

- Identifiers
- Dates and time zones
- Geographic fields
- Categories and coded values
- Units of measurement
- Status fields
- Missing-value conventions

The name of a field may not be its definition. A column called `location` could contain an address, neighborhood name, coordinates, a facility code, or a descriptive note.

## Step 6: Compare the documentation with your question

Create a short match table:

| Requirement from your question | Present? | Evidence or concern |
|---|---|---|
| Relevant phenomenon | Yes / No / Unclear | |
| Correct population | Yes / No / Unclear | |
| Appropriate geography | Yes / No / Unclear | |
| Appropriate time period | Yes / No / Unclear | |
| Usable location field | Yes / No / Unclear | |
| Necessary denominator | Yes / No / Unclear | |

The denominator is especially important when comparing places of different sizes. A complaint count without population, households, road length, or another relevant denominator may not support a fair comparison.

## Critical pause

Documentation also expresses institutional choices. Ask:

- Who decided which fields would be collected?
- What must happen for an event or person to become a record?
- Which people are more able or likely to report?
- Which categories were imposed before the data reached you?
- Can the represented community inspect, correct, or challenge the data?

A data dictionary can clarify a dataset without making its categories neutral.

## Step 7: Make a preliminary decision

Choose one:

- **Use:** The documentation shows that the dataset matches the question and contains usable location information.
- **Investigate:** The dataset may be useful, but important definitions, coverage, or location fields remain unclear.
- **Reject:** The dataset measures the wrong population, time, geography, or phenomenon.

Write one sentence explaining your decision.

## Checkpoint

- [ ] I can state what one row represents.
- [ ] I can name the dataset's population, geography, time coverage, and collection method.
- [ ] I can interpret the fields required for my map.
- [ ] I can identify documentation gaps rather than filling them with assumptions.
- [ ] I can explain why the dataset does or does not match my question.

## Key takeaway

A dataset title tells you what to investigate, not what you may safely assume. Reading metadata before downloading or mapping protects both your time and your interpretation.

## Continue

Continue to **Is This Dataset Ready to Map?**, **Organize a Spreadsheet for Mapping**, or **Data Ownership Privacy and Uncertainty**.

## Sources and further exploration

- NYC Open Data, *Metadata for All Guide*.
- NYC Open Data, *Data Quality Standards and Review Process*.
- NYC Open Data, *How To* tutorials.

