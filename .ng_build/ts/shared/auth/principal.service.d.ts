import { Observable } from 'rxjs/Observable';
import { AccountService } from './account.service';
export declare class Principal {
    private account;
    private userIdentity;
    private authenticated;
    private authenticationState;
    constructor(account: AccountService);
    authenticate(identity: any): void;
    hasAnyAuthority(authorities: string[]): Promise<boolean>;
    hasAnyAuthorityDirect(authorities: string[]): boolean;
    hasAuthority(authority: string): Promise<boolean>;
    identity(force?: boolean): Promise<any>;
    isAuthenticated(): boolean;
    isIdentityResolved(): boolean;
    getAuthenticationState(): Observable<any>;
    getImageUrl(): String;
}
