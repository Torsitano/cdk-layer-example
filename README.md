

## Build Layer

```shell
esbuild --bundle --platform=node --sourcemap ./src/layer-example.ts --outdir=dist/layer/nodejs/node_modules
cdk deploy
```

## Build Package

```shell
tsc
```