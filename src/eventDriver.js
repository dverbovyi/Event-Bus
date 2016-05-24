/**
 * Created by Dmytro on 4/9/2016.
 */
export class EventDriver {
    constructor() {
        this.eventsMap = {};
    }

    /**
     *
     * @param eventName
     * @param handler
     * @param context
     * @returns {*}
     */
    once(eventName, handler, context) {
        return this.on(...arguments, true);
    }

    /**
     *
     * @param eventName
     * @param handler
     * @param context
     * @param once
     * @returns {EventDriver}
     */
    on(eventName, handler, context, once) {
        const listeners = this.eventsMap[eventName],
            isExistListener = !!listeners && listeners.find(listener => {
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

    /**
     *
     * @param eventName
     * @param handler
     * @param context
     * @returns {EventDriver}
     */
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

    /**
     *
     * @param eventName
     * @param data
     * @param context
     * @returns {EventDriver}
     */
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

    /**
     *
     * @param listener
     * @param data
     * @private
     */
    _dispatch(listener, data){
        listener.handler.call(listener.caller, listener, data);
    }

    /**
     *
     * @returns {String}
     * @private
     */
    _toString() {
        return this.constructor.name;
    }

}

