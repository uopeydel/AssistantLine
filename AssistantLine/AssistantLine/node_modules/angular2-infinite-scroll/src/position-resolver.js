"use strict";
var core_1 = require('@angular/core');
var axis_resolver_1 = require('./axis-resolver');
var PositionResolverFactory = (function () {
    function PositionResolverFactory(axisResolver) {
        this.axisResolver = axisResolver;
    }
    PositionResolverFactory.prototype.create = function (options) {
        return new PositionResolver(this.axisResolver.create(!options.horizontal), options);
    };
    PositionResolverFactory.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PositionResolverFactory.ctorParameters = function () { return [
        { type: axis_resolver_1.AxisResolverFactory, },
    ]; };
    return PositionResolverFactory;
}());
exports.PositionResolverFactory = PositionResolverFactory;
var PositionResolver = (function () {
    function PositionResolver(axis, options) {
        this.axis = axis;
        this.options = options;
        this.resolveContainer(this.options.windowElement);
        this.defineContainer(this.options.windowElement);
    }
    PositionResolver.prototype.defineContainer = function (windowElement) {
        if (this.resolveContainer(windowElement) || !windowElement.nativeElement) {
            this.container = windowElement;
        }
        else {
            this.container = windowElement.nativeElement;
        }
        return this.container;
    };
    PositionResolver.prototype.resolveContainer = function (windowElement) {
        var isContainerWindow = Object.prototype.toString.call(windowElement).includes('Window');
        this.isContainerWindow = isContainerWindow;
        return isContainerWindow;
    };
    PositionResolver.prototype.getDocumentElement = function () {
        return this.isContainerWindow
            ? this.options.windowElement.document.documentElement
            : null;
    };
    PositionResolver.prototype.calculatePoints = function (element) {
        return this.isContainerWindow
            ? this.calculatePointsForWindow(element)
            : this.calculatePointsForElement(element);
    };
    PositionResolver.prototype.calculatePointsForWindow = function (element) {
        // container's height
        var height = this.height(this.container);
        // scrolled until now / current y point
        var scrolledUntilNow = height + this.pageYOffset(this.getDocumentElement());
        // total height / most bottom y point
        var totalToScroll = this.offsetTop(element.nativeElement) + this.height(element.nativeElement);
        return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
    };
    PositionResolver.prototype.calculatePointsForElement = function (element) {
        var scrollTop = this.axis.scrollTopKey();
        var scrollHeight = this.axis.scrollHeightKey();
        var container = this.container;
        var height = this.height(container);
        // perhaps use this.container.offsetTop instead of 'scrollTop'
        var scrolledUntilNow = container[scrollTop];
        var containerTopOffset = 0;
        var offsetTop = this.offsetTop(container);
        if (offsetTop !== void 0) {
            containerTopOffset = offsetTop;
        }
        var totalToScroll = container[scrollHeight];
        return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
    };
    PositionResolver.prototype.height = function (elem) {
        var offsetHeight = this.axis.offsetHeightKey();
        var clientHeight = this.axis.clientHeightKey();
        // elem = elem.nativeElement;
        if (isNaN(elem[offsetHeight])) {
            return this.getDocumentElement()[clientHeight];
        }
        else {
            return elem[offsetHeight];
        }
    };
    PositionResolver.prototype.offsetTop = function (elem) {
        var top = this.axis.topKey();
        // elem = elem.nativeElement;
        if (!elem.getBoundingClientRect) {
            return;
        }
        return elem.getBoundingClientRect()[top] + this.pageYOffset(elem);
    };
    PositionResolver.prototype.pageYOffset = function (elem) {
        var pageYOffset = this.axis.pageYOffsetKey();
        var scrollTop = this.axis.scrollTopKey();
        var offsetTop = this.axis.offsetTopKey();
        // elem = elem.nativeElement;
        if (isNaN(window[pageYOffset])) {
            return this.getDocumentElement()[scrollTop];
        }
        else if (elem.ownerDocument) {
            return elem.ownerDocument.defaultView[pageYOffset];
        }
        else {
            return elem[offsetTop];
        }
    };
    return PositionResolver;
}());
exports.PositionResolver = PositionResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb24tcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3NpdGlvbi1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQXVDLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZELDhCQUFrRCxpQkFBaUIsQ0FBQyxDQUFBO0FBSXBFO0lBRUUsaUNBQW9CLFlBQWlDO1FBQWpDLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtJQUNyRCxDQUFDO0lBRUQsd0NBQU0sR0FBTixVQUFRLE9BQXlCO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFDSSxrQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCxzQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsbUNBQW1CLEdBQUc7S0FDNUIsRUFGNkYsQ0FFN0YsQ0FBQztJQUNGLDhCQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSwrQkFBdUIsMEJBZW5DLENBQUE7QUFFRDtJQUtFLDBCQUFxQixJQUFrQixFQUFVLE9BQXlCO1FBQXJELFNBQUksR0FBSixJQUFJLENBQWM7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN4RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELDBDQUFlLEdBQWYsVUFBZ0IsYUFBMkI7UUFDekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxJQUFJ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O1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7SUFDSCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBcEdELElBb0dDO0FBcEdZLHdCQUFnQixtQkFvRzVCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBeGlzUmVzb2x2ZXIsIEF4aXNSZXNvbHZlckZhY3RvcnkgfSBmcm9tICcuL2F4aXMtcmVzb2x2ZXInO1xuaW1wb3J0IHsgQ29udGFpbmVyUmVmLCBQb3NpdGlvbkVsZW1lbnRzLCBQb3NpdGlvblN0YXRzIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5cbmV4cG9ydCBjbGFzcyBQb3NpdGlvblJlc29sdmVyRmFjdG9yeSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBheGlzUmVzb2x2ZXI6IEF4aXNSZXNvbHZlckZhY3RvcnkpIHtcbiAgfVxuXG4gIGNyZWF0ZSAob3B0aW9uczogUG9zaXRpb25FbGVtZW50cykge1xuICAgIHJldHVybiBuZXcgUG9zaXRpb25SZXNvbHZlcih0aGlzLmF4aXNSZXNvbHZlci5jcmVhdGUoIW9wdGlvbnMuaG9yaXpvbnRhbCksIG9wdGlvbnMpO1xuICB9XG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xue3R5cGU6IEF4aXNSZXNvbHZlckZhY3RvcnksIH0sXG5dO1xufVxuXG5leHBvcnQgY2xhc3MgUG9zaXRpb25SZXNvbHZlciB7XG4gIHByaXZhdGUgZG9jdW1lbnRFbGVtZW50OiBDb250YWluZXJSZWY7XG4gIHByaXZhdGUgaXNDb250YWluZXJXaW5kb3c6IGJvb2xlYW47XG4gIHB1YmxpYyBjb250YWluZXI6IENvbnRhaW5lclJlZjtcblxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBheGlzOiBBeGlzUmVzb2x2ZXIsIHByaXZhdGUgb3B0aW9uczogUG9zaXRpb25FbGVtZW50cykge1xuICAgIHRoaXMucmVzb2x2ZUNvbnRhaW5lcih0aGlzLm9wdGlvbnMud2luZG93RWxlbWVudCk7XG4gICAgdGhpcy5kZWZpbmVDb250YWluZXIodGhpcy5vcHRpb25zLndpbmRvd0VsZW1lbnQpO1xuICB9XG5cbiAgZGVmaW5lQ29udGFpbmVyKHdpbmRvd0VsZW1lbnQ6IENvbnRhaW5lclJlZikge1xuICAgIGlmICh0aGlzLnJlc29sdmVDb250YWluZXIod2luZG93RWxlbWVudCkgfHwgIXdpbmRvd0VsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy5jb250YWluZXIgPSB3aW5kb3dFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IHdpbmRvd0VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyO1xuICB9XG5cbiAgcmVzb2x2ZUNvbnRhaW5lcih3aW5kb3dFbGVtZW50OiBDb250YWluZXJSZWYpOiBib29sZWFuIHtcbiAgICBjb25zdCBpc0NvbnRhaW5lcldpbmRvdyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aW5kb3dFbGVtZW50KS5pbmNsdWRlcygnV2luZG93Jyk7XG4gICAgdGhpcy5pc0NvbnRhaW5lcldpbmRvdyA9IGlzQ29udGFpbmVyV2luZG93O1xuICAgIHJldHVybiBpc0NvbnRhaW5lcldpbmRvdztcbiAgfVxuXG4gIGdldERvY3VtZW50RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0NvbnRhaW5lcldpbmRvd1xuICAgICAgPyB0aGlzLm9wdGlvbnMud2luZG93RWxlbWVudC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIGNhbGN1bGF0ZVBvaW50cyAoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHJldHVybiB0aGlzLmlzQ29udGFpbmVyV2luZG93XG4gICAgICA/IHRoaXMuY2FsY3VsYXRlUG9pbnRzRm9yV2luZG93KGVsZW1lbnQpXG4gICAgICA6IHRoaXMuY2FsY3VsYXRlUG9pbnRzRm9yRWxlbWVudChlbGVtZW50KTtcbiAgfVxuXG4gIGNhbGN1bGF0ZVBvaW50c0ZvcldpbmRvdyAoZWxlbWVudDogRWxlbWVudFJlZik6IFBvc2l0aW9uU3RhdHMge1xuICAgIC8vIGNvbnRhaW5lcidzIGhlaWdodFxuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuaGVpZ2h0KHRoaXMuY29udGFpbmVyKTtcbiAgICAvLyBzY3JvbGxlZCB1bnRpbCBub3cgLyBjdXJyZW50IHkgcG9pbnRcbiAgICBjb25zdCBzY3JvbGxlZFVudGlsTm93ID0gaGVpZ2h0ICsgdGhpcy5wYWdlWU9mZnNldCh0aGlzLmdldERvY3VtZW50RWxlbWVudCgpKTtcbiAgICAvLyB0b3RhbCBoZWlnaHQgLyBtb3N0IGJvdHRvbSB5IHBvaW50XG4gICAgY29uc3QgdG90YWxUb1Njcm9sbCA9IHRoaXMub2Zmc2V0VG9wKGVsZW1lbnQubmF0aXZlRWxlbWVudCkgKyB0aGlzLmhlaWdodChlbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIHJldHVybiB7IGhlaWdodCwgc2Nyb2xsZWRVbnRpbE5vdywgdG90YWxUb1Njcm9sbCB9O1xuICB9XG5cbiAgY2FsY3VsYXRlUG9pbnRzRm9yRWxlbWVudCAoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIGxldCBzY3JvbGxUb3AgICAgPSB0aGlzLmF4aXMuc2Nyb2xsVG9wS2V5KCk7XG4gICAgbGV0IHNjcm9sbEhlaWdodCA9IHRoaXMuYXhpcy5zY3JvbGxIZWlnaHRLZXkoKTtcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuaGVpZ2h0KGNvbnRhaW5lcik7XG4gICAgLy8gcGVyaGFwcyB1c2UgdGhpcy5jb250YWluZXIub2Zmc2V0VG9wIGluc3RlYWQgb2YgJ3Njcm9sbFRvcCdcbiAgICBjb25zdCBzY3JvbGxlZFVudGlsTm93ID0gY29udGFpbmVyW3Njcm9sbFRvcF07XG4gICAgbGV0IGNvbnRhaW5lclRvcE9mZnNldCA9IDA7XG4gICAgY29uc3Qgb2Zmc2V0VG9wID0gdGhpcy5vZmZzZXRUb3AoY29udGFpbmVyKTtcbiAgICBpZiAob2Zmc2V0VG9wICE9PSB2b2lkIDApIHtcbiAgICAgIGNvbnRhaW5lclRvcE9mZnNldCA9IG9mZnNldFRvcDtcbiAgICB9XG4gICAgY29uc3QgdG90YWxUb1Njcm9sbCA9IGNvbnRhaW5lcltzY3JvbGxIZWlnaHRdO1xuICAgIHJldHVybiB7IGhlaWdodCwgc2Nyb2xsZWRVbnRpbE5vdywgdG90YWxUb1Njcm9sbCB9O1xuICB9XG5cbiAgcHJpdmF0ZSBoZWlnaHQgKGVsZW06IGFueSkge1xuICAgIGxldCBvZmZzZXRIZWlnaHQgPSB0aGlzLmF4aXMub2Zmc2V0SGVpZ2h0S2V5KCk7XG4gICAgbGV0IGNsaWVudEhlaWdodCA9IHRoaXMuYXhpcy5jbGllbnRIZWlnaHRLZXkoKTtcblxuICAgIC8vIGVsZW0gPSBlbGVtLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKGlzTmFOKGVsZW1bb2Zmc2V0SGVpZ2h0XSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERvY3VtZW50RWxlbWVudCgpW2NsaWVudEhlaWdodF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlbGVtW29mZnNldEhlaWdodF07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvZmZzZXRUb3AgKGVsZW06IGFueSkge1xuICAgIGxldCB0b3AgPSB0aGlzLmF4aXMudG9wS2V5KCk7XG5cbiAgICAvLyBlbGVtID0gZWxlbS5uYXRpdmVFbGVtZW50O1xuICAgIGlmICghZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHsgLy8gfHwgZWxlbS5jc3MoJ25vbmUnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVt0b3BdICsgdGhpcy5wYWdlWU9mZnNldChlbGVtKTtcbiAgfVxuXG4gIHBhZ2VZT2Zmc2V0IChlbGVtOiBhbnkpIHtcbiAgICBsZXQgcGFnZVlPZmZzZXQgPSB0aGlzLmF4aXMucGFnZVlPZmZzZXRLZXkoKTtcbiAgICBsZXQgc2Nyb2xsVG9wICAgPSB0aGlzLmF4aXMuc2Nyb2xsVG9wS2V5KCk7XG4gICAgbGV0IG9mZnNldFRvcCAgID0gdGhpcy5heGlzLm9mZnNldFRvcEtleSgpO1xuXG4gICAgLy8gZWxlbSA9IGVsZW0ubmF0aXZlRWxlbWVudDtcbiAgICBpZiAoaXNOYU4od2luZG93W3BhZ2VZT2Zmc2V0XSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERvY3VtZW50RWxlbWVudCgpW3Njcm9sbFRvcF07XG4gICAgfSBlbHNlIGlmIChlbGVtLm93bmVyRG9jdW1lbnQpIHtcbiAgICAgIHJldHVybiBlbGVtLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXdbcGFnZVlPZmZzZXRdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZWxlbVtvZmZzZXRUb3BdO1xuICAgIH1cbiAgfVxufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=