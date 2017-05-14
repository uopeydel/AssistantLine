import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "underscore";

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

@Pipe({ name: 'colorStatusOnline' })
export class ColorStatusOnlinePipe {
    transform(value: any) {
        let trans = [
            { key: 'offline', value: '#B2B1BB' },
            { key: 'online', value: '#7FB3D5' },
            { key: 'busy', value: '#F1948A' },// can edit issue

        ]
        return _.findWhere(trans, { key: value }).value;
    }
}

//Waiting 1   OnTalk 2
@Pipe({ name: 'CustomerActiveStatus' })
export class CustomerActiveStatusPipe {
    transform(value: any) {
        let trans = [
            { key: 1, statusName: 'Waiting' },
            { key: 2, statusName: 'OnTalk' },
        ]
        return _.findWhere(trans, { key: value }).statusName;
    }
}

//Online 1  Offline 2 Busy 3
@Pipe({ name: 'AgentActiveStatus' })
export class AgentActiveStatusPipe {
    transform(value: any) {
        let trans = [
            { key: 1, statusName: 'Online' },
            { key: 2, statusName: 'Offline' },
            { key: 3, statusName: 'Busy' },
        ]
        return _.findWhere(trans, { key: value }).statusName;
    }
}
