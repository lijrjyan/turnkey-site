---
title: Configuration reference
description: Stable rules for how Turnkey configuration becomes a resolved run.
---

Configuration selects the dataset/content slice, attack, component, policy,
providers, judge, metrics, revisions, and runtime parameters. Exact keys belong
to the product schema for your revision.

## Resolution rules

- Registry aliases resolve to built-in implementations.
- `module:object` and `path.py:object` resolve external components.
- Mutable external resources should carry explicit revisions.
- The resolved configuration is written to run metadata.
- Secrets must enter through runtime environment/configuration boundaries and
  must never be serialized into public artifacts.

Validate configuration before expensive execution. A syntactically valid file
can still be operationally incomplete when a real provider, dataset revision,
or external resource is unavailable.
