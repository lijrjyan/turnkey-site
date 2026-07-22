---
title: System model
description: Understand Turnkey's component flow and extension ownership.
---

```text
dataset → content selection → attack → paired reference/intervention
                                      └→ policy → provider → target
                                             └→ typed detector signals
                           → judge → metrics → artifacts → audit
```

The public extension boundary groups a policy, providers, parameters, and
cleanup. The runner owns orchestration and evidence; a component owns its method
behavior. This separation lets a new detector reuse dataset selection, attacks,
judges, metrics, and artifact validation.

Built-ins use stable aliases. External components use module/file entry points.
Both paths converge before execution so downstream runtime behavior can remain
generic.

The paired reference/intervention shape supports questions such as whether a
defense changes harmful behavior, benign behavior, or both. Metrics should be
read in that experimental context rather than as isolated detector scores.
