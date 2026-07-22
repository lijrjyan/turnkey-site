---
title: 1 · First auditable run
description: Learn how a Turnkey command becomes inspectable evidence.
---

## Outcome

You will distinguish “the command exited” from “the experiment can be audited,”
and you will know which file to open first when the two disagree.

## Mental model

A run is not one metric. Turnkey resolves inputs and components, evaluates
cases, records ordered events, derives aggregate metrics, and preserves the
resolved run description. Those layers let you trace a surprising score back
to a concrete case and runtime decision.

```text
configuration → resolved run → cases + events → metrics → audit
```

## Try it

Use the source-preview setup from [Install](../../start/install/), then inspect
the CLI and repository smoke path:

```bash
uv run turnkey --help
bash scripts/run_dataset_adapters_smoke.sh
```

The smoke path proves a local adapter flow. It does not prove that credentials,
model endpoints, or remote datasets work.

## Checkpoint

If an aggregate score looks wrong, start with the affected row in `cases.jsonl`,
then correlate its events in `events.jsonl`. `metrics.json` is the summary to
recompute, not the only source of truth.

[Download the Chapter 1 notebook](/turnkey-site/notebooks/00_quickstart.ipynb)

Next: [Build your own detector](../build-your-own-detector/).
