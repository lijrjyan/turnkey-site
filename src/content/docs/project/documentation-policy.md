---
title: Documentation policy
description: How Turnkey keeps tutorials readable, versioned, and honest.
---

## Sources of truth

Product code and schemas define runtime behavior. Generated CLI help defines the
exact command surface. This site explains and organizes those facts. Notebook
provenance records the product commit used for published executable material.

## Evidence language

Documentation distinguishes four levels:

1. an interface exists;
2. a local or fake path works;
3. a real profile is configured;
4. a live service call is verified.

A lower level must not be described as a higher one. This keeps quickstarts
small without overstating what they prove.

## Privacy and licensing

Do not publish internal datasets, private hosts, credentials, raw conversation
history, proprietary experiment output, or third-party content without a
compatible license. Prefer minimal synthetic examples and link to primary
sources.
