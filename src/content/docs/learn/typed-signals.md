---
title: 4 · Work with typed signals
description: Carry detector evidence through the runtime with explicit structure.
---

## Outcome

You will understand why a detector decision needs structured evidence and how
that structure improves debugging, policy composition, and audit.

## From boolean to evidence

A boolean can answer “blocked or allowed,” but it cannot explain which detector
produced the decision, what score or label it emitted, or which threshold and
metadata were active. Typed signals make those fields explicit and validate
their shape at the boundary.

```text
detector → typed signal → policy decision → case artifact → audit
```

The type is not decoration. It is the shared contract between independently
evolving detectors, policies, serialization, and metrics.

## Checkpoint

When adding a signal field, trace every consumer: construction, policy logic,
artifact serialization, report/export, and backward compatibility. A field
that exists only in one layer is not an end-to-end feature.

[Download the Chapter 4 notebook](/turnkey-site/notebooks/03_typed_signals.ipynb)

Continue with the task-focused [Tutorials](../../tutorials/) or use the
[Reference](../../reference/) for exact contracts.
