# Requirements

Project requirements for @chan.run/ensure — quality gates, testing, and library-specific constraints. Written using RFC 2119 keywords (MUST/SHOULD/MAY). See also [[capa]] for violation tracking.

## Quality Gate

Every commit MUST pass the full verification gate before being created. Gates run via `mise run check`. No code that fails checks may be committed — the gate is a pre-commit contract, not just a CI check. 

### Format
Source formatting MUST produce zero diff when re-run.
* Run project formatter — MUST succeed
* Checked by: `mise run format:check` (biome)

### Lint
Static analysis MUST report zero errors.
* Errors MUST be zero
* Warnings SHOULD be zero
* Checked by: `mise run lint` (biome)

### Typecheck
Type system MUST accept all source files.
* Checked by: `mise run typecheck` (tsc)

### Test
All test suites MUST pass.
* Checked by: `mise run test` (vitest)

### Build
Library build MUST succeed and produce valid ESM output.
* Checked by: `mise run build`

## Testing

Test expectations for the ensure library.

### Unit
Every public API function MUST have unit tests.
* `ensure()` — all forms (class, string, class+message)
* `defineError()` — custom error class creation and instanceof checks
* `fault()` — error throwing with cause chaining
* `trySync()` / `tryAsync()` — success and failure paths, type narrowing
* `declares()` / `combines()` — error surface annotation and composition
* `match()` — fault errors, native errors, fallback handling
* `toJSON()` / `fromJSON()` — serialization round-trip fidelity

### Edge Cases
Error handling edge cases MUST be covered.
* Null/undefined inputs to `ensure()` MUST throw
* Nested cause chains MUST serialize and deserialize correctly
* `match()` with no matching handler MUST use fallback

## Library

Constraints specific to publishing a TypeScript library.

### API Surface
The public API MUST be explicit and minimal.
* All exports come through `src/index.ts` barrel
* No internal types or helpers exposed
* Adding a public export is a deliberate decision

### Bundle Size
The library SHOULD remain lightweight.
* No runtime dependencies
* Tree-shakeable ESM output

### Backwards Compatibility
Breaking changes MUST follow semver.
* Public API changes require a major version bump
* Deprecations SHOULD have a migration path for at least one minor version
