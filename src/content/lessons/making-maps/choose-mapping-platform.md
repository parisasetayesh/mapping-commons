---
id: choose-mapping-platform
title: "Choose a Mapping Platform"
summary: "Select a mapping approach based on the question, data, audience, output, access conditions, and maintenance needs."
primary_category: making-maps
categories: [making-maps, working-with-data]
lesson_type: technical-workflow
level: beginner
duration_minutes: 25
topics: [tool-selection, workflow, accessibility, open-source, maintenance]
tools: [qgis, arcgis-pro, arcgis-online, leaflet, r, google-earth]
datasets: []
audiences: [undergraduate-students, community-organizations, researchers]
learning_objectives:
  - "Match mapping requirements to platform capabilities."
  - "Consider cost, installation, accounts, devices, accessibility, sharing, and maintenance."
  - "Reject unnecessary complexity."
prerequisites: [start-mappable-question, is-dataset-ready-to-map]
materials: ["A defined mapping question and output requirement"]
produces: "A platform decision with rationale and fallback."
accessibility: {installation_required: false, account_required: false, large_screen_recommended: false}
authors: ["Parisa Setayesh"]
content_owner: "Parisa Setayesh"
status: complete-draft
license: CC-BY-4.0
source_ids: [src-finding-right-tools, src-qgis-training, src-storymaps-get-started, src-leaflet-quick-start, src-r-leaflet, src-earth-engine-get-started, src-learnosm-beginner]
last_reviewed: "2026-09-21"
---


> **Opening question:** What is the simplest platform that can responsibly produce, share, and maintain the map you need?

## At a glance

In this lesson, you will:

- Define the required map output before comparing platforms.
- Evaluate tools against data, analysis, access, sharing, and maintenance needs.
- Select a primary approach and a lower-complexity fallback.
- Explain why a tool fits this project without calling it universally “best.”

**Time:** 25 minutes  
**You will produce:** A platform requirements matrix, decision, and fallback.

## Why this matters

Beginners are often told to choose a tool before they have defined what the map must do. That reverses the workflow. A platform can be powerful and still be wrong for a project because it requires an unavailable account, does not support the data, produces an inaccessible output, or leaves no one able to update the map later.

Tool selection is not a contest to find the most advanced software. It is a decision about fit. The right choice may be a printed map, a shared annotation activity, a desktop GIS project, a hosted story, a coded web map, or an existing public dashboard.

## Step 1: Define the desired output

Choose the closest description:

- **Static map:** a figure for a report, poster, slide, handout, or social post
- **Exploratory map:** a workspace for inspecting layers, fields, and spatial relationships
- **Interactive web map:** a browser-based map with pan, zoom, layers, filters, or pop-ups
- **Narrative map:** maps combined with text, images, audio, or a sequence of places
- **Collaborative map:** several people add, edit, or review information
- **Field map:** participants collect locations and observations outside the classroom or office
- **Analytical workflow:** spatial operations, reproducible calculations, or large datasets
- **Community meeting map:** a projected, printed, or phone-accessible map designed to support discussion

Write one sentence:

> We need a **[output type]** for **[audience]** to **[use]**.

If the project requires several outputs, identify the minimum viable one first.

## Step 2: Identify non-negotiable requirements

Mark each requirement as **must have**, **useful**, or **not needed**.

| Requirement | Priority | Notes |
|---|---|---|
| Works without installing software | | |
| Works without creating an account | | |
| Works with intermittent internet | | |
| Supports spreadsheet or CSV data | | |
| Supports GIS vector or raster files | | |
| Performs spatial analysis | | |
| Produces print-quality layouts | | |
| Creates an interactive public link | | |
| Combines maps with narrative media | | |
| Supports collaborative editing | | |
| Supports field collection | | |
| Can be reproduced from code | | |
| Can be maintained by the intended group | | |
| Allows data and outputs to be exported | | |

Also record the available device, operating system, screen size, internet connection, budget, organizational licenses, time, and technical support.

## Step 3: Compare broad approaches

This table is an orientation, not a permanent product ranking. Features, plans, and interfaces change; verify current requirements before committing a project.

| Approach | Often a good fit for | Main commitments to consider |
|---|---|---|
| **Paper or shared image** | Meetings, annotation, low-connectivity settings, rapid discussion | Limited automated analysis; revisions require a clear process |
| **Existing dashboard or map** | Reading and sharing already-published information | Limited control over definitions, design, access, or longevity |
| **QGIS** | Desktop GIS, data preparation, spatial analysis, static layouts, open workflows | Installation, larger screen, file management, learning time |
| **ArcGIS Pro** | Desktop GIS in organizations or courses with an Esri environment | Installation, compatible device, licensing and account arrangements |
| **ArcGIS Online or StoryMaps** | Hosted web maps, narrative presentation, organizational sharing | Account permissions, hosting arrangements, platform dependency |
| **Google Earth** | Familiar place exploration, tours, imagery, simple placemarks | Limited analytical control compared with desktop GIS |
| **OpenStreetMap editing** | Contributing shared geographic features and running mapathons | Community data practices, public edits, tagging conventions |
| **Leaflet** | Custom interactive web maps | HTML, CSS, JavaScript, hosting, and maintenance knowledge |
| **R with spatial packages** | Reproducible analysis and maps in an R workflow | Coding knowledge and package environment |
| **Google Earth Engine** | Large-scale raster, satellite, and environmental analysis | Account and coding workflow; inappropriate for many small projects |

