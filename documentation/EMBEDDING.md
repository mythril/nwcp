# Nuclear Wasteland Character Planner

## Embedding

### Via Share Menu

<!--
TODO: update when share menu is ready
-->

### Via Custom element

```html
<script
  type="text/javascript"
  src="https://nwcp.vercel.app/c.js"
></script>
<nw-cp char="#EMBED_CODE#"></nw-cp>
```

Where `#EMBED_CODE#` is the encoded data after the hash-mark in your character's URL.

### Via XenForo custom bbcode

Following the [XenForo custom bbcode guide](https://xenforo.com/docs/xf2/bbcode/#custom-bb-codes)

1. Set the **BB code tag** to `NWCP`
1. Set the **Title** to `Nuclear Wasteland Character Planner Embed`
1. Use **simple replacement** when asked for the **replacement mode**
1. Set HTML replacement to:

```html
<script
  type="text/javascript"
  src="https://nwcp.vercel.app/c.js"
></script>
<nw-cp char="{option}"></nw-cp>
```

5. **Optional**: set icon to [radiation](https://fontawesome.com/icons/radiation?f=classic&s=solid)
5. Characters can now be embedded in your forum posts with the **BBCode** option from the share menu.
