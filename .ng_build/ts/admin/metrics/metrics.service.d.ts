import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
export declare class JhiMetricsService {
    private http;
    constructor(http: Http);
    getMetrics(): Observable<any>;
    threadDump(): Observable<any>;
}
