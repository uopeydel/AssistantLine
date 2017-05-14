import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AddNewORGService } from '../AddNewORG.service';

@Component({
    selector: 'AddOldMember',
    styles: [``],
    templateUrl: '../app/ListManager/AddNewORG/AddOldMember/AddOldMember.html'
})

export class AddOldMemberComponent {
    constructor(public addNewORGService: AddNewORGService) {

    }
 

} 