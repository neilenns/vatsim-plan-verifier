# Notes for developers

## Adding a new verifier

1. Create the class that does the verification in `server/src/controllers/verifiers`. All verifiers must accept an `IFlightPlan` parameter and return a `Promise<VerifierControllerResult>`.
2. All verifiers have to return a result. If the result is for information only (e.g. the verifier passed but the user doesn't really need to know that) use a `status` of `Information` and a priority of `5`.
3. Add the verifier to `verifiers` array in `src/routes/verify.mts`

Adding to the `verifiers` array will automatically create a route for the verifier and add it to the verifiers run by the `/verify/all` route. 