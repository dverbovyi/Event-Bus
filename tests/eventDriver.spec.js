/**
 * Created by Dmytro on 4/10/2016.
 */
import EventDriver from '../src/eventDriver';

describe('Event-Driver', () => {
    let eventDriver = null;

    beforeEach(()=>{
        eventDriver = new EventDriver();
    });

    it('#once: Should be possible to add event which fires only once',() =>{
        const callback = function() { return true };

        const onSpy = spyOn(eventDriver, 'on').and.callThrough();

        eventDriver.once('click', callback);

        expect(onSpy).toHaveBeenCalledWith('click', callback, true);

        const listener = eventDriver.eventsMap['click'][0];

        const handlerSpy = spyOn(listener, 'handler');

        eventDriver.trigger('click');

        expect(listener.handler.calls.count()).toEqual(1);
    });

    xdescribe('#once', function() {
        beforeEach(() => {
        });

        it('Should add listener', function() {
            var callback = function() { return true };

            eventDriver.on('test', callback);

            expect(eventDriver.eventsMap['test'][0].handler).toBe(callback);

        });
    });

    xdescribe('#trigger', function() {
        beforeEach(() => {
            eventDriver = new EventDriver();
        });

        it('Should dispatch', function() {
            eventDriver.on('test', function(){});

            spyOn(eventDriver, '_dispatch').and.callThrough();

            eventDriver.trigger('test');
            
            expect(eventDriver._dispatch).toHaveBeenCalled();
        })
    })
});