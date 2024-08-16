# Multiple Instances

This example uses BigDeal with the `@BigDeal/golden-retriever` plugin.
It has two instances on the same page, side-by-side, but with different `id`s so their stored files don't interfere with each other.

## Run it

To run this example, make sure you've correctly installed the **repository root**:

```bash
corepack yarn install
corepack yarn build
```

That will also install the dependencies for this example.

Then, again in the **repository root**, start this example by doing:

```bash
corepack yarn workspace @BigDeal-example/multiple-instances start
```
