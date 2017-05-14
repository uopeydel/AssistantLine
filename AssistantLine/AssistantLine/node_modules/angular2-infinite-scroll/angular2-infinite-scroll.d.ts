import { InfiniteScroll } from './src/infinite-scroll';
import { PositionResolver } from './src/position-resolver';
import { AxisResolver } from './src/axis-resolver';
export { InfiniteScroll } from './src/infinite-scroll';
export { PositionResolver, PositionResolverFactory } from './src/position-resolver';
export { AxisResolver, AxisResolverFactory } from './src/axis-resolver';
export { InfiniteScrollModule } from './src/index';
export { ScrollRegister } from './src/scroll-register';
export { ScrollResolver } from './src/scroll-resolver';
export * from './src/models';
declare var _default: {
    directives: (typeof AxisResolver | typeof PositionResolver | typeof InfiniteScroll)[];
};
export default _default;
