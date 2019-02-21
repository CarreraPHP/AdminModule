import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LocalStorageService } from 'ng2-webstorage';
import { JhiBase64Service } from 'ng-jhipster';
export declare class AuthServerProvider {
    private http;
    private base64;
    private $localStorage;
    constructor(http: Http, base64: JhiBase64Service, $localStorage: LocalStorageService);
    getToken(): any;
    login(credentials: any): Observable<any>;
    logout(): Observable<any>;
}
