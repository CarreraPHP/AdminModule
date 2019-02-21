import { Headers } from '@angular/http';
export declare class ResponseWrapper {
    headers: Headers;
    json: any;
    status: number;
    constructor(headers: Headers, json: any, status: number);
}
