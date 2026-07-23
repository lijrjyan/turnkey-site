---
title: Release status
description: Current truth about Turnkey source, PyPI, and website versions.
---

## Current state

| Surface | Version/state | Meaning |
|---|---|---|
| PyPI package | `0.1.0` | Functional release: `pip install turnkey`. |
| Product repository | tag `v0.1.0` | First public release; development continues on `dev`. |
| Docker image | `ghcr.io/lijrjyan/turnkey` | Built and smoke-tested from the release tag. |
| Documentation | release track | The notebook set is pinned to the product commit recorded in [notebook provenance](/turnkey-site/notebooks/provenance.json). |

Install either from PyPI or from the repository; for reproducible experiments,
record the exact package version or commit alongside your run artifacts. This
page updates as a release gate, not as an implicit side effect of source
changes.
