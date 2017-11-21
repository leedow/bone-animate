# Bone-delay

## Install

```shell
npm install bone-delay --save
```

## Quik start
```javascript
<script type="text/javascript" src="./bonedelay.min.js"></script>
```
or
```javascript
import boneDelay from 'bone-delay'
```

## Example
```javascript
var father = new BoneDelay()
var child1 = new BoneDelay()
var child2 = new BoneDelay()

child1
.wait(1000) // wait 1000ms
.then(function(){
  // do something
})
.wait(1000)
.then(function(){
  // do something
})

child2.wait(1000)
.then(function(){
  // do something
})

father
.then(child1) // run  child1 process
.wait(2000)
.then(child2) // run  child2 process
.start()

father.stop() // stop father process
father.stopAll() // stop all process including father and child
```
