import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';

import { AddNewMemberComponent } from './AddNewMember/AddNewMember.component';
import { AddOldMemberComponent } from './AddOldMember/AddOldMember.component';

import { AddNewORGService } from './AddNewORG.service';

@Component({
    selector: 'AddNewORG',
    styles: [``],
    templateUrl: '../app/ListManager/AddNewORG/AddNewORG.html'
})

export class AddNewORGComponent {
    public TestValue: string;
    constructor(public addNewORGService: AddNewORGService, public dialog: MdDialog) {

    }

    public openDialogAddNewMember() {
        this.dialog.open(AddNewMemberComponent);
    }

    public openDialogAddOldMember() {
        this.dialog.open(AddOldMemberComponent);
    }

} 