import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AddNewORGService } from '../AddNewORG.service';

@Component({
    selector: 'AddNewMember',
    styles: [``],
    templateUrl: '../app/ListManager/AddNewORG/AddNewMember/AddNewMember.html'
})

export class AddNewMemberComponent {
    constructor(public addNewORGService: AddNewORGService) {

    }

   
} 