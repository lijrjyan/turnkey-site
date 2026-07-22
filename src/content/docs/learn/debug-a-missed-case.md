---
title: 3 · Debug a missed case
description: Trace one incorrect decision through artifacts and runtime events.
---

## Outcome

You will debug a false negative as a data-flow problem rather than immediately
changing the threshold or prompt.

## Trace in causal order

1. Find the case and confirm the exact selected content.
2. Confirm the attack/transformation output passed to policy.
3. Inspect provider and detector events for missing or malformed signals.
4. Confirm judge input and outcome.
5. Recompute whether the aggregate metric includes this case as expected.

This order separates content-selection errors, detector errors, provider
failures, judgment disagreements, and reporting defects. They may produce the
same top-line symptom but require different fixes.

## Debugging rule

Preserve the failed artifact set before rerunning. A rerun with different
resolved inputs may remove the evidence you need and create a false comparison.

## Checkpoint

Write one sentence identifying the earliest stage where observed data diverges
from expected data. That stage—not the final metric—is the first repair target.

[Download the Chapter 3 notebook](/turnkey-site/notebooks/02_debug_a_missed_case.ipynb)

Next: [Work with typed signals](../typed-signals/).
