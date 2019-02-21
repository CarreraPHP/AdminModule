import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { UserModalService } from './user-modal.service';
import { JhiLanguageHelper, User, UserService } from '../../shared';
export declare class UserMgmtDialogComponent implements OnInit {
    activeModal: NgbActiveModal;
    private languageHelper;
    private userService;
    private eventManager;
    user: User;
    languages: any[];
    authorities: any[];
    isSaving: Boolean;
    constructor(activeModal: NgbActiveModal, languageHelper: JhiLanguageHelper, userService: UserService, eventManager: JhiEventManager);
    ngOnInit(): void;
    clear(): void;
    save(): void;
    private onSaveSuccess;
    private onSaveError;
}
export declare class UserDialogComponent implements OnInit, OnDestroy {
    private route;
    private userModalService;
    modalRef: NgbModalRef;
    routeSub: any;
    constructor(route: ActivatedRoute, userModalService: UserModalService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
