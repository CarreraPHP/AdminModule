import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from './user.model';
import { ResponseWrapper } from '../model/response-wrapper.model';
export declare class UserService {
    private http;
    private resourceUrl;
    constructor(http: Http);
    create(user: User): Observable<ResponseWrapper>;
    update(user: User): Observable<ResponseWrapper>;
    find(login: string): Observable<User>;
    query(req?: any): Observable<ResponseWrapper>;
    delete(login: string): Observable<Response>;
    authorities(): Observable<string[]>;
    private convertResponse;
}
