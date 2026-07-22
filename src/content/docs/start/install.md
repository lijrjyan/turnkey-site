---
title: Install Turnkey
description: Choose the honest installation path for the current release state.
---

Turnkey is currently available as a functional **0.1.0 source preview**. The
package named `turnkey` on PyPI is **0.0.1**, a namespace reservation; it does
not yet contain the functional runtime documented on this site.

## Recommended: source preview

Prerequisites: Git, Python 3.11 or newer, and [uv](https://docs.astral.sh/uv/).

```bash
git clone https://github.com/lijrjyan/turnkey.git
cd turnkey
uv sync
uv run turnkey --help
```

Expected result: the CLI prints its available commands without importing a
model server or downloading a dataset.

## Why not `pip install turnkey` yet?

`pip install turnkey==0.0.1` reaches the reserved PyPI name, not the 0.1.0
source preview. This page will switch to the normal pip/uv install selector only
after the functional distribution is published and verified from a clean
environment.

## Verify the checkout

```bash
uv run pytest -q
uv run ruff check .
```

The full suite includes optional and integration-aware paths, so a documented
skip can be valid; an unexplained failure is not. Continue to the
[five-minute run](../five-minute-run/).
