(function() {

  function Delay(name){
    // {action, delay: ms, options:{}}
    this.name = name
    this.actions = []
    this.delay = 0
    this.stepOfActions = 0
    this.timers = []
  }

  Delay.prototype.then = function(action, options){
    this.actions.push({
      action: action,
      delay: this.delay,
      options: options||{}
    })
    return this
  }

  Delay.prototype.wait = function(delay){
    this.delay += delay
    return this
  }

  Delay.prototype.start = function(){
    this.stop()
    var that = this

    for(this.stepOfActions=0; this.stepOfActions<this.actions.length; this.stepOfActions++){
      (function(i, that){
        if(that.actions[i].action instanceof Delay){
          that.timers.push(setTimeout(function(){
            that.actions[i].action.start()
          }, that.actions[i].delay))
        } else {
          that.timers.push(setTimeout(that.actions[i].action, that.actions[i].delay))
        }
      })(this.stepOfActions, that)

    }
    return this
  }

  Delay.prototype.stop = function(time){
    for(var i=0; i<this.timers.length; i++){
      clearTimeout(this.timers[i])
    }
    this.timers = []
    return this
  }

  Delay.prototype.stopAll = function(time){
    this.stop()
    for(var i=0; i<this.actions.length; i++){
      if(this.actions[i].action instanceof Delay){
        this.actions[i].action.stopAll()
      }
    }

    return this
  }


  if (typeof module != 'undefined') {
    module.exports = Delay
  } else {
    window.BoneDelay = Delay
  }

})()
