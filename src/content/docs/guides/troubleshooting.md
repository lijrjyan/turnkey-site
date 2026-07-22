---
title: Troubleshooting
description: Route Turnkey failures to the earliest useful evidence boundary.
---

| Symptom | Inspect first | Typical boundary |
|---|---|---|
| Component cannot load | full entry point and import traceback | module/file resolution or exported object |
| Run starts but no cases complete | latest case-scoped event | provider, detector, or judge transition |
| Metric looks impossible | contributing `cases.jsonl` rows | case labels/decisions or metric definition |
| Audit rejects a run | missing/mismatched artifact named by audit | serialization, interrupted write, or drift |
| Local profile passes, real profile fails | resolved provider config and live request error | credentials, endpoint, model identity, network |

## Debugging order

1. Preserve the failing artifact directory.
2. Reproduce the smallest affected case without changing revisions.
3. Identify the earliest divergent stage.
4. Add a focused test at that boundary.
5. Fix and rerun the same case before expanding scope.

Avoid treating fallback/local success as proof that a configured real provider
was reached. The profiles answer different questions.
