# Releasing Turnkey Site

`dev` is the local development branch. `main` is the reviewed, deployable state
used by GitHub Pages. Do not author or commit directly on `main`.

## Prepare

1. Confirm every runtime claim identifies a released Turnkey version or exact
   product commit.
2. When notebook sources changed, run `pnpm notebooks:sync` from the sibling
   workspace and review both notebook diffs and `provenance.json`.
3. Update `sources/product.json`, release-status documentation, and the
   changelog together when the documented product commit changes.
4. Run:

   ```bash
   pnpm verify
   ```

5. Run a tracked-tree secret scan and verify desktop/mobile rendering.

## Promote

1. Commit the verified site on `dev`.
2. Open a pull request from the reviewed development commit to `main` once the
   remote development branch and branch ruleset exist.
3. Require `Site checks / check`, Code Owner approval, and resolved discussion.
4. Merge without changing the verified content, then let `Deploy GitHub Pages`
   publish the resulting `main` commit.
5. Verify the workflow conclusion and HTTP 200 at the canonical site URL.

For an empty-repository bootstrap only, the owner may explicitly authorize
mirroring the verified `dev` commit to `main`. That exception does not become
the normal release path.

## Record

Record the site commit, product commit, test counts, secret-scan result,
workflow URL, deployment URL, and any repository-settings exception in the
local `turnkey-build` deployment report. Product package publication and site
publication are separate release gates.
