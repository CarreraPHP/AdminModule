import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
export declare class AccountService {
    private http;
    constructor(http: Http);
    get(): Observable<any>;
    save(account: any): Observable<Response>;
}
