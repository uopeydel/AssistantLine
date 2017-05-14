"use strict";
var core_1 = require('@angular/core');
var AxisResolverFactory = (function () {
    function AxisResolverFactory() {
    }
    AxisResolverFactory.prototype.create = function (vertical) {
        if (vertical === void 0) { vertical = true; }
        return new AxisResolver(vertical);
    };
    AxisResolverFactory.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    AxisResolverFactory.ctorParameters = function () { return []; };
    return AxisResolverFactory;
}());
exports.AxisResolverFactory = AxisResolverFactory;
var AxisResolver = (function () {
    function AxisResolver(vertical) {
        if (vertical === void 0) { vertical = true; }
        this.vertical = vertical;
    }
    AxisResolver.prototype.clientHeightKey = function () { return this.vertical ? 'clientHeight' : 'clientWidth'; };
    AxisResolver.prototype.offsetHeightKey = function () { return this.vertical ? 'offsetHeight' : 'offsetWidth'; };
    AxisResolver.prototype.scrollHeightKey = function () { return this.vertical ? 'scrollHeight' : 'scrollWidth'; };
    AxisResolver.prototype.pageYOffsetKey = function () { return this.vertical ? 'pageYOffset' : 'pageXOffset'; };
    AxisResolver.prototype.offsetTopKey = function () { return this.vertical ? 'offsetTop' : 'offsetLeft'; };
    AxisResolver.prototype.scrollTopKey = function () { return this.vertical ? 'scrollTop' : 'scrollLeft'; };
    AxisResolver.prototype.topKey = function () { return this.vertical ? 'top' : 'left'; };
    return AxisResolver;
}());
exports.AxisResolver = AxisResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpcy1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF4aXMtcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUFtQyxlQUFlLENBQUMsQ0FBQTtBQUduRDtJQUNFO0lBQWdCLENBQUM7SUFFakIsb0NBQU0sR0FBTixVQUFPLFFBQXdCO1FBQXhCLHdCQUF3QixHQUF4QixlQUF3QjtRQUM3QixNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNJLDhCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGtDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsMEJBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLDJCQUFtQixzQkFZL0IsQ0FBQTtBQUVEO0lBQ0Usc0JBQW9CLFFBQXdCO1FBQWhDLHdCQUFnQyxHQUFoQyxlQUFnQztRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtJQUM1QyxDQUFDO0lBQ0Qsc0NBQWUsR0FBZixjQUFvQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUM1RSxzQ0FBZSxHQUFmLGNBQW9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzVFLHNDQUFlLEdBQWYsY0FBb0IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDNUUscUNBQWMsR0FBZCxjQUFtQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUMxRSxtQ0FBWSxHQUFaLGNBQWlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLG1DQUFZLEdBQVosY0FBaUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDckUsNkJBQU0sR0FBTixjQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JELG1CQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSxvQkFBWSxlQVV4QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuZXhwb3J0IGNsYXNzIEF4aXNSZXNvbHZlckZhY3Rvcnkge1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGNyZWF0ZSh2ZXJ0aWNhbDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICByZXR1cm4gbmV3IEF4aXNSZXNvbHZlcih2ZXJ0aWNhbCk7XG4gIH1cbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKCkgPT4gKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSAoKSA9PiBbXG5dO1xufVxuXG5leHBvcnQgY2xhc3MgQXhpc1Jlc29sdmVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2ZXJ0aWNhbDogYm9vbGVhbiA9IHRydWUpIHtcbiAgfVxuICBjbGllbnRIZWlnaHRLZXkoKSB7IHJldHVybiB0aGlzLnZlcnRpY2FsID8gJ2NsaWVudEhlaWdodCcgOiAnY2xpZW50V2lkdGgnOyB9XG4gIG9mZnNldEhlaWdodEtleSgpIHsgcmV0dXJuIHRoaXMudmVydGljYWwgPyAnb2Zmc2V0SGVpZ2h0JyA6ICdvZmZzZXRXaWR0aCc7IH1cbiAgc2Nyb2xsSGVpZ2h0S2V5KCkgeyByZXR1cm4gdGhpcy52ZXJ0aWNhbCA/ICdzY3JvbGxIZWlnaHQnIDogJ3Njcm9sbFdpZHRoJzsgfVxuICBwYWdlWU9mZnNldEtleSgpIHsgcmV0dXJuIHRoaXMudmVydGljYWwgPyAncGFnZVlPZmZzZXQnIDogJ3BhZ2VYT2Zmc2V0JzsgfVxuICBvZmZzZXRUb3BLZXkoKSB7IHJldHVybiB0aGlzLnZlcnRpY2FsID8gJ29mZnNldFRvcCcgOiAnb2Zmc2V0TGVmdCc7IH1cbiAgc2Nyb2xsVG9wS2V5KCkgeyByZXR1cm4gdGhpcy52ZXJ0aWNhbCA/ICdzY3JvbGxUb3AnIDogJ3Njcm9sbExlZnQnOyB9XG4gIHRvcEtleSgpIHsgcmV0dXJuIHRoaXMudmVydGljYWwgPyAndG9wJyA6ICdsZWZ0JzsgfVxufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=