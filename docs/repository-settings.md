# Repository settings baseline

This file records GitHub settings that cannot be enforced from tracked files.
Compare the live repository against it after repository creation and before a
public launch.

## General

- Default branch: `main`.
- Features: Issues enabled; Wikis disabled unless they gain a distinct owner.
- Pull requests: squash merge enabled; merge commits and auto-delete branches
  are maintainer choices, but the resulting history must remain reviewable.
- Private vulnerability reporting: enabled.

## Ruleset for `main`

Create a branch ruleset targeting `main`:

- Require a pull request before merging.
- Require at least 1 approving review and dismiss stale approvals.
- Require review from Code Owners.
- Require conversation resolution before merging.
- Require the `Site checks / check` status check.
- Block force pushes and branch deletion.
- Do not allow direct maintainer bypass for routine content changes.

The initial repository bootstrap may mirror one owner-authorized, fully
verified `dev` commit to an empty `main`. After the ruleset exists, promotion is
reviewed through a pull request.

## Actions

- GitHub Actions: enabled.
- Workflow permissions: read repository contents by default.
- Allow actions used by the tracked workflows; review Dependabot updates before
  accepting new major action versions.

## Pages

- **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- The `github-pages` environment is created by the deployment workflow.
- Keep deployment limited to the tracked `main` workflow.
- Private repositories require a GitHub plan that supports GitHub Pages from
  private repositories; otherwise make this documentation repository public.

## Periodic audit

Recheck this baseline after repository visibility, ownership, default branch,
custom domain, or GitHub plan changes. Store dated evidence in the local
`turnkey-build` control-plane repository, not in this public repository.
