---
title: Five-minute run
description: Produce and inspect a small local Turnkey run.
---

This path proves the harness and artifact chain without claiming a remote model
or production detector was exercised.

## 1. See the available commands

```bash
uv run turnkey --help
```

## 2. Use the repository smoke path

```bash
bash scripts/run_dataset_adapters_smoke.sh
```

Expected result: the command finishes locally and validates the supported
dataset adapter boundary. It is a local smoke check, not live-provider proof.

## 3. Inspect the evidence contract

A complete run is represented by four related files:

- `run.json`: resolved run identity and configuration;
- `cases.jsonl`: case-level inputs, outputs, labels, and decisions;
- `events.jsonl`: ordered runtime observations;
- `metrics.json`: aggregate results derived from cases.

The audit path cross-checks these files instead of accepting a standalone
summary. Read [Artifacts and audit](../../concepts/artifacts-and-audit/) before
you interpret a score.
