# Imgproxy Macro

Allows signing urls from a babel macro. 

## Installation 

Make sure `babel-plugin-macros` is enabled in the babel configuration. 
Then install the macro using: 

```
npm i -D @tkvw/imgproxy.macro
```

## Usage 

```
import sign from "@tkvw/imgproxy.macro" 

const url = sign({
    host: "", // Your imgproxy host
    key: "", // Key to sign the url 
    salt: "", // Salt to sign the url
    url: "" // URL to the image
})
```
