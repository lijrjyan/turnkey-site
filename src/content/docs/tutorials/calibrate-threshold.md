---
title: Calibrate a threshold
description: Derive and preserve a detector threshold without contaminating evaluation.
---

## Goal

Produce a versioned calibration artifact from calibration data, then reference
that fixed artifact in a separate evaluation run.

## Why separation matters

Selecting a threshold on the final evaluation set leaks answer information into
the configuration. Turnkey keeps calibration inputs, candidate thresholds,
selection criteria, and the chosen value in an artifact so the evaluation can
be reproduced and audited.

## Workflow

1. Pin the calibration dataset and detector/provider revisions.
2. Run the detector over calibration examples and preserve raw scores.
3. Sweep candidate thresholds under the chosen objective and constraints.
4. Save the selected threshold plus inputs, criterion, and provenance.
5. Start a separate evaluation that consumes the frozen artifact.

Use `uv run turnkey --help` and the product's detector calibration subcommand
help for the exact arguments in your source revision.

## Expected result

The evaluation run points to a calibration artifact whose inputs and selection
criterion can be inspected. Changing the calibration dataset, detector
revision, or objective creates a new artifact rather than silently overwriting
the old decision.
