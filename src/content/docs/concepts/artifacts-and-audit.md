---
title: Artifacts and audit
description: Why Turnkey treats evidence as a connected four-file contract.
---

Turnkey emits four complementary artifact layers:

- `run.json` says what was resolved and intended;
- `cases.jsonl` says what happened per example;
- `events.jsonl` says how runtime stages progressed;
- `metrics.json` says how case outcomes were aggregated.

No single layer is sufficient. A metric without cases is hard to recompute; a
case without run identity is hard to reproduce; a run description without
events cannot explain an interrupted transition.

Audit recomputes and cross-checks these relationships. Its role is not only
schema validation. It detects contradictions such as aggregate counts that do
not match cases or referenced identities that do not match resolved input.
