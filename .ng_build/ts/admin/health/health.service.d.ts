import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
export declare class JhiHealthService {
    private http;
    separator: string;
    constructor(http: Http);
    checkHealth(): Observable<any>;
    transformHealthData(data: any): any;
    getBaseName(name: any): string;
    getSubSystemName(name: any): string;
    private addHealthObject;
    private flattenHealthData;
    private getModuleName;
    private hasSubSystem;
    private isHealthObject;
}
