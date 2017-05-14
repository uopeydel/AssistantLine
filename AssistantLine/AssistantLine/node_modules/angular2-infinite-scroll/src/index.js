"use strict";
var core_1 = require('@angular/core');
var infinite_scroll_1 = require('./infinite-scroll');
var axis_resolver_1 = require('./axis-resolver');
var position_resolver_1 = require('./position-resolver');
var scroll_register_1 = require('./scroll-register');
var scroll_resolver_1 = require('./scroll-resolver');
var InfiniteScrollModule = (function () {
    function InfiniteScrollModule() {
    }
    InfiniteScrollModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [],
                    declarations: [infinite_scroll_1.InfiniteScroll],
                    exports: [infinite_scroll_1.InfiniteScroll],
                    providers: [
                        axis_resolver_1.AxisResolverFactory,
                        position_resolver_1.PositionResolverFactory,
                        scroll_register_1.ScrollRegister,
                        scroll_resolver_1.ScrollResolver
                    ]
                },] },
    ];
    /** @nocollapse */
    InfiniteScrollModule.ctorParameters = function () { return []; };
    return InfiniteScrollModule;
}());
exports.InfiniteScrollModule = InfiniteScrollModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBRXpDLGdDQUErQixtQkFBbUIsQ0FBQyxDQUFBO0FBQ25ELDhCQUFvQyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3RELGtDQUF3QyxxQkFBcUIsQ0FBQyxDQUFBO0FBQzlELGdDQUErQixtQkFBbUIsQ0FBQyxDQUFBO0FBQ25ELGdDQUErQixtQkFBbUIsQ0FBQyxDQUFBO0FBR25EO0lBQUE7SUFnQkEsQ0FBQztJQWhCMEMsK0JBQVUsR0FBMEI7UUFDL0UsRUFBRSxJQUFJLEVBQUUsZUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN2QixPQUFPLEVBQUUsRUFBRTtvQkFDWCxZQUFZLEVBQUUsQ0FBQyxnQ0FBYyxDQUFDO29CQUM5QixPQUFPLEVBQUUsQ0FBQyxnQ0FBYyxDQUFDO29CQUN6QixTQUFTLEVBQUU7d0JBQ1QsbUNBQW1CO3dCQUNuQiwyQ0FBdUI7d0JBQ3ZCLGdDQUFjO3dCQUNkLGdDQUFjO3FCQUNmO2lCQUNGLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxtQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLDJCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQWhCWSw0QkFBb0IsdUJBZ0JoQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSW5maW5pdGVTY3JvbGwgfSBmcm9tICcuL2luZmluaXRlLXNjcm9sbCc7XG5pbXBvcnQgeyBBeGlzUmVzb2x2ZXJGYWN0b3J5IH0gZnJvbSAnLi9heGlzLXJlc29sdmVyJztcbmltcG9ydCB7IFBvc2l0aW9uUmVzb2x2ZXJGYWN0b3J5IH0gZnJvbSAnLi9wb3NpdGlvbi1yZXNvbHZlcic7XG5pbXBvcnQgeyBTY3JvbGxSZWdpc3RlciB9IGZyb20gJy4vc2Nyb2xsLXJlZ2lzdGVyJztcbmltcG9ydCB7IFNjcm9sbFJlc29sdmVyIH0gZnJvbSAnLi9zY3JvbGwtcmVzb2x2ZXInO1xuXG5cbmV4cG9ydCBjbGFzcyBJbmZpbml0ZVNjcm9sbE1vZHVsZSB7IHN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbe1xuICBpbXBvcnRzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbSW5maW5pdGVTY3JvbGxdLFxuICBleHBvcnRzOiBbSW5maW5pdGVTY3JvbGxdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBeGlzUmVzb2x2ZXJGYWN0b3J5LFxuICAgIFBvc2l0aW9uUmVzb2x2ZXJGYWN0b3J5LFxuICAgIFNjcm9sbFJlZ2lzdGVyLFxuICAgIFNjcm9sbFJlc29sdmVyXG4gIF1cbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKCkgPT4gKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSAoKSA9PiBbXG5dO1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=