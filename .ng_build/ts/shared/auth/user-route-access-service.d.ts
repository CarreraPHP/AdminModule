import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Principal } from '../';
import { LoginModalService } from '../login/login-modal.service';
import { StateStorageService } from './state-storage.service';
export declare class UserRouteAccessService implements CanActivate {
    private router;
    private loginModalService;
    private principal;
    private stateStorageService;
    constructor(router: Router, loginModalService: LoginModalService, principal: Principal, stateStorageService: StateStorageService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean>;
    checkLogin(authorities: string[], url: string): Promise<boolean>;
}