Do not choose a tool only because someone else used it to create a polished example. The visible map does not show the labor, licensing, data preparation, hosting, or maintenance behind it.

## Step 4: Follow the shortest responsible route

Use these decision prompts:

### Do you need to create a new map?

- **No:** Use an existing map or dashboard, then focus on reading, documentation, citation, and accessibility.
- **Yes:** Continue.

### Is the main purpose collective discussion or annotation?

- **Yes:** Begin with paper, a projected image, or a simple shared map. Digitize only if the project needs a durable digital output.
- **No:** Continue.

### Do you need spatial analysis or a carefully designed static layout?

- **Yes:** Begin with a desktop GIS such as QGIS or the supported GIS environment in your institution.
- **No:** Continue.

### Do you need a hosted narrative combining maps and media?

- **Yes:** Consider a story-mapping platform and verify account, public-access, export, and maintenance conditions.
- **No:** Continue.

### Do you need a highly customized interactive map?

- **Yes:** Consider Leaflet or another code-based web workflow only if someone can build and maintain it.
- **No:** Use a simpler hosted or static approach.

### Do you need a reproducible coded analysis?

- **Yes:** Consider R or another established research workflow used by the team.
- **No:** Do not add code merely to make the project look technical.

## Step 5: Evaluate access and stewardship

For the leading option, ask:

- Can every intended creator use the required device?
- Does the platform require an individual or institutional account?
- Who pays if a license or hosting plan changes?
- Can the data and final output be exported in usable formats?
- Can the map work in print or as a static alternative?
- Is the interface usable with a keyboard and screen reader?
- Can text, legends, and controls be understood on a phone and projected screen?
- Who will hold credentials and update the map?
- What happens when the student graduates, grant ends, or staff member leaves?

Open-source software can reduce some licensing barriers, but it does not automatically solve device access, training, hosting, or maintenance.

## Step 6: Test with a small sample

Before moving the entire dataset or project into a platform, test:

1. One representative data file
2. One difficult field or geographic operation
3. One desired symbol or interaction
4. One export or sharing method
5. One target device or presentation setting

Record what worked, what required extra labor, and what could not be exported. A ten-row test can reveal a bad fit before the platform becomes difficult to leave.

## Critical pause

Every platform distributes power and labor. Ask:

- Who can create and who can only view?
- Who is excluded by accounts, devices, bandwidth, language, or technical confidence?
- Where are the data stored, and who controls access?
- Can participants correct or remove information?
- Does the project become dependent on one institution, vendor, developer, or volunteer?
- Will the polished output hide the community labor and interpretive choices that produced it?

A tool can be easy for the project team and inaccessible to the people represented by the map.

## Step 7: Complete the decision matrix

Compare no more than three realistic options:

| Criterion | Importance: 1–3 | Option A | Option B | Option C |
|---|---:|---|---|---|
| Produces required output | | | | |
| Supports the data and analysis | | | | |
| Accessible to creators | | | | |
| Accessible to audience | | | | |
| Cost and account conditions | | | | |
| Export and portability | | | | |
| Maintenance capacity | | | | |
| Time to learn and build | | | | |
| Privacy and ownership fit | | | | |

Scores can support discussion, but do not allow them to conceal a non-negotiable barrier. A tool that cannot protect sensitive data is not rescued by a high total score.

Write your decision:

> We will use **[platform or approach]** because it supports **[requirements]** within our constraints of **[access, time, cost, or maintenance]**. We will begin with **[small test]**. If **[risk or dependency]** prevents its use, our fallback is **[simpler approach]**.

## Checkpoint

- [ ] I defined the audience, use, and minimum output before choosing a tool.
- [ ] I separated must-have requirements from optional features.
- [ ] I considered accounts, installation, devices, internet, cost, and learning time.
- [ ] I considered export, ownership, maintenance, and accessibility.
- [ ] I planned a small test using representative data.
- [ ] I selected a fallback that can still achieve the core purpose.
- [ ] I can explain why the choice fits this project without calling it universally best.

## Key takeaway

Choose the least complex platform that can meet the project's substantive, technical, accessibility, and stewardship requirements. A sustainable map is one the intended people can create, understand, revise, export, and maintain.

## Continue

Continue to **Make Your First Map in QGIS** for an open-source desktop workflow, or return to the relevant pathway for a public-data, classroom, community, or research project.

## Sources and further exploration

- CUNY Graduate Center Digital Initiatives, *Finding the Right Tools for Mapping*.
- QGIS, *Training Manual*.
- ArcGIS Learn, *Get Started with ArcGIS StoryMaps*.
- Leaflet, *Quick Start Guide*.
- Posit, *Leaflet for R*.
- Google for Developers, *Get Started with Earth Engine*.
- LearnOSM, *Beginner's Guide*.
