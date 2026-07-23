---
title: About Turnkey
description: What Turnkey is, who it is for, and how the pieces fit together.
---

Turnkey — **Bring Your Own Detector** — is a development and debugging harness
for jailbreak detectors, guards, and model-side safety policies. It shortens
the path from "I have a detector idea" to "I can run it, inspect what
happened, and audit the result": one runtime provides paired evaluation, typed
model signals, inspectable event traces, and reproducible audit artifacts.

The first run is deliberately small: it executes on CPU, downloads no model,
and requires no API key. GPU-backed methods and remote judges are optional
layers, not prerequisites.

## Key capabilities

- **Bring your own detector.** Scaffold with `turnkey init`, then load
  `path.py:build` without forking Turnkey or editing a central registry.
- **Paired evaluation.** The reference and intervention paths run on the same
  selected and attacked input, so a detector's marginal effect is measurable.
- **Typed model signals.** Providers expose prompt logprobs, hidden states,
  gradients, and other method-owned state with cache and lifecycle accounting.
- **Debuggable failures.** Connect any case to its policy, target, provider,
  timing, cache, and measured-forward events in the CLI or an HTML report.
- **Auditable claims.** `turnkey audit` recomputes metrics and verifies
  redaction, source identity, and event relationships from the artifacts alone.

## How a run flows

```text
dataset -> attack -> target -> judge -> detector policy -> metrics -> audit
```

Every run writes four public artifacts — `run.json`, `cases.jsonl`,
`events.jsonl`, `metrics.json` — that carry the configuration, redacted paired
outcomes, runtime events, and recomputed metrics. Prompts and responses are
hashed by default; plaintext exists only in an explicitly requested private
sidecar.

## Get started

```bash
pip install turnkey
turnkey init my-detector
cd my-detector
turnkey dev ./detector.py:build --max-samples 4
```

Continue with the [installation guide](../start/install/) or the
[five-minute run](../start/five-minute-run/).

## Project links

| Resource | Location |
| --- | --- |
| Source repository | <https://github.com/lijrjyan/turnkey> |
| PyPI package | <https://pypi.org/project/turnkey/> |
| Docker image | `ghcr.io/lijrjyan/turnkey` |
| Release notes | <https://github.com/lijrjyan/turnkey/releases> |
| Issue tracker | <https://github.com/lijrjyan/turnkey/issues> |

Turnkey is released under the Apache-2.0 license. If you use it in research,
see the repository's `CITATION.cff` for a ready-to-use citation entry.
