(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.EventDriver = f().default}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Dmytro on 4/9/2016.
 */

var EventDriver = exports.EventDriver = function () {
    function EventDriver() {
        _classCallCheck(this, EventDriver);

        this.eventsMap = {};
    }

    /**
     *
     * @param eventName
     * @param handler
     * @param context
     * @returns {*}
     */


    _createClass(EventDriver, [{
        key: 'once',
        value: function once(eventName, handler, context) {
            return this.on.apply(this, Array.prototype.slice.call(arguments).concat([true]));
        }

        /**
         *
         * @param eventName
         * @param handler
         * @param context
         * @param once
         * @returns {EventDriver}
         */

    }, {
        key: 'on',
        value: function on(eventName, handler, context, once) {
            var listeners = this.eventsMap[eventName],
                isExistListener = !!listeners && listeners.find(function (listener) {
                return listener.handler === handler && listener.caller === context;
            });

            if (isExistListener) return this;

            var listener = {
                handler: handler,
                caller: context
            };

            if (once && typeof once === 'boolean') listener.once = once;

            if (listeners) this.eventsMap[eventName].push(listener);else this.eventsMap[eventName] = [listener];

            return this;
        }

        /**
         *
         * @param eventName
         * @param handler
         * @param context
         * @returns {EventDriver}
         */

    }, {
        key: 'off',
        value: function off(eventName, handler, context) {
            var listeners = this.eventsMap[eventName];

            if (!listeners || !listeners.length) return this;

            if (listeners && !handler) {
                delete this.eventsMap[eventName];
                return this;
            }

            for (var i = 0, l = listeners.length; i < l; ++i) {
                var listener = listeners[i];

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

    }, {
        key: 'trigger',
        value: function trigger(eventName, data, context) {
            var listeners = this.eventsMap[eventName];
            if (!listeners || !listeners.length) {
                console.warn(this._toString() + '::The event ' + eventName + ' was triggered, but handler didn\'t fired.');
                return this;
            }

            for (var i = 0, l = listeners.length; i < l; ++i) {
                var listener = listeners[i];
                if (listener.caller === context || !context) {
                    listener.eventName = eventName;
                    this._dispatch(listener, data);
                }
                if (listeners[i].once) listeners.splice(i, 1);
            }

            return this;
        }

        /**
         *
         * @param listener
         * @param data
         * @private
         */

    }, {
        key: '_dispatch',
        value: function _dispatch(listener, data) {
            listener.handler.call(listener.caller, listener, data);
        }

        /**
         *
         * @returns {String}
         * @private
         */

    }, {
        key: '_toString',
        value: function _toString() {
            return this.constructor.name;
        }
    }]);

    return EventDriver;
}();

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGV2ZW50RHJpdmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7SUNHYSxXLFdBQUEsVztBQUNULDJCQUFjO0FBQUE7O0FBQ1YsYUFBSyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0g7Ozs7Ozs7Ozs7Ozs7NkJBU0ksUyxFQUFXLE8sRUFBUyxPLEVBQVM7QUFDOUIsbUJBQU8sS0FBSyxFQUFMLHdDQUFXLFNBQVgsVUFBc0IsSUFBdEIsR0FBUDtBQUNIOzs7Ozs7Ozs7Ozs7OzJCQVVFLFMsRUFBVyxPLEVBQVMsTyxFQUFTLEksRUFBTTtBQUNsQyxnQkFBTSxZQUFZLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBbEI7Z0JBQ0ksa0JBQWtCLENBQUMsQ0FBQyxTQUFGLElBQWUsVUFBVSxJQUFWLENBQWUsb0JBQVk7QUFDeEQsdUJBQU8sU0FBUyxPQUFULEtBQXFCLE9BQXJCLElBQWdDLFNBQVMsTUFBVCxLQUFvQixPQUEzRDtBQUNILGFBRmdDLENBRHJDOztBQUtBLGdCQUFJLGVBQUosRUFDSSxPQUFPLElBQVA7O0FBRUosZ0JBQU0sV0FBVztBQUNiLHlCQUFTLE9BREk7QUFFYix3QkFBUTtBQUZLLGFBQWpCOztBQUtBLGdCQUFHLFFBQVEsT0FBTyxJQUFQLEtBQWdCLFNBQTNCLEVBQ0ksU0FBUyxJQUFULEdBQWdCLElBQWhCOztBQUVKLGdCQUFJLFNBQUosRUFDSSxLQUFLLFNBQUwsQ0FBZSxTQUFmLEVBQTBCLElBQTFCLENBQStCLFFBQS9CLEVBREosS0FHSSxLQUFLLFNBQUwsQ0FBZSxTQUFmLElBQTRCLENBQUMsUUFBRCxDQUE1Qjs7QUFFSixtQkFBTyxJQUFQO0FBQ0g7Ozs7Ozs7Ozs7Ozs0QkFTRyxTLEVBQVcsTyxFQUFTLE8sRUFBUztBQUM3QixnQkFBTSxZQUFZLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBbEI7O0FBRUEsZ0JBQUksQ0FBQyxTQUFELElBQWMsQ0FBQyxVQUFVLE1BQTdCLEVBQ0ksT0FBTyxJQUFQOztBQUVKLGdCQUFJLGFBQWEsQ0FBQyxPQUFsQixFQUEyQjtBQUN2Qix1QkFBTyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQVA7QUFDQSx1QkFBTyxJQUFQO0FBQ0g7O0FBRUQsaUJBQUssSUFBSSxJQUFJLENBQVIsRUFBVyxJQUFJLFVBQVUsTUFBOUIsRUFBc0MsSUFBSSxDQUExQyxFQUE2QyxFQUFFLENBQS9DLEVBQWtEO0FBQzlDLG9CQUFJLFdBQVcsVUFBVSxDQUFWLENBQWY7O0FBRUEsb0JBQUksU0FBUyxPQUFULEtBQXFCLE9BQXJCLElBQWdDLFNBQVMsTUFBVCxLQUFvQixPQUF4RCxFQUFpRTtBQUM3RCw4QkFBVSxNQUFWLENBQWlCLENBQWpCLEVBQW9CLENBQXBCO0FBQ0E7QUFDSDtBQUNKOztBQUVELG1CQUFPLElBQVA7QUFDSDs7Ozs7Ozs7Ozs7O2dDQVNPLFMsRUFBVyxJLEVBQU0sTyxFQUFTO0FBQzlCLGdCQUFNLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFsQjtBQUNBLGdCQUFJLENBQUMsU0FBRCxJQUFjLENBQUMsVUFBVSxNQUE3QixFQUFxQztBQUNqQyx3QkFBUSxJQUFSLENBQWdCLEtBQUssU0FBTCxFQUFoQixvQkFBK0MsU0FBL0M7QUFDQSx1QkFBTyxJQUFQO0FBQ0g7O0FBRUQsaUJBQUksSUFBSSxJQUFJLENBQVIsRUFBVyxJQUFJLFVBQVUsTUFBN0IsRUFBcUMsSUFBSSxDQUF6QyxFQUE0QyxFQUFFLENBQTlDLEVBQWlEO0FBQzdDLG9CQUFJLFdBQVcsVUFBVSxDQUFWLENBQWY7QUFDQSxvQkFBRyxTQUFTLE1BQVQsS0FBb0IsT0FBcEIsSUFBK0IsQ0FBQyxPQUFuQyxFQUEyQztBQUN2Qyw2QkFBUyxTQUFULEdBQXFCLFNBQXJCO0FBQ0EseUJBQUssU0FBTCxDQUFlLFFBQWYsRUFBeUIsSUFBekI7QUFDSDtBQUNELG9CQUFHLFVBQVUsQ0FBVixFQUFhLElBQWhCLEVBQ0ksVUFBVSxNQUFWLENBQWlCLENBQWpCLEVBQW9CLENBQXBCO0FBQ1A7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOzs7Ozs7Ozs7OztrQ0FRUyxRLEVBQVUsSSxFQUFLO0FBQ3JCLHFCQUFTLE9BQVQsQ0FBaUIsSUFBakIsQ0FBc0IsU0FBUyxNQUEvQixFQUF1QyxRQUF2QyxFQUFpRCxJQUFqRDtBQUNIOzs7Ozs7Ozs7O29DQU9XO0FBQ1IsbUJBQU8sS0FBSyxXQUFMLENBQWlCLElBQXhCO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRG15dHJvIG9uIDQvOS8yMDE2LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEV2ZW50RHJpdmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzTWFwID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZVxyXG4gICAgICogQHBhcmFtIGhhbmRsZXJcclxuICAgICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgb25jZShldmVudE5hbWUsIGhhbmRsZXIsIGNvbnRleHQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vbiguLi5hcmd1bWVudHMsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudE5hbWVcclxuICAgICAqIEBwYXJhbSBoYW5kbGVyXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAgICogQHBhcmFtIG9uY2VcclxuICAgICAqIEByZXR1cm5zIHtFdmVudERyaXZlcn1cclxuICAgICAqL1xyXG4gICAgb24oZXZlbnROYW1lLCBoYW5kbGVyLCBjb250ZXh0LCBvbmNlKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXSxcclxuICAgICAgICAgICAgaXNFeGlzdExpc3RlbmVyID0gISFsaXN0ZW5lcnMgJiYgbGlzdGVuZXJzLmZpbmQobGlzdGVuZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmhhbmRsZXIgPT09IGhhbmRsZXIgJiYgbGlzdGVuZXIuY2FsbGVyID09PSBjb250ZXh0O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGlzRXhpc3RMaXN0ZW5lcilcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0ge1xyXG4gICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyLFxyXG4gICAgICAgICAgICBjYWxsZXI6IGNvbnRleHRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZihvbmNlICYmIHR5cGVvZiBvbmNlID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgIGxpc3RlbmVyLm9uY2UgPSBvbmNlO1xyXG5cclxuICAgICAgICBpZiAobGlzdGVuZXJzKVxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXSA9IFtsaXN0ZW5lcl07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudE5hbWVcclxuICAgICAqIEBwYXJhbSBoYW5kbGVyXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAgICogQHJldHVybnMge0V2ZW50RHJpdmVyfVxyXG4gICAgICovXHJcbiAgICBvZmYoZXZlbnROYW1lLCBoYW5kbGVyLCBjb250ZXh0KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICBpZiAobGlzdGVuZXJzICYmICFoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXIuaGFuZGxlciA9PT0gaGFuZGxlciAmJiBsaXN0ZW5lci5jYWxsZXIgPT09IGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZVxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICAgKiBAcmV0dXJucyB7RXZlbnREcml2ZXJ9XHJcbiAgICAgKi9cclxuICAgIHRyaWdnZXIoZXZlbnROYW1lLCBkYXRhLCBjb250ZXh0KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXTtcclxuICAgICAgICBpZiAoIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7dGhpcy5fdG9TdHJpbmcoKX06OlRoZSBldmVudCAke2V2ZW50TmFtZX0gd2FzIHRyaWdnZXJlZCwgYnV0IGhhbmRsZXIgZGlkblxcJ3QgZmlyZWQuYCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMCwgbCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xyXG4gICAgICAgICAgICBpZihsaXN0ZW5lci5jYWxsZXIgPT09IGNvbnRleHQgfHwgIWNvbnRleHQpe1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuZXZlbnROYW1lID0gZXZlbnROYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2gobGlzdGVuZXIsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGxpc3RlbmVyc1tpXS5vbmNlKVxyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9kaXNwYXRjaChsaXN0ZW5lciwgZGF0YSl7XHJcbiAgICAgICAgbGlzdGVuZXIuaGFuZGxlci5jYWxsKGxpc3RlbmVyLmNhbGxlciwgbGlzdGVuZXIsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IubmFtZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==
