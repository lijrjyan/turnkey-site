---
title: Inspect run artifacts
description: Trace a selected case across Turnkey's four-file evidence contract.
---

## Prerequisites

Use a completed local run that contains `run.json`, `cases.jsonl`,
`events.jsonl`, and `metrics.json`. Work on a copy if another process may still
be writing the directory.

## Select one case

Open `cases.jsonl` and choose a row with a surprising label, score, or decision.
Record its case identifier and the exact input/output fields; do not rely on a
truncated terminal preview.

## Correlate runtime events

Search `events.jsonl` for the same case identifier. Read events in recorded
order and identify the boundary transitions: selection, attack/transformation,
policy/provider, detector signal, and judge.

```bash
rg '"case_id":"YOUR_CASE_ID"' path/to/events.jsonl
```

## Check the aggregate

Use `metrics.json` to identify which aggregate includes the case, then compare
the underlying case outcome with the metric definition. Use the product's audit
command for a full cross-check; manual inspection is a diagnosis aid, not a
replacement for validation.

## Expected result

You can name the earliest stage where actual data differs from expectation and
show the artifact/event that supports the claim. If identifiers do not join
across files, treat that as an artifact-integrity defect.
