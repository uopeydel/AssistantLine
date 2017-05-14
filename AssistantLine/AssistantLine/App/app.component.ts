import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    selector: 'my-app',
    templateUrl: '../App/app.background.html'
})
export class AppComponent implements OnInit {
    name = 'Angular';

    constructor(private localStorageService: LocalStorageService) {

    }

    public ngOnInit() {
        this.localStorageService.set('id', 'testid');
        console.log(this.localStorageService.get('id'));
    }

}
