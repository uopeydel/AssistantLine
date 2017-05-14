"use strict";
var core_1 = require('@angular/core');
var position_resolver_1 = require('./position-resolver');
var scroll_register_1 = require('./scroll-register');
var scroll_resolver_1 = require('./scroll-resolver');
var InfiniteScroll = (function () {
    function InfiniteScroll(element, zone, positionResolverFactory, scrollRegister, scrollerResolver) {
        this.element = element;
        this.zone = zone;
        this.positionResolverFactory = positionResolverFactory;
        this.scrollRegister = scrollRegister;
        this.scrollerResolver = scrollerResolver;
        this.scrolled = new core_1.EventEmitter();
        this.scrolledUp = new core_1.EventEmitter();
        this._distanceDown = 2;
        this._distanceUp = 1.5;
        this._throttle = 300;
        this._disabled = false;
        this._container = null;
        this.scrollWindow = true;
        this._immediate = false;
        this._horizontal = false;
        this._alwaysCallback = false;
        this.throttleType = 'throttle';
    }
    Object.defineProperty(InfiniteScroll.prototype, "debounce", {
        set: function (value) {
            this.throttleType = value === '' || !!value ? 'debounce' : 'throttle';
        },
        enumerable: true,
        configurable: true
    });
    InfiniteScroll.prototype.ngOnInit = function () {
        var _this = this;
        if (typeof window !== 'undefined') {
            var containerElement = this.resolveContainerElement();
            var positionResolver_1 = this.positionResolverFactory.create({
                windowElement: containerElement,
                horizontal: this._horizontal
            });
            var options = {
                container: positionResolver_1.container,
                throttleType: this.throttleType,
                throttleDuration: this._throttle,
                filterBefore: function () { return !_this._disabled; },
                mergeMap: function () { return positionResolver_1.calculatePoints(_this.element); },
                scrollHandler: function (container) { return _this.handleOnScroll(container); }
            };
            this.disposeScroller = this.scrollRegister.attachEvent(options);
        }
    };
    InfiniteScroll.prototype.handleOnScroll = function (container) {
        var scrollResolverConfig = {
            distance: {
                down: this._distanceDown,
                up: this._distanceUp
            }
        };
        var scrollStats = this.scrollerResolver.getScrollStats(container, scrollResolverConfig);
        if (this.shouldTriggerEvents(scrollStats.shouldScroll)) {
            var infiniteScrollEvent = {
                currentScrollPosition: container.scrolledUntilNow
            };
            if (scrollStats.isScrollingDown) {
                this.onScrollDown(infiniteScrollEvent);
            }
            else {
                this.onScrollUp(infiniteScrollEvent);
            }
        }
    };
    InfiniteScroll.prototype.shouldTriggerEvents = function (shouldScroll) {
        return (this._alwaysCallback || shouldScroll) && !this._disabled;
    };
    InfiniteScroll.prototype.ngOnDestroy = function () {
        if (this.disposeScroller) {
            this.disposeScroller.unsubscribe();
        }
    };
    InfiniteScroll.prototype.onScrollDown = function (data) {
        var _this = this;
        if (data === void 0) { data = { currentScrollPosition: 0 }; }
        this.zone.run(function () { return _this.scrolled.emit(data); });
    };
    InfiniteScroll.prototype.onScrollUp = function (data) {
        var _this = this;
        if (data === void 0) { data = { currentScrollPosition: 0 }; }
        this.zone.run(function () { return _this.scrolledUp.emit(data); });
    };
    InfiniteScroll.prototype.resolveContainerElement = function () {
        if (this._container) {
            return typeof (this._container) === 'string' ? window.document.querySelector(this._container) : this._container;
        }
        else {
            return this.scrollWindow ? window : this.element;
        }
    };
    InfiniteScroll.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[infinite-scroll]'
                },] },
    ];
    /** @nocollapse */
    InfiniteScroll.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
        { type: position_resolver_1.PositionResolverFactory, },
        { type: scroll_register_1.ScrollRegister, },
        { type: scroll_resolver_1.ScrollResolver, },
    ]; };
    InfiniteScroll.propDecorators = {
        'scrolled': [{ type: core_1.Output },],
        'scrolledUp': [{ type: core_1.Output },],
        '_distanceDown': [{ type: core_1.Input, args: ['infiniteScrollDistance',] },],
        '_distanceUp': [{ type: core_1.Input, args: ['infiniteScrollUpDistance',] },],
        '_throttle': [{ type: core_1.Input, args: ['infiniteScrollThrottle',] },],
        '_disabled': [{ type: core_1.Input, args: ['infiniteScrollDisabled',] },],
        '_container': [{ type: core_1.Input, args: ['infiniteScrollContainer',] },],
        'scrollWindow': [{ type: core_1.Input, args: ['scrollWindow',] },],
        '_immediate': [{ type: core_1.Input, args: ['immediateCheck',] },],
        '_horizontal': [{ type: core_1.Input, args: ['horizontal',] },],
        '_alwaysCallback': [{ type: core_1.Input, args: ['alwaysCallback',] },],
        'debounce': [{ type: core_1.Input },],
    };
    return InfiniteScroll;
}());
exports.InfiniteScroll = InfiniteScroll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtc2Nyb2xsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5maW5pdGUtc2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxxQkFJTyxlQUFlLENBQUMsQ0FBQTtBQUN2QixrQ0FBd0MscUJBQXFCLENBQUMsQ0FBQTtBQUM5RCxnQ0FBcUQsbUJBQW1CLENBQUMsQ0FBQTtBQUN6RSxnQ0FBK0IsbUJBQW1CLENBQUMsQ0FBQTtBQUtuRDtJQXFCRSx3QkFDVSxPQUFtQixFQUNuQixJQUFZLEVBQ1osdUJBQWdELEVBQ2hELGNBQThCLEVBQzlCLGdCQUFnQztRQUpoQyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWdCO1FBekJ6QyxhQUFRLEdBQUcsSUFBSSxtQkFBWSxFQUF1QixDQUFDO1FBQ25ELGVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQXVCLENBQUM7UUFFckQsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsZ0JBQVcsR0FBVyxHQUFHLENBQUM7UUFDMUIsY0FBUyxHQUFXLEdBQUcsQ0FBQztRQUN4QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGVBQVUsR0FBUSxJQUFJLENBQUM7UUFDdkIsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFDN0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQU0xQixpQkFBWSxHQUFXLFVBQVUsQ0FBQztJQVN2QyxDQUFDO0lBYkosc0JBQUksb0NBQVE7YUFBWixVQUFhLEtBQXVCO1lBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLFVB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QXdIMUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluZmluaXRlU2Nyb2xsRXZlbnQsIFNjcm9sbFN0YXRzLCBQb3NpdGlvblN0YXRzIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLCBOZ1pvbmVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3NpdGlvblJlc29sdmVyRmFjdG9yeSB9IGZyb20gJy4vcG9zaXRpb24tcmVzb2x2ZXInO1xuaW1wb3J0IHsgU2Nyb2xsUmVnaXN0ZXIsIFNjcm9sbFJlZ2lzdGVyQ29uZmlnIH0gZnJvbSAnLi9zY3JvbGwtcmVnaXN0ZXInO1xuaW1wb3J0IHsgU2Nyb2xsUmVzb2x2ZXIgfSBmcm9tICcuL3Njcm9sbC1yZXNvbHZlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1J4JztcblxuXG5cbmV4cG9ydCBjbGFzcyBJbmZpbml0ZVNjcm9sbCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgIHNjcm9sbGVkID0gbmV3IEV2ZW50RW1pdHRlcjxJbmZpbml0ZVNjcm9sbEV2ZW50PigpO1xuICAgc2Nyb2xsZWRVcCA9IG5ldyBFdmVudEVtaXR0ZXI8SW5maW5pdGVTY3JvbGxFdmVudD4oKTtcblxuICAgX2Rpc3RhbmNlRG93bjogbnVtYmVyID0gMjtcbiAgIF9kaXN0YW5jZVVwOiBudW1iZXIgPSAxLjU7XG4gICBfdGhyb3R0bGU6IG51bWJlciA9IDMwMDtcbiAgIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgX2NvbnRhaW5lcjogYW55ID0gbnVsbDtcbiAgIHNjcm9sbFdpbmRvdzogYm9vbGVhbiA9IHRydWU7XG4gICBfaW1tZWRpYXRlOiBib29sZWFuID0gZmFsc2U7XG4gICBfaG9yaXpvbnRhbDogYm9vbGVhbiA9IGZhbHNlO1xuICAgX2Fsd2F5c0NhbGxiYWNrOiBib29sZWFuID0gZmFsc2U7XG4gIFxuICBzZXQgZGVib3VuY2UodmFsdWU6IHN0cmluZyB8IGJvb2xlYW4pIHtcbiAgICB0aGlzLnRocm90dGxlVHlwZSA9IHZhbHVlID09PSAnJyB8fCAhIXZhbHVlID8gJ2RlYm91bmNlJyA6ICd0aHJvdHRsZSc7XG4gIH1cblxuICBwcml2YXRlIHRocm90dGxlVHlwZTogc3RyaW5nID0gJ3Rocm90dGxlJztcbiAgcHJpdmF0ZSBkaXNwb3NlU2Nyb2xsZXI6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBwb3NpdGlvblJlc29sdmVyRmFjdG9yeTogUG9zaXRpb25SZXNvbHZlckZhY3RvcnksXG4gICAgcHJpdmF0ZSBzY3JvbGxSZWdpc3RlcjogU2Nyb2xsUmVnaXN0ZXIsXG4gICAgcHJpdmF0ZSBzY3JvbGxlclJlc29sdmVyOiBTY3JvbGxSZXNvbHZlclxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBjb250YWluZXJFbGVtZW50ID0gdGhpcy5yZXNvbHZlQ29udGFpbmVyRWxlbWVudCgpO1xuICAgICAgY29uc3QgcG9zaXRpb25SZXNvbHZlciA9IHRoaXMucG9zaXRpb25SZXNvbHZlckZhY3RvcnkuY3JlYXRlKHtcbiAgICAgICAgd2luZG93RWxlbWVudDogY29udGFpbmVyRWxlbWVudCxcbiAgICAgICAgaG9yaXpvbnRhbDogdGhpcy5faG9yaXpvbnRhbFxuICAgICAgfSk7XG4gICAgICBjb25zdCBvcHRpb25zOiBTY3JvbGxSZWdpc3RlckNvbmZpZyA9IHtcbiAgICAgICAgY29udGFpbmVyOiBwb3NpdGlvblJlc29sdmVyLmNvbnRhaW5lcixcbiAgICAgICAgdGhyb3R0bGVUeXBlOiB0aGlzLnRocm90dGxlVHlwZSxcbiAgICAgICAgdGhyb3R0bGVEdXJhdGlvbjogdGhpcy5fdGhyb3R0bGUsXG4gICAgICAgIGZpbHRlckJlZm9yZTogKCkgPT4gIXRoaXMuX2Rpc2FibGVkLFxuICAgICAgICBtZXJnZU1hcDogKCkgPT4gcG9zaXRpb25SZXNvbHZlci5jYWxjdWxhdGVQb2ludHModGhpcy5lbGVtZW50KSxcbiAgICAgICAgc2Nyb2xsSGFuZGxlcjogKGNvbnRhaW5lcjogUG9zaXRpb25TdGF0cykgPT4gdGhpcy5oYW5kbGVPblNjcm9sbChjb250YWluZXIpXG4gICAgICB9O1xuICAgICAgdGhpcy5kaXNwb3NlU2Nyb2xsZXIgPSB0aGlzLnNjcm9sbFJlZ2lzdGVyLmF0dGFjaEV2ZW50KG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU9uU2Nyb2xsKGNvbnRhaW5lcjogUG9zaXRpb25TdGF0cykge1xuICAgIGNvbnN0IHNjcm9sbFJlc29sdmVyQ29uZmlnID0ge1xuICAgICAgZGlzdGFuY2U6IHtcbiAgICAgICAgZG93bjogdGhpcy5fZGlzdGFuY2VEb3duLFxuICAgICAgICB1cDogdGhpcy5fZGlzdGFuY2VVcFxuICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgc2Nyb2xsU3RhdHM6IFNjcm9sbFN0YXRzID0gdGhpcy5zY3JvbGxlclJlc29sdmVyLmdldFNjcm9sbFN0YXRzKGNvbnRhaW5lciwgc2Nyb2xsUmVzb2x2ZXJDb25maWcpO1xuICAgIGlmICh0aGlzLnNob3VsZFRyaWdnZXJFdmVudHMoc2Nyb2xsU3RhdHMuc2hvdWxkU2Nyb2xsKSkge1xuICAgICAgY29uc3QgaW5maW5pdGVTY3JvbGxFdmVudDogSW5maW5pdGVTY3JvbGxFdmVudCA9IHtcbiAgICAgICAgY3VycmVudFNjcm9sbFBvc2l0aW9uOiBjb250YWluZXIuc2Nyb2xsZWRVbnRpbE5vd1xuICAgICAgfTtcbiAgICAgIGlmIChzY3JvbGxTdGF0cy5pc1Njcm9sbGluZ0Rvd24pIHtcbiAgICAgICAgdGhpcy5vblNjcm9sbERvd24oaW5maW5pdGVTY3JvbGxFdmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uU2Nyb2xsVXAoaW5maW5pdGVTY3JvbGxFdmVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2hvdWxkVHJpZ2dlckV2ZW50cyhzaG91bGRTY3JvbGw6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gKHRoaXMuX2Fsd2F5c0NhbGxiYWNrIHx8IHNob3VsZFNjcm9sbCkgJiYgIXRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3kgKCkge1xuICAgIGlmICh0aGlzLmRpc3Bvc2VTY3JvbGxlcikge1xuICAgICAgdGhpcy5kaXNwb3NlU2Nyb2xsZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBvblNjcm9sbERvd24oZGF0YTogSW5maW5pdGVTY3JvbGxFdmVudCA9IHsgY3VycmVudFNjcm9sbFBvc2l0aW9uOiAwIH0pIHtcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHRoaXMuc2Nyb2xsZWQuZW1pdChkYXRhKSk7XG4gIH1cblxuICBvblNjcm9sbFVwKGRhdGE6IEluZmluaXRlU2Nyb2xsRXZlbnQgPSB7IGN1cnJlbnRTY3JvbGxQb3NpdGlvbjogMCB9KSB7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB0aGlzLnNjcm9sbGVkVXAuZW1pdChkYXRhKSk7XG4gIH1cblxuICBwcml2YXRlIHJlc29sdmVDb250YWluZXJFbGVtZW50KCk6IGFueSB7XG4gICAgaWYgKHRoaXMuX2NvbnRhaW5lcikge1xuICAgICAgcmV0dXJuIHR5cGVvZih0aGlzLl9jb250YWluZXIpID09PSAnc3RyaW5nJyA/ICB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLl9jb250YWluZXIpIDogdGhpcy5fY29udGFpbmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zY3JvbGxXaW5kb3cgPyB3aW5kb3cgOiB0aGlzLmVsZW1lbnQ7XG4gICAgfVxuICB9XG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7XG4gIHNlbGVjdG9yOiAnW2luZmluaXRlLXNjcm9sbF0nXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xue3R5cGU6IEVsZW1lbnRSZWYsIH0sXG57dHlwZTogTmdab25lLCB9LFxue3R5cGU6IFBvc2l0aW9uUmVzb2x2ZXJGYWN0b3J5LCB9LFxue3R5cGU6IFNjcm9sbFJlZ2lzdGVyLCB9LFxue3R5cGU6IFNjcm9sbFJlc29sdmVyLCB9LFxuXTtcbnN0YXRpYyBwcm9wRGVjb3JhdG9yczoge1trZXk6IHN0cmluZ106IERlY29yYXRvckludm9jYXRpb25bXX0gPSB7XG4nc2Nyb2xsZWQnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ3Njcm9sbGVkVXAnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ19kaXN0YW5jZURvd24nOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWydpbmZpbml0ZVNjcm9sbERpc3RhbmNlJywgXSB9LF0sXG4nX2Rpc3RhbmNlVXAnOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWydpbmZpbml0ZVNjcm9sbFVwRGlzdGFuY2UnLCBdIH0sXSxcbidfdGhyb3R0bGUnOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWydpbmZpbml0ZVNjcm9sbFRocm90dGxlJywgXSB9LF0sXG4nX2Rpc2FibGVkJzogW3sgdHlwZTogSW5wdXQsIGFyZ3M6IFsnaW5maW5pdGVTY3JvbGxEaXNhYmxlZCcsIF0gfSxdLFxuJ19jb250YWluZXInOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWydpbmZpbml0ZVNjcm9sbENvbnRhaW5lcicsIF0gfSxdLFxuJ3Njcm9sbFdpbmRvdyc6IFt7IHR5cGU6IElucHV0LCBhcmdzOiBbJ3Njcm9sbFdpbmRvdycsIF0gfSxdLFxuJ19pbW1lZGlhdGUnOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWydpbW1lZGlhdGVDaGVjaycsIF0gfSxdLFxuJ19ob3Jpem9udGFsJzogW3sgdHlwZTogSW5wdXQsIGFyZ3M6IFsnaG9yaXpvbnRhbCcsIF0gfSxdLFxuJ19hbHdheXNDYWxsYmFjayc6IFt7IHR5cGU6IElucHV0LCBhcmdzOiBbJ2Fsd2F5c0NhbGxiYWNrJywgXSB9LF0sXG4nZGVib3VuY2UnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG59O1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=