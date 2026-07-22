---
title: 2 · Build your own detector
description: Add a small detector without forking the evaluation harness.
---

## Outcome

You will understand the public component boundary and why a small local
implementation should live behind that boundary rather than beside it as a toy.

## The extension boundary

Turnkey components group policy, providers, parameters, and cleanup. Built-in
components can be selected by registry alias; external components can be loaded
with a Python `module:object` or `path.py:object` entry point. The runner should
not need detector-specific branches.

## Small behavior, real architecture

A teaching detector may use a keyword rule, but it should still accept and
return the same kinds of values the runner expects. This preserves who calls
the detector, what evidence it emits, where cleanup happens, and where a future
model-backed provider belongs.

```python
def detect(text: str) -> bool:
    normalized = text.casefold()
    return "ignore previous instructions" in normalized
```

The function above illustrates behavior only. Follow the product's component
examples for the complete registration and signal contract.

## Checkpoint

You should be able to answer: Who owns the evaluation loop? Who owns detector
behavior? Which boundary lets each change independently?

[Download the Chapter 2 notebook](/turnkey-site/notebooks/01_build_your_own_detector.ipynb)

Next: [Debug a missed case](../debug-a-missed-case/).
