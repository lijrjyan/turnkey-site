---
title: Artifact schema
description: The stable public roles of Turnkey's run, case, event, and metric files.
---

| File | Cardinality | Role | First debugging use |
|---|---:|---|---|
| `run.json` | one per run | resolved identity, configuration, and provenance | confirm what actually ran |
| `cases.jsonl` | one row per case | inputs, outputs, labels, decisions, and case evidence | inspect a surprising example |
| `events.jsonl` | many ordered events | runtime transitions and observations | find the earliest failed stage |
| `metrics.json` | one per run | aggregate results derived from cases | identify/recompute a reported score |

Fields may evolve during the source-preview phase. Consumers should validate
the schema/version carried by artifacts, preserve unknown fields when safely
round-tripping, and avoid joining files by line number when explicit identifiers
exist.
