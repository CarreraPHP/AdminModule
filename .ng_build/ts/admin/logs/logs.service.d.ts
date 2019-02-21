import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Log } from './log.model';
export declare class LogsService {
    private http;
    constructor(http: Http);
    changeLevel(log: Log): Observable<Response>;
    findAll(): Observable<Log[]>;
}
