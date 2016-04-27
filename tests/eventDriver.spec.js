/**
 * Created by Dmytro on 4/10/2016.
 */
import EventDriver from '../src/eventDriver';

describe('Event-Driver', () => {
    let eventDriver = null;

    beforeEach(()=>{
        eventDriver = new EventDriver();
    });

    it('Should be possible to add event which fires only once',() =>{
        const callback = function() { return true };

        spyOn(eventDriver, 'on').and.callThrough();

        eventDriver.once('click', callback);

        expect(eventDriver.on).toHaveBeenCalledWith('click', callback, true);
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