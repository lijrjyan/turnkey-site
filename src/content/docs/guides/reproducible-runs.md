---
title: Reproducible runs
description: Preserve enough identity and evidence to compare Turnkey experiments.
---

Reproducibility begins before execution. Pin identities that can change and
record resolved values rather than only the user-facing shorthand.

## Pin

- Turnkey product commit or released version;
- dataset name, revision, subset, split, and content-selection rules;
- attack, detector, policy, judge, and provider revisions;
- model identity and relevant generation parameters;
- calibration artifact when thresholds are selected separately;
- random seeds where randomness affects behavior.

## Preserve

Keep the complete four-file artifact set together. Do not publish only
`metrics.json`; without cases, events, and resolved run identity, another reader
cannot explain or audit the result.

## Compare

Change one intended variable at a time. When two runs differ in dataset
revision, detector revision, and judge configuration, a score difference is not
attributable to any one of them.
