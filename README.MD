# DataJetJS

A Bloons TD data.jet file jet unpacking and patching library

## Installing

```sh
npm install datajet
```

## Examples

Simple examples to help you use DataJetJS

### Unpacking & Patching

**Note**: the patches in here are not real patches, they will not work, they do not do anything. Download some real patches from the download repo.

```js
const jet = require('datajet')    //Import the module

var mypatches = [   //Our patches we want to apply
    {"file" : "Weapon.Ninja", patch:{...}},
    {"file" : "Weapon.DartlingGun", patch:{...}},
    ];

var mypatchedjet =
    jet.packer
    .unpack('data.jet', jet.version.steam["6.4.0"])  //Unpack our jet
    .patch(mypatches)                                  //Apply our patch
    .pack();                                         //Repack our jet, overwriting our other jet

```
