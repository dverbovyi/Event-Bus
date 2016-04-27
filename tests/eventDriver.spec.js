/**
 * Created by Dmytro on 4/10/2016.
 */
import EventDriver from '../src/eventDriver';

describe('Event-Driver', () => {
    let eventDriver = null;

    beforeEach(() => {
        eventDriver = new EventDriver();
    });

    describe('#once', function() {
        beforeEach(() => {
            eventDriver = new EventDriver();
        });

        it('Should add listener', function() {
            var callback = function() { return true };

            eventDriver.on('test', callback);

            expect(eventDriver.eventsMap['test'][0].handler).toBe(callback);

        });
    });

    describe('#trigger', function() {
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