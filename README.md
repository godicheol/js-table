## Usage

```console
git clone https://github.com/godicheol/javascript-module-builder.git && cd javascript-module-builder && npm install && npm run unlink
```

```js
// package.json
...
"bundleDependencies": [
    // add installed library name
]
...
```

```console
npm pack
```

```console
npm install blah-blah.tgz
```

```js
import MyModule from 'javascript-module-builder';
const {sum} = MyModule;
sum(1, 2); // 3
```