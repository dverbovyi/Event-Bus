/**
 * Created by Dmytro on 4/9/2016.
 */
((root, factory) =>{
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals
        root.EventDriver = factory();
    }
})(window, () =>{
    
    class EventDriver {
        constructor() {
            this.eventsMap = {};
        }

        once(eventName, handler, context) {
            return this.on(...arguments, true);
        }

        on(eventName, handler, context, once) {
            const listeners = this.eventsMap[eventName],
                isExistListener = !!listeners.find(listener => {
                    return listener.handler === handler && listener.caller === context;
                });

            if (isExistListener)
                return this;

            const listener = {
                handler: handler,
                caller: context
            };

            if(once && typeof once === 'boolean')
                listener.once = once;

            if (listeners)
                this.eventsMap[eventName].push(listener);
            else
                this.eventsMap[eventName] = [listener];

            return this;
        }

        off(eventName, handler, context) {
            const listeners = this.eventsMap[eventName];

            if (!listeners || !listeners.length)
                return this;

            if (listeners && !handler) {
                delete this.eventsMap[eventName];
                return this;
            }

            for (let i = 0, l = listeners.length; i < l; ++i) {
                let listener = listeners[i];

                if (listener.handler === handler && listener.caller === context) {
                    listeners.splice(i, 1);
                    break;
                }
            }

            return this;
        }

        trigger(eventName, data, context) {
            const listeners = this.eventsMap[eventName];
            if (!listeners || !listeners.length) {
                console.warn(`${this._toString()}::The event ${eventName} was triggered, but handler didn\'t fired.`);
                return this;
            }

            for(let i = 0, l = listeners.length; i < l; ++i) {
                let listener = listeners[i];
                if(listener.caller === context || !context){
                    listener.eventName = eventName;
                    this._dispatch(listener, data);
                }
                if(listeners[i].once)
                    listeners.splice(i, 1);
            }

            return this;
        }

        _dispatch(listener, data){
            listener.handler.call(listener.caller, listener, data);
        }

        _toString() {
            return [['EventDriver']]
        }

    }

    return EventDriver;
});