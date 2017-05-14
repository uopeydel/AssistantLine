import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {
    transform(value: Array<any>, field: string): Array<any> {
        if (value !== undefined) {
            const groupedObj = value.reduce((prev, cur) => {
                if (!prev[cur[field]]) {
                    prev[cur[field]] = [cur];
                } else {
                    prev[cur[field]].push(cur);
                }
                return prev;
            }, {});
            let newGroupByObj = Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
            //console.log('newGroupByObj');
            //console.log(newGroupByObj);
            return newGroupByObj;
        }
        else {
            return value;
        }
    }
}


@Pipe({ name: 'reverse' })
export class ReversePipe {
    transform(value: any) {
        return value.slice().reverse();
    }
}