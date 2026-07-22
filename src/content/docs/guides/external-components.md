---
title: External components
description: Load a custom Turnkey component while preserving the public runtime boundary.
---

Turnkey supports built-in registry aliases and external Python entry points.
Use an external component when the detector or policy belongs to your project
and should evolve without editing Turnkey's runner.

## Entry-point forms

- `your_package.module:object` for an installed/importable module;
- `path/to/component.py:object` for a local development file.

The exported object must satisfy the component contract expected by the product
revision you run. Keep policy, providers, parameters, and cleanup ownership
explicit. Avoid global initialization that cannot be cleaned up between runs.

## Development sequence

1. Prove a small deterministic local path behind the real interface.
2. Add typed detector signals and focused contract tests.
3. Wire the real model or service provider behind the provider boundary.
4. Verify local and live-integration profiles separately.
5. Preserve resolved entry point, parameters, and revisions in `run.json`.

An importable object proves interface exposure. It does not by itself prove the
real provider profile or a live service call.
