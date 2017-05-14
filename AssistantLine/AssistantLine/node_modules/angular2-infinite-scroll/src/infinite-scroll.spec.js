"use strict";
var infinite_scroll_1 = require('./infinite-scroll');
var core_1 = require('@angular/core');
describe('Infinite Scroll Directive', function () {
    // const zone = new NgZone({ enableLongStackTrace: false });
    var isScrollingDown = true;
    var zoneSpy, scrollResolverSpy, scrollRegisterSpy, positionResolverSpy;
    var positionFactoryMock = {
        create: function () { return positionResolverSpy; }
    };
    var createMockElement = function () {
        var mockedElement = new core_1.ElementRef(document.createElement('div'));
        return mockedElement;
    };
    var createInfiniteScroll = function (mockedElement) {
        mockedElement = mockedElement || createMockElement();
        return new infinite_scroll_1.InfiniteScroll(mockedElement, zoneSpy, positionFactoryMock, scrollRegisterSpy, scrollResolverSpy);
    };
    beforeEach(function () {
        zoneSpy = jasmine.createSpyObj('zone', ['run']);
        scrollResolverSpy = {
            getScrollStats: function () {
                return { shouldScroll: true, isScrollingDown: isScrollingDown };
            }
        };
        scrollRegisterSpy = jasmine.createSpyObj('register', ['attachEvent']);
        positionResolverSpy = jasmine.createSpyObj('pos', ['create', 'container']);
    });
    it('should create an instance of the directive', function () {
        var actual = createInfiniteScroll();
        expect(actual).toBeDefined();
    });
    it('should have default @Input properties values', function () {
        var directive = createInfiniteScroll();
        var expectedInputs = {
            _distanceDown: 2,
            _distanceUp: 1.5,
            _throttle: 300,
            scrollWindow: true,
            _immediate: false,
            _horizontal: false,
            _alwaysCallback: false,
            _disabled: false,
            _container: null
        };
        Object.keys(expectedInputs).forEach(function (input) {
            return expect(directive[input]).toEqual(expectedInputs[input]);
        });
    });
    it('should trigger the onScrollDown event when scroll has passed _distancedDown', function () {
        var directive = createInfiniteScroll();
        var container = {
            height: 0,
            scrolledUntilNow: 0,
            totalToScroll: 0,
        };
        spyOn(directive, 'onScrollDown');
        directive.ngOnInit();
        directive.handleOnScroll(container);
        var actual = directive.onScrollDown;
        expect(actual).toHaveBeenCalled();
    });
    it('should trigger the onScrollUp event when scroll has passed _distanceUp', function () {
        var directive = createInfiniteScroll();
        var container = {
            height: 0,
            scrolledUntilNow: 0,
            totalToScroll: 0,
        };
        spyOn(directive, 'onScrollUp');
        directive.ngOnInit();
        isScrollingDown = false;
        directive.handleOnScroll(container);
        var actual = directive.onScrollUp;
        expect(actual).toHaveBeenCalled();
    });
    it('should disable the scroller', function () {
        var directive = createInfiniteScroll();
        var container = {
            height: 0,
            scrolledUntilNow: 0,
            totalToScroll: 0,
        };
        spyOn(directive, 'onScrollDown');
        directive.ngOnInit();
        directive._disabled = true;
        directive.handleOnScroll(container);
        var actual = directive.onScrollDown;
        expect(actual).not.toHaveBeenCalled();
    });
    describe('resolving container', function () {
        var directive;
        var mockedElement;
        var container = {
            height: 0,
            scrolledUntilNow: 0,
            totalToScroll: 0,
        };
        beforeEach(function () {
            mockedElement = createMockElement();
            directive = createInfiniteScroll(mockedElement);
            spyOn(positionFactoryMock, 'create').and.callThrough();
        });
        describe('when container input is defined', function () {
            describe('when css selector is used', function () {
                beforeEach(function () {
                    spyOn(document, 'querySelector').and.returnValue(container);
                    directive._container = '.test';
                    directive.ngOnInit();
                });
                it('should find element in DOM', function () {
                    expect(document.querySelector).toHaveBeenCalledWith('.test');
                });
                it('should return container', function () {
                    expect(positionFactoryMock.create)
                        .toHaveBeenCalledWith(jasmine.objectContaining({ windowElement: container }));
                });
            });
            describe('when container is passed directly', function () {
                beforeEach(function () {
                    directive._container = container;
                    directive.ngOnInit();
                });
                it('should return container', function () {
                    expect(positionFactoryMock.create)
                        .toHaveBeenCalledWith(jasmine.objectContaining({ windowElement: container }));
                });
            });
        });
        describe('when container input is not defined', function () {
            describe('when scrollWindow is true', function () {
                beforeEach(function () {
                    directive.scrollWindow = true;
                    directive.ngOnInit();
                });
                it('should return window', function () {
                    expect(positionFactoryMock.create)
                        .toHaveBeenCalledWith(jasmine.objectContaining({ windowElement: window }));
                });
            });
            describe('when scrollWindow is false', function () {
                beforeEach(function () {
                    directive.scrollWindow = false;
                    directive.ngOnInit();
                });
                it('should return current element', function () {
                    expect(positionFactoryMock.create)
                        .toHaveBeenCalledWith(jasmine.objectContaining({ windowElement: mockedElement }));
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtc2Nyb2xsLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZpbml0ZS1zY3JvbGwuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsZ0NBQStCLG1CQUFtQixDQUFDLENBQUE7QUFNbkQscUJBQWdFLGVBQWUsQ0FBQyxDQUFBO0FBRWhGLFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtJQUNwQyw0REFBNEQ7SUFDNUQsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQzNCLElBQUksT0FBWSxFQUFFLGlCQUFzQixFQUFFLGlCQUFzQixFQUFFLG1CQUF3QixDQUFDO0lBQzNGLElBQU0sbUJBQW1CLEdBQVM7UUFDaEMsTUFBTSxFQUFFLGNBQU0sT0FBQSxtQkFBbUIsRUFBbkIsQ0FBbUI7S0FDbEMsQ0FBQztJQUNGLElBQU0saUJBQWlCLEdBQUc7UUFDeEIsSUFBTSxhQUFhLEdBQWUsSUFBSSxpQkFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNoRixNQUFNLENBQUMsYUFBYSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQztJQUNGLElBQU0sb0JBQW9CLEdBQUcsVUFBQyxhQUFtQjtRQUMvQyxhQUFhLEdBQUcsYUFBYSxJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFDckQsTUFBTSxDQUFDLElBQUksZ0NBQWMsQ0FDdkIsYUFBYSxFQUNiLE9BQU8sRUFDUCxtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLGlCQUFpQixDQUNsQixDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUYsVUFBVSxDQUFDO1FBQ1QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNoRCxpQkFBaUIsR0FBRztZQUNsQixjQUFjLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxnQ0FBZSxFQUFFLENBQUM7WUFDakQsQ0FBQztTQUNGLENBQUM7UUFDRixpQkFBaUIsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7UUFDckUsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRTtRQUMvQyxJQUFNLE1BQU0sR0FBRyxvQkFBb0IsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtRQUNqRCxJQUFNLFNBQVMsR0FBRyxvQkFBb0IsRUFBRSxDQUFDO1FBQ3pDLElBQU0sY0FBYyxHQUFXO1lBQzdCLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLFdBQVcsRUFBRSxHQUFHO1lBQ2hCLFNBQVMsRUFBRSxHQUFHO1lBQ2QsWUFBWSxFQUFFLElBQUk7WUFDbEIsVUFBVSxFQUFFLEtBQUs7WUFDakIsV0FBVyxFQUFFLEtBQUs7WUFDbEIsZUFBZSxFQUFFLEtBQUs7WUFDdEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUN2QyxPQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQXZELENBQXVELENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw2RUFBNkUsRUFBRTtRQUNoRixJQUFNLFNBQVMsR0FBRyxvQkFBb0IsRUFBRSxDQUFDO1FBQ3pDLElBQU0sU0FBUyxHQUFHO1lBQ2hCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQixhQUFhLEVBQUUsQ0FBQztTQUNqQixDQUFBO1FBQ0QsS0FBSyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNqQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckIsU0FBUyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNuQyxJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdFQUF3RSxFQUFFO1FBQzNFLElBQU0sU0FBUyxHQUFHLG9CQUFvQixFQUFFLENBQUM7UUFDekMsSUFBTSxTQUFTLEdBQUc7WUFDaEIsTUFBTSxFQUFFLENBQUM7WUFDVCxnQkFBZ0IsRUFBRSxDQUFDO1lBQ25CLGFBQWEsRUFBRSxDQUFDO1NBQ2pCLENBQUM7UUFDRixLQUFLLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQy9CLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQixlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLFNBQVMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEMsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQztRQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw2QkFBNkIsRUFBRTtRQUNoQyxJQUFNLFNBQVMsR0FBRyxvQkFBb0IsRUFBRSxDQUFDO1FBQ3pDLElBQU0sU0FBUyxHQUFHO1lBQ2hCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQixhQUFhLEVBQUUsQ0FBQztTQUNqQixDQUFBO1FBQ0QsS0FBSyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNqQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckIsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDM0IsU0FBUyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtRQUM5QixJQUFJLFNBQXlCLENBQUM7UUFDOUIsSUFBSSxhQUF5QixDQUFDO1FBQzlCLElBQU0sU0FBUyxHQUFHO1lBQ2hCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQixhQUFhLEVBQUUsQ0FBQztTQUNqQixDQUFDO1FBRUYsVUFBVSxDQUFDO1lBQ1QsYUFBYSxHQUFHLGlCQUFpQixFQUFFLENBQUM7WUFDcEMsU0FBUyxHQUFHLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2hELEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsaUNBQWlDLEVBQUU7WUFDMUMsUUFBUSxDQUFDLDJCQUEyQixFQUFFO2dCQUNwQyxVQUFVLENBQUM7b0JBQ1QsS0FBSyxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM1RCxTQUFTLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztvQkFDL0IsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN2QixDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsNEJBQTRCLEVBQUU7b0JBQy9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9ELENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyx5QkFBeUIsRUFBRTtvQkFDNUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQzt5QkFDN0Isb0JBQW9CLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUMsYUFBYSxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEYsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxtQ0FBbUMsRUFBRTtnQkFDNUMsVUFBVSxDQUFDO29CQUNULFNBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO29CQUNqQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyx5QkFBeUIsRUFBRTtvQkFDNUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQzt5QkFDN0Isb0JBQW9CLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUMsYUFBYSxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEYsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHFDQUFxQyxFQUFFO1lBQzlDLFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtnQkFDcEMsVUFBVSxDQUFDO29CQUNULFNBQVMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUM5QixTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxzQkFBc0IsRUFBRTtvQkFDekIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQzt5QkFDN0Isb0JBQW9CLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUMsYUFBYSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0UsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyw0QkFBNEIsRUFBRTtnQkFDckMsVUFBVSxDQUFDO29CQUNULFNBQVMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO29CQUMvQixTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQywrQkFBK0IsRUFBRTtvQkFDbEMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQzt5QkFDN0Isb0JBQW9CLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUMsYUFBYSxFQUFFLGFBQWEsRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEYsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGFzeW5jLFxuICBpbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7IEluZmluaXRlU2Nyb2xsIH0gZnJvbSAnLi9pbmZpbml0ZS1zY3JvbGwnO1xuaW1wb3J0IHsgQXhpc1Jlc29sdmVyRmFjdG9yeSB9IGZyb20gJy4vYXhpcy1yZXNvbHZlcic7XG5pbXBvcnQgeyBQb3NpdGlvblJlc29sdmVyRmFjdG9yeSB9IGZyb20gJy4vcG9zaXRpb24tcmVzb2x2ZXInO1xuaW1wb3J0IHsgU2Nyb2xsUmVnaXN0ZXIgfSBmcm9tICcuL3Njcm9sbC1yZWdpc3Rlcic7XG5pbXBvcnQgeyBTY3JvbGxSZXNvbHZlciB9IGZyb20gJy4vc2Nyb2xsLXJlc29sdmVyJztcblxuaW1wb3J0IHsgRWxlbWVudFJlZiwgTmdab25lLCBTaW1wbGVDaGFuZ2VzLCBTaW1wbGVDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZGVzY3JpYmUoJ0luZmluaXRlIFNjcm9sbCBEaXJlY3RpdmUnLCAoKSA9PiB7XG4gIC8vIGNvbnN0IHpvbmUgPSBuZXcgTmdab25lKHsgZW5hYmxlTG9uZ1N0YWNrVHJhY2U6IGZhbHNlIH0pO1xuICBsZXQgaXNTY3JvbGxpbmdEb3duID0gdHJ1ZTtcbiAgbGV0IHpvbmVTcHk6IGFueSwgc2Nyb2xsUmVzb2x2ZXJTcHk6IGFueSwgc2Nyb2xsUmVnaXN0ZXJTcHk6IGFueSwgcG9zaXRpb25SZXNvbHZlclNweTogYW55O1xuICBjb25zdCBwb3NpdGlvbkZhY3RvcnlNb2NrOiBhbnkgPSAge1xuICAgIGNyZWF0ZTogKCkgPT4gcG9zaXRpb25SZXNvbHZlclNweVxuICB9O1xuICBjb25zdCBjcmVhdGVNb2NrRWxlbWVudCA9ICgpID0+IHtcbiAgICBjb25zdCBtb2NrZWRFbGVtZW50OiBFbGVtZW50UmVmID0gbmV3IEVsZW1lbnRSZWYoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xuICAgIHJldHVybiBtb2NrZWRFbGVtZW50O1xuICB9O1xuICBjb25zdCBjcmVhdGVJbmZpbml0ZVNjcm9sbCA9IChtb2NrZWRFbGVtZW50PzogYW55KSA9PiB7XG4gICAgbW9ja2VkRWxlbWVudCA9IG1vY2tlZEVsZW1lbnQgfHwgY3JlYXRlTW9ja0VsZW1lbnQoKTtcbiAgICByZXR1cm4gbmV3IEluZmluaXRlU2Nyb2xsKFxuICAgICAgbW9ja2VkRWxlbWVudCxcbiAgICAgIHpvbmVTcHksXG4gICAgICBwb3NpdGlvbkZhY3RvcnlNb2NrLFxuICAgICAgc2Nyb2xsUmVnaXN0ZXJTcHksXG4gICAgICBzY3JvbGxSZXNvbHZlclNweVxuICAgICk7XG4gIH07XG5cbiAgYmVmb3JlRWFjaCgoKSA9PntcbiAgICB6b25lU3B5ID0gamFzbWluZS5jcmVhdGVTcHlPYmooJ3pvbmUnLCBbJ3J1biddKTtcbiAgICBzY3JvbGxSZXNvbHZlclNweSA9IHtcbiAgICAgIGdldFNjcm9sbFN0YXRzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB7IHNob3VsZFNjcm9sbDogdHJ1ZSwgaXNTY3JvbGxpbmdEb3duIH07XG4gICAgICB9XG4gICAgfTtcbiAgICBzY3JvbGxSZWdpc3RlclNweSA9IGphc21pbmUuY3JlYXRlU3B5T2JqKCdyZWdpc3RlcicsIFsnYXR0YWNoRXZlbnQnXSlcbiAgICBwb3NpdGlvblJlc29sdmVyU3B5ID0gamFzbWluZS5jcmVhdGVTcHlPYmooJ3BvcycsIFsnY3JlYXRlJywgJ2NvbnRhaW5lciddKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIGRpcmVjdGl2ZScsICgpID0+IHtcbiAgICBjb25zdCBhY3R1YWwgPSBjcmVhdGVJbmZpbml0ZVNjcm9sbCgpO1xuICAgIGV4cGVjdChhY3R1YWwpLnRvQmVEZWZpbmVkKCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgaGF2ZSBkZWZhdWx0IEBJbnB1dCBwcm9wZXJ0aWVzIHZhbHVlcycsICgpID0+IHtcbiAgICBjb25zdCBkaXJlY3RpdmUgPSBjcmVhdGVJbmZpbml0ZVNjcm9sbCgpO1xuICAgIGNvbnN0IGV4cGVjdGVkSW5wdXRzOiBPYmplY3QgPSB7XG4gICAgICBfZGlzdGFuY2VEb3duOiAyLFxuICAgICAgX2Rpc3RhbmNlVXA6IDEuNSxcbiAgICAgIF90aHJvdHRsZTogMzAwLFxuICAgICAgc2Nyb2xsV2luZG93OiB0cnVlLFxuICAgICAgX2ltbWVkaWF0ZTogZmFsc2UsXG4gICAgICBfaG9yaXpvbnRhbDogZmFsc2UsXG4gICAgICBfYWx3YXlzQ2FsbGJhY2s6IGZhbHNlLFxuICAgICAgX2Rpc2FibGVkOiBmYWxzZSxcbiAgICAgIF9jb250YWluZXI6IG51bGxcbiAgICB9O1xuXG4gICAgT2JqZWN0LmtleXMoZXhwZWN0ZWRJbnB1dHMpLmZvckVhY2goaW5wdXQgPT5cbiAgICAgIGV4cGVjdChkaXJlY3RpdmVbaW5wdXRdKS50b0VxdWFsKGV4cGVjdGVkSW5wdXRzW2lucHV0XSkpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHRyaWdnZXIgdGhlIG9uU2Nyb2xsRG93biBldmVudCB3aGVuIHNjcm9sbCBoYXMgcGFzc2VkIF9kaXN0YW5jZWREb3duJywgKCkgPT4ge1xuICAgIGNvbnN0IGRpcmVjdGl2ZSA9IGNyZWF0ZUluZmluaXRlU2Nyb2xsKCk7XG4gICAgY29uc3QgY29udGFpbmVyID0ge1xuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgc2Nyb2xsZWRVbnRpbE5vdzogMCxcbiAgICAgIHRvdGFsVG9TY3JvbGw6IDAsXG4gICAgfVxuICAgIHNweU9uKGRpcmVjdGl2ZSwgJ29uU2Nyb2xsRG93bicpO1xuICAgIGRpcmVjdGl2ZS5uZ09uSW5pdCgpO1xuICAgIGRpcmVjdGl2ZS5oYW5kbGVPblNjcm9sbChjb250YWluZXIpXG4gICAgY29uc3QgYWN0dWFsID0gZGlyZWN0aXZlLm9uU2Nyb2xsRG93bjtcbiAgICBleHBlY3QoYWN0dWFsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgdHJpZ2dlciB0aGUgb25TY3JvbGxVcCBldmVudCB3aGVuIHNjcm9sbCBoYXMgcGFzc2VkIF9kaXN0YW5jZVVwJywgKCkgPT4ge1xuICAgIGNvbnN0IGRpcmVjdGl2ZSA9IGNyZWF0ZUluZmluaXRlU2Nyb2xsKCk7XG4gICAgY29uc3QgY29udGFpbmVyID0ge1xuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgc2Nyb2xsZWRVbnRpbE5vdzogMCxcbiAgICAgIHRvdGFsVG9TY3JvbGw6IDAsXG4gICAgfTtcbiAgICBzcHlPbihkaXJlY3RpdmUsICdvblNjcm9sbFVwJyk7XG4gICAgZGlyZWN0aXZlLm5nT25Jbml0KCk7XG4gICAgaXNTY3JvbGxpbmdEb3duID0gZmFsc2U7XG4gICAgZGlyZWN0aXZlLmhhbmRsZU9uU2Nyb2xsKGNvbnRhaW5lcik7XG4gICAgY29uc3QgYWN0dWFsID0gZGlyZWN0aXZlLm9uU2Nyb2xsVXA7XG4gICAgZXhwZWN0KGFjdHVhbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGRpc2FibGUgdGhlIHNjcm9sbGVyJywgKCkgPT4ge1xuICAgIGNvbnN0IGRpcmVjdGl2ZSA9IGNyZWF0ZUluZmluaXRlU2Nyb2xsKCk7XG4gICAgY29uc3QgY29udGFpbmVyID0ge1xuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgc2Nyb2xsZWRVbnRpbE5vdzogMCxcbiAgICAgIHRvdGFsVG9TY3JvbGw6IDAsXG4gICAgfVxuICAgIHNweU9uKGRpcmVjdGl2ZSwgJ29uU2Nyb2xsRG93bicpO1xuICAgIGRpcmVjdGl2ZS5uZ09uSW5pdCgpO1xuICAgIGRpcmVjdGl2ZS5fZGlzYWJsZWQgPSB0cnVlO1xuICAgIGRpcmVjdGl2ZS5oYW5kbGVPblNjcm9sbChjb250YWluZXIpO1xuICAgIGNvbnN0IGFjdHVhbCA9IGRpcmVjdGl2ZS5vblNjcm9sbERvd247XG4gICAgZXhwZWN0KGFjdHVhbCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3Jlc29sdmluZyBjb250YWluZXInLCAoKSA9PiB7XG4gICAgbGV0IGRpcmVjdGl2ZTogSW5maW5pdGVTY3JvbGw7XG4gICAgbGV0IG1vY2tlZEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gICAgY29uc3QgY29udGFpbmVyID0ge1xuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgc2Nyb2xsZWRVbnRpbE5vdzogMCxcbiAgICAgIHRvdGFsVG9TY3JvbGw6IDAsXG4gICAgfTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja2VkRWxlbWVudCA9IGNyZWF0ZU1vY2tFbGVtZW50KCk7XG4gICAgICBkaXJlY3RpdmUgPSBjcmVhdGVJbmZpbml0ZVNjcm9sbChtb2NrZWRFbGVtZW50KTtcbiAgICAgIHNweU9uKHBvc2l0aW9uRmFjdG9yeU1vY2ssICdjcmVhdGUnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd3aGVuIGNvbnRhaW5lciBpbnB1dCBpcyBkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3doZW4gY3NzIHNlbGVjdG9yIGlzIHVzZWQnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIHNweU9uKGRvY3VtZW50LCAncXVlcnlTZWxlY3RvcicpLmFuZC5yZXR1cm5WYWx1ZShjb250YWluZXIpO1xuICAgICAgICAgIGRpcmVjdGl2ZS5fY29udGFpbmVyID0gJy50ZXN0JztcbiAgICAgICAgICBkaXJlY3RpdmUubmdPbkluaXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBmaW5kIGVsZW1lbnQgaW4gRE9NJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnLnRlc3QnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29udGFpbmVyJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChwb3NpdGlvbkZhY3RvcnlNb2NrLmNyZWF0ZSlcbiAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGphc21pbmUub2JqZWN0Q29udGFpbmluZyh7d2luZG93RWxlbWVudDogY29udGFpbmVyfSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnd2hlbiBjb250YWluZXIgaXMgcGFzc2VkIGRpcmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICBkaXJlY3RpdmUuX2NvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgICBkaXJlY3RpdmUubmdPbkluaXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29udGFpbmVyJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChwb3NpdGlvbkZhY3RvcnlNb2NrLmNyZWF0ZSlcbiAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGphc21pbmUub2JqZWN0Q29udGFpbmluZyh7d2luZG93RWxlbWVudDogY29udGFpbmVyfSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3doZW4gY29udGFpbmVyIGlucHV0IGlzIG5vdCBkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3doZW4gc2Nyb2xsV2luZG93IGlzIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIGRpcmVjdGl2ZS5zY3JvbGxXaW5kb3cgPSB0cnVlO1xuICAgICAgICAgIGRpcmVjdGl2ZS5uZ09uSW5pdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB3aW5kb3cnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KHBvc2l0aW9uRmFjdG9yeU1vY2suY3JlYXRlKVxuICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoamFzbWluZS5vYmplY3RDb250YWluaW5nKHt3aW5kb3dFbGVtZW50OiB3aW5kb3d9KSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCd3aGVuIHNjcm9sbFdpbmRvdyBpcyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgZGlyZWN0aXZlLnNjcm9sbFdpbmRvdyA9IGZhbHNlO1xuICAgICAgICAgIGRpcmVjdGl2ZS5uZ09uSW5pdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBjdXJyZW50IGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KHBvc2l0aW9uRmFjdG9yeU1vY2suY3JlYXRlKVxuICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoamFzbWluZS5vYmplY3RDb250YWluaW5nKHt3aW5kb3dFbGVtZW50OiBtb2NrZWRFbGVtZW50fSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=