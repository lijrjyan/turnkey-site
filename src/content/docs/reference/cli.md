---
title: CLI reference
description: Discover the exact Turnkey command surface for your product revision.
---

The command-line interface is the primary experiment entry point. Because the
functional package is still a source preview, use generated help from the exact
checkout as the exhaustive command reference:

```bash
uv run turnkey --help
uv run turnkey <command> --help
```

Help output is version-correct for your checkout and should be preferred over a
copied option list. Common command families cover running experiments,
inspecting/exporting reports, auditing artifacts, planning matrices, and
calibrating detectors. Availability can change before the first functional
PyPI release.

For reproducibility, save the executed command and resolved `run.json`; a shell
command alone may contain aliases whose targets change between revisions.
