
# Reproducer to isolate errors with PDF.js using Webpack and Polyfills

## Problem description

The problem is two-fold:

1. Loading PDF.js failes with an exception

   > Object doesn't support property or method "next"

2. After PDF.js has been loaded calls to `Object.fromEntries()` will fail

   Whereas it did not fail before.


## Requirements / dependencies

- PDF.js 2.5 ES5 distribution
- Webpack
- Regenerator 0.14.7
- Polyfill for `Object.fromEntries`

## Workaround

Remove the `Object.fromEntries` from the polyfills.

```diff
diff --git a/webpack.config.js b/webpack.config.js
index bff2bfc..f5ebf8e 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -42,9 +42,6 @@ module.exports = {
   plugins: [
     new PolyfillInjectorPlugin({
       polyfills: [
-          // Remove this an PDF.js works:
-          "Object.fromEntries",
-
           // One unrelated dependency so that this array is not empty (when editng)
           "URL",
       ],
```


## Analysis

_To be made._


## Copyright notice

Some code was copied from [Mozilla's PDF.js examples][mod-pdfjs-example] and modified.

[mod-pdfjs-example]: https://github.com/mozilla/pdf.js/tree/master/examples
