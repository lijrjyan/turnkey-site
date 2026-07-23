---
title: Install Turnkey
description: Choose the honest installation path for the current release state.
---

Turnkey **0.1.0** is published on [PyPI](https://pypi.org/project/turnkey/).

## Recommended: install from PyPI

Prerequisites: Python 3.10 or newer.

```bash
pip install turnkey
turnkey --help
```

Expected result: the CLI prints its available commands without importing a
model server or downloading a dataset. Scaffold a runnable project with
`turnkey init my-detector`.

## From source (development and the full config library)

Prerequisites: Git and [uv](https://docs.astral.sh/uv/).

```bash
git clone https://github.com/lijrjyan/turnkey.git
cd turnkey
uv sync --extra dev
uv run turnkey run --config configs/runs/smoke.yaml
```

The repository checkout also ships the `configs/` library used throughout this
documentation and the one-click `Dockerfile` (CPU `core` target and GPU `full`
target).

## Verify the checkout

```bash
uv run pytest -q
uv run ruff check .
```

The full suite includes optional and integration-aware paths, so a documented
skip can be valid; an unexplained failure is not. Continue to the
[five-minute run](../five-minute-run/).
