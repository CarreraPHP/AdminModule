import { JhiLanguageService } from 'ng-jhipster';
import { Principal } from '../auth/principal.service';
import { AuthServerProvider } from '../auth/auth-oauth2.service';
export declare class LoginService {
    private languageService;
    private principal;
    private authServerProvider;
    constructor(languageService: JhiLanguageService, principal: Principal, authServerProvider: AuthServerProvider);
    login(credentials: any, callback?: any): Promise<{}>;
    logout(): void;
}
