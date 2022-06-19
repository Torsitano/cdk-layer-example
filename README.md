This repo is for my [Creating Lambda Layers with TypeScript and CDK - The Right Way](https://www.shawntorsitano.com/2022/06/19/creating-lambda-layers-with-typescript-and-cdk-the-right-way/) post. Refer to that post for information on the code in this repo.

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