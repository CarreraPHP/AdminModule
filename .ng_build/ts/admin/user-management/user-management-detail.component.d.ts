import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from '../../shared';
export declare class UserMgmtDetailComponent implements OnInit, OnDestroy {
    private userService;
    private route;
    user: User;
    private subscription;
    constructor(userService: UserService, route: ActivatedRoute);
    ngOnInit(): void;
    load(login: any): void;
    ngOnDestroy(): void;
}
