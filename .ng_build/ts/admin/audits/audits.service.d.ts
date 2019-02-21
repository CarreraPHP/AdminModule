import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
export declare class AuditsService {
    private http;
    constructor(http: Http);
    query(req: any): Observable<Response>;
}
