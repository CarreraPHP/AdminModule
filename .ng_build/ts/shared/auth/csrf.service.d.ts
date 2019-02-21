import { CookieService } from 'ngx-cookie';
export declare class CSRFService {
    private cookieService;
    constructor(cookieService: CookieService);
    getCSRF(name?: string): string;
}
