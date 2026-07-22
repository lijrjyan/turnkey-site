---
title: Detector signals
description: Structured evidence connecting detectors, policies, artifacts, and audit.
---

A detector signal represents structured evidence from one detector invocation.
Depending on the method, useful fields may include a label, score, threshold,
detector identity, or method-specific metadata.

Policies consume signals to produce decisions. Artifact serialization preserves
them for debugging and audit. Metrics consume the resulting case outcomes.
Keeping this contract typed reduces silent disagreements about field names,
missing values, and score meaning.

When extending a signal, verify its full path: detector construction, policy
consumption, serialization, export/report behavior, and compatibility with
older artifacts. A field present only in an in-memory object is not preserved
evidence.
