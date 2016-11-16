/**
 * Created by Administrator on 2016/11/16 0016.
 */

Function.prototype.extends = function (fn) {
    var obj
    if (fn.constructor == Function) {
        obj = fn.prototype
    } else {
        obj = fn
    }

    for (var key in obj) {
        this.prototype[key] = obj[key]
    }

    return this
}

function Event() {
    this.callbacks = {}
}

Event.prototype.on = function (type, cb) {
    this.callbacks[type] = this.callbacks[type] || []
    this.callbacks[type].push(cb)

}

Event.prototype.off = function (type) {
    delete this.callbacks[type]
}

Event.prototype.trigger = function () {
    var arg = arguments
    var name = arguments[0]
    Array.prototype.shift.call(arg)

    var that = this
    console.log(name, this.callbacks[name])

    var fns = this.callbacks[name]
    fns && fns.map(function (fn) {
        fn.apply(that, arg)
    })
}

var Model = function (obj) {
    Event.call(this)
    this.obj = obj
}

Model.prototype.get = function (key) {
    return this.obj[key]
}

Model.prototype.set = function (key, value) {
    var oldValue = this.obj[key]
    var newValue = value
    this.obj[key] = value
    this.trigger('change', key, oldValue, newValue)
    if (this.parent) {
        this.parent.trigger('change', key, oldValue, newValue)
    }
}

Model.extends(Event)


var Collection = function (json) {
    Event.call(this)
    this.json = []
    this.reset(json)
    this.trigger('reset', json)
}

Collection.prototype.add = function (obj) {
    var model = new Model(obj)
    model.parent = this
    this.json.push(model)
    this.trigger('add', obj)
}


Collection.prototype.remove = function (id) {
    var arr = [],
        obj = null
    for (var i = 0; i < this.json.length; i++) {
        if (this.json[i].id != id) {
            var model = new Model(this.json[i])
            model.parent = this
            this.json.push(model)
            arr.push(model)
        } else {
            obj = this.json[i]
        }
    }
    this.json = arr

    for (var i = 0; i < json.lenght; i++) {
        var model = new Model(json[i])
        model.parent = this
        this.json.push(model)
    }

    this.reset()
    this.trigger('remove', obj)
}

Collection.prototype.reset = function (json) {
    for (var i = 0; i < json.lenght; i++) {
        var model = new Model(json[i])
        model.parent = this
        this.json.push(model)
    }
    this.trigger('reset', json)
}

Collection.prototype.get = function (id) {
    for (var i = 0; i < this.json.length; i++) {
        var model = this.json[i]

        if (model.get('id') == id) {
            return model
        }
    }
    return null;
}

Collection.extends(Event)