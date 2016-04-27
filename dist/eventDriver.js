(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Dmytro on 4/9/2016.
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals
        root.EventDriver = factory();
    }
})(window, function () {
    var EventDriver = function () {
        function EventDriver() {
            _classCallCheck(this, EventDriver);

            this.eventsMap = {};
        }

        _createClass(EventDriver, [{
            key: 'once',
            value: function once(eventName, handler, context) {
                return this.on.apply(this, Array.prototype.slice.call(arguments).concat([true]));
            }
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
        }, {
            key: '_dispatch',
            value: function _dispatch(listener, data) {
                listener.handler.call(listener.caller, listener, data);
            }
        }, {
            key: '_toString',
            value: function _toString() {
                return [['EventDriver']];
            }
        }]);

        return EventDriver;
    }();

    return EventDriver;
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGV2ZW50RHJpdmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUNHQSxDQUFDLFVBQUMsSUFBRCxFQUFPLE9BQVAsRUFBa0I7QUFDZixRQUFJLE9BQU8sTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPLEdBQTNDLEVBQWdEOztBQUU1QyxlQUFPLEVBQVAsRUFBVyxPQUFYO0FBQ0gsS0FIRCxNQUdPLElBQUksUUFBTyxPQUFQLHlDQUFPLE9BQVAsT0FBbUIsUUFBdkIsRUFBaUM7O0FBRXBDLGVBQU8sT0FBUCxHQUFpQixTQUFqQjtBQUNILEtBSE0sTUFHQTs7QUFFSCxhQUFLLFdBQUwsR0FBbUIsU0FBbkI7QUFDSDtBQUNKLENBWEQsRUFXRyxNQVhILEVBV1csWUFBSztBQUFBLFFBQ04sV0FETTtBQUVSLCtCQUFjO0FBQUE7O0FBQ1YsaUJBQUssU0FBTCxHQUFpQixFQUFqQjtBQUNIOztBQUpPO0FBQUE7QUFBQSxpQ0FNSCxTQU5HLEVBTVEsT0FOUixFQU1pQixPQU5qQixFQU0wQjtBQUM5Qix1QkFBTyxLQUFLLEVBQUwsd0NBQVcsU0FBWCxVQUFzQixJQUF0QixHQUFQO0FBQ0g7QUFSTztBQUFBO0FBQUEsK0JBVUwsU0FWSyxFQVVNLE9BVk4sRUFVZSxPQVZmLEVBVXdCLElBVnhCLEVBVThCO0FBQ2xDLG9CQUFNLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFsQjtvQkFDSSxrQkFBa0IsQ0FBQyxDQUFDLFNBQUYsSUFBZSxVQUFVLElBQVYsQ0FBZSxvQkFBWTtBQUN4RCwyQkFBTyxTQUFTLE9BQVQsS0FBcUIsT0FBckIsSUFBZ0MsU0FBUyxNQUFULEtBQW9CLE9BQTNEO0FBQ0gsaUJBRmdDLENBRHJDOztBQUtBLG9CQUFJLGVBQUosRUFDSSxPQUFPLElBQVA7O0FBRUosb0JBQU0sV0FBVztBQUNiLDZCQUFTLE9BREk7QUFFYiw0QkFBUTtBQUZLLGlCQUFqQjs7QUFLQSxvQkFBRyxRQUFRLE9BQU8sSUFBUCxLQUFnQixTQUEzQixFQUNJLFNBQVMsSUFBVCxHQUFnQixJQUFoQjs7QUFFSixvQkFBSSxTQUFKLEVBQ0ksS0FBSyxTQUFMLENBQWUsU0FBZixFQUEwQixJQUExQixDQUErQixRQUEvQixFQURKLEtBR0ksS0FBSyxTQUFMLENBQWUsU0FBZixJQUE0QixDQUFDLFFBQUQsQ0FBNUI7O0FBRUosdUJBQU8sSUFBUDtBQUNIO0FBakNPO0FBQUE7QUFBQSxnQ0FtQ0osU0FuQ0ksRUFtQ08sT0FuQ1AsRUFtQ2dCLE9BbkNoQixFQW1DeUI7QUFDN0Isb0JBQU0sWUFBWSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQWxCOztBQUVBLG9CQUFJLENBQUMsU0FBRCxJQUFjLENBQUMsVUFBVSxNQUE3QixFQUNJLE9BQU8sSUFBUDs7QUFFSixvQkFBSSxhQUFhLENBQUMsT0FBbEIsRUFBMkI7QUFDdkIsMkJBQU8sS0FBSyxTQUFMLENBQWUsU0FBZixDQUFQO0FBQ0EsMkJBQU8sSUFBUDtBQUNIOztBQUVELHFCQUFLLElBQUksSUFBSSxDQUFSLEVBQVcsSUFBSSxVQUFVLE1BQTlCLEVBQXNDLElBQUksQ0FBMUMsRUFBNkMsRUFBRSxDQUEvQyxFQUFrRDtBQUM5Qyx3QkFBSSxXQUFXLFVBQVUsQ0FBVixDQUFmOztBQUVBLHdCQUFJLFNBQVMsT0FBVCxLQUFxQixPQUFyQixJQUFnQyxTQUFTLE1BQVQsS0FBb0IsT0FBeEQsRUFBaUU7QUFDN0Qsa0NBQVUsTUFBVixDQUFpQixDQUFqQixFQUFvQixDQUFwQjtBQUNBO0FBQ0g7QUFDSjs7QUFFRCx1QkFBTyxJQUFQO0FBQ0g7QUF4RE87QUFBQTtBQUFBLG9DQTBEQSxTQTFEQSxFQTBEVyxJQTFEWCxFQTBEaUIsT0ExRGpCLEVBMEQwQjtBQUM5QixvQkFBTSxZQUFZLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBbEI7QUFDQSxvQkFBSSxDQUFDLFNBQUQsSUFBYyxDQUFDLFVBQVUsTUFBN0IsRUFBcUM7QUFDakMsNEJBQVEsSUFBUixDQUFnQixLQUFLLFNBQUwsRUFBaEIsb0JBQStDLFNBQS9DO0FBQ0EsMkJBQU8sSUFBUDtBQUNIOztBQUVELHFCQUFJLElBQUksSUFBSSxDQUFSLEVBQVcsSUFBSSxVQUFVLE1BQTdCLEVBQXFDLElBQUksQ0FBekMsRUFBNEMsRUFBRSxDQUE5QyxFQUFpRDtBQUM3Qyx3QkFBSSxXQUFXLFVBQVUsQ0FBVixDQUFmO0FBQ0Esd0JBQUcsU0FBUyxNQUFULEtBQW9CLE9BQXBCLElBQStCLENBQUMsT0FBbkMsRUFBMkM7QUFDdkMsaUNBQVMsU0FBVCxHQUFxQixTQUFyQjtBQUNBLDZCQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQXlCLElBQXpCO0FBQ0g7QUFDRCx3QkFBRyxVQUFVLENBQVYsRUFBYSxJQUFoQixFQUNJLFVBQVUsTUFBVixDQUFpQixDQUFqQixFQUFvQixDQUFwQjtBQUNQOztBQUVELHVCQUFPLElBQVA7QUFDSDtBQTVFTztBQUFBO0FBQUEsc0NBOEVFLFFBOUVGLEVBOEVZLElBOUVaLEVBOEVpQjtBQUNyQix5QkFBUyxPQUFULENBQWlCLElBQWpCLENBQXNCLFNBQVMsTUFBL0IsRUFBdUMsUUFBdkMsRUFBaUQsSUFBakQ7QUFDSDtBQWhGTztBQUFBO0FBQUEsd0NBa0ZJO0FBQ1IsdUJBQU8sQ0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFQO0FBQ0g7QUFwRk87O0FBQUE7QUFBQTs7QUF3RlosV0FBTyxXQUFQO0FBQ0gsQ0FwR0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRG15dHJvIG9uIDQvOS8yMDE2LlxyXG4gKi9cclxuKChyb290LCBmYWN0b3J5KSA9PntcclxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuICAgICAgICAvLyBBTURcclxuICAgICAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAvLyBOb2RlLCBDb21tb25KUy1saWtlXHJcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xyXG4gICAgICAgIHJvb3QuRXZlbnREcml2ZXIgPSBmYWN0b3J5KCk7XHJcbiAgICB9XHJcbn0pKHdpbmRvdywgKCkgPT57XHJcbiAgICBjbGFzcyBFdmVudERyaXZlciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzTWFwID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbmNlKGV2ZW50TmFtZSwgaGFuZGxlciwgY29udGV4dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vbiguLi5hcmd1bWVudHMsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb24oZXZlbnROYW1lLCBoYW5kbGVyLCBjb250ZXh0LCBvbmNlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuZXZlbnRzTWFwW2V2ZW50TmFtZV0sXHJcbiAgICAgICAgICAgICAgICBpc0V4aXN0TGlzdGVuZXIgPSAhIWxpc3RlbmVycyAmJiBsaXN0ZW5lcnMuZmluZChsaXN0ZW5lciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmhhbmRsZXIgPT09IGhhbmRsZXIgJiYgbGlzdGVuZXIuY2FsbGVyID09PSBjb250ZXh0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNFeGlzdExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lciA9IHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGhhbmRsZXIsXHJcbiAgICAgICAgICAgICAgICBjYWxsZXI6IGNvbnRleHRcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmKG9uY2UgJiYgdHlwZW9mIG9uY2UgPT09ICdib29sZWFuJylcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLm9uY2UgPSBvbmNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVycylcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzTWFwW2V2ZW50TmFtZV0ucHVzaChsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzTWFwW2V2ZW50TmFtZV0gPSBbbGlzdGVuZXJdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvZmYoZXZlbnROYW1lLCBoYW5kbGVyLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuZXZlbnRzTWFwW2V2ZW50TmFtZV07XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVycyAmJiAhaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZXZlbnRzTWFwW2V2ZW50TmFtZV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyLmhhbmRsZXIgPT09IGhhbmRsZXIgJiYgbGlzdGVuZXIuY2FsbGVyID09PSBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cmlnZ2VyKGV2ZW50TmFtZSwgZGF0YSwgY29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdO1xyXG4gICAgICAgICAgICBpZiAoIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke3RoaXMuX3RvU3RyaW5nKCl9OjpUaGUgZXZlbnQgJHtldmVudE5hbWV9IHdhcyB0cmlnZ2VyZWQsIGJ1dCBoYW5kbGVyIGRpZG5cXCd0IGZpcmVkLmApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XHJcbiAgICAgICAgICAgICAgICBpZihsaXN0ZW5lci5jYWxsZXIgPT09IGNvbnRleHQgfHwgIWNvbnRleHQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNwYXRjaChsaXN0ZW5lciwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihsaXN0ZW5lcnNbaV0ub25jZSlcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9kaXNwYXRjaChsaXN0ZW5lciwgZGF0YSl7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyLmhhbmRsZXIuY2FsbChsaXN0ZW5lci5jYWxsZXIsIGxpc3RlbmVyLCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF90b1N0cmluZygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtbJ0V2ZW50RHJpdmVyJ11dXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gRXZlbnREcml2ZXI7XHJcbn0pOyJdfQ==
