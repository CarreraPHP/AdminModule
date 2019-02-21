import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
export declare class JhiConfigurationService {
    private http;
    constructor(http: Http);
    get(): Observable<any>;
    getEnv(): Observable<any>;
}
