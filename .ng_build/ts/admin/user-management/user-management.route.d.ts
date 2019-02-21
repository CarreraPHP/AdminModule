import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';
import { Principal } from '../../shared';
export declare class UserResolve implements CanActivate {
    private principal;
    constructor(principal: Principal);
    canActivate(): Promise<boolean>;
}
export declare class UserResolvePagingParams implements Resolve<any> {
    private paginationUtil;
    constructor(paginationUtil: JhiPaginationUtil);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): {
        page: number;
        predicate: string;
        ascending: boolean;
    };
}
export declare const userMgmtRoute: Routes;
export declare const userDialogRoute: Routes;
