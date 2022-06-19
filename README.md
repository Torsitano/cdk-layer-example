

## Build Layer

Use esbuild to compile the JavaScript files for the Layer, deploy the Layer with CDK

```shell
esbuild --bundle --platform=node --sourcemap ./src/layer-example.ts --outdir=dist/layer/nodejs/node_modules
cdk deploy
```

## Build Package

Use `tsc` to create the files for the package when using `npm install`

```shell
tsc
```

Install the package using:

```shell
npm i git+ssh://git@github.com:Torsitano/cdk-layer-example
```