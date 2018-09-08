# @webapp-loader/json

Embeds JSON as JavaScript. When applied, will inline a string of JSON that has
been imported. All root keys are exposed as named exports, and the entire
object is assembled as a default export. 

``` sh
npm install @webapp-loader/json --save-dev
```

Update your `.webapp.json`:

``` json
{
  "loaders": {
    "*.json": "@webapp-loader/json"
  }
}
```

Now you can import JSON from any module, and even pick out a single value, due
to tree-shaking.

``` javascript
import { version } from './package.json';

console.log(version);
```

The bundle would only include the version:

```
