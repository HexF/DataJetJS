# DataJetJS

A Bloons TD data.jet file jet unpacking and patching library

## Installing

```sh
npm install datajet
```

Make sure you have a 7-Zip executable on your system, Check [Here](https://www.npmjs.com/package/node-7z#installation) for futher installation instructions

## Examples

Simple examples to help you use DataJetJS

### Unpacking & Patching

```js
const jet = require('datajet')    //Import the module
var myjet = file.load("data.jet") //Implement your own code to get an object containing the entire jet

var mypatches = [   //Our patches we want to apply
    [{"file" : "Weapon.Ninja", patch:{}}],
    [{"file" : "Weapon.DartlingGun", patch:{}}],
    ];

var myjetpatch = jet.patcher.assemblePatch(mypatches);  //Assemble our patches

var mypatchedjet =
    jet.packer
    .unpack(myjet, jet.version.steam["6.4.0"])  //Unpack our jet
    .patch(assemblePatch)                       //Apply our assembled patch
    .pack();                                    //Repack our jet

file.save(mypatchedjet);    //Implement your own code to save the jet
```


