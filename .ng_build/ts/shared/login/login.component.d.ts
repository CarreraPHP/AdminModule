import { AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { LoginService } from './login.service';
import { StateStorageService } from '../auth/state-storage.service';
export declare class JhiLoginModalComponent implements AfterViewInit {
    private eventManager;
    private loginService;
    private stateStorageService;
    private elementRef;
    private renderer;
    private router;
    activeModal: NgbActiveModal;
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    constructor(eventManager: JhiEventManager, loginService: LoginService, stateStorageService: StateStorageService, elementRef: ElementRef, renderer: Renderer, router: Router, activeModal: NgbActiveModal);
    ngAfterViewInit(): void;
    cancel(): void;
    login(): void;
    register(): void;
    requestResetPassword(): void;
}
