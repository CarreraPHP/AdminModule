import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { User, UserService } from '../../shared';
import { UserModalService } from './user-modal.service';
export declare class UserMgmtDeleteDialogComponent {
    private userService;
    activeModal: NgbActiveModal;
    private eventManager;
    user: User;
    constructor(userService: UserService, activeModal: NgbActiveModal, eventManager: JhiEventManager);
    clear(): void;
    confirmDelete(login: any): void;
}
export declare class UserDeleteDialogComponent implements OnInit, OnDestroy {
    private route;
    private userModalService;
    modalRef: NgbModalRef;
    routeSub: any;
    constructor(route: ActivatedRoute, userModalService: UserModalService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
