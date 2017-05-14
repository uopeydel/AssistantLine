import { Injectable } from '@angular/core';

@Injectable()
export class AddNewORGService {
    private stackvar: string = 'open';

    public testValue(testvar: string): string {
        this.stackvar += testvar;
        return 'qwer tester ' + this.stackvar;
    }
}
