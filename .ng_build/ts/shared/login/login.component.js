import { Component, Renderer, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { LoginService } from './login.service';
import { StateStorageService } from '../auth/state-storage.service';
export class JhiLoginModalComponent {
    /**
     * @param {?} eventManager
     * @param {?} loginService
     * @param {?} stateStorageService
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} router
     * @param {?} activeModal
     */
    constructor(eventManager, loginService, stateStorageService, elementRef, renderer, router, activeModal) {
        this.eventManager = eventManager;
        this.loginService = loginService;
        this.stateStorageService = stateStorageService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.router = router;
        this.activeModal = activeModal;
        this.credentials = {};
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
    }
    /**
     * @return {?}
     */
    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        this.activeModal.dismiss('cancel');
    }
    /**
     * @return {?}
     */
    login() {
        this.loginService.login({
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe
        }).then(() => {
            this.authenticationError = false;
            this.activeModal.dismiss('login success');
            if (this.router.url === '/register' || (/^\/activate\//.test(this.router.url)) ||
                (/^\/reset\//.test(this.router.url))) {
                this.router.navigate(['']);
            }
            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });
            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState
            const /** @type {?} */ redirect = this.stateStorageService.getUrl();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]);
            }
        }).catch(() => {
            this.authenticationError = true;
        });
    }
    /**
     * @return {?}
     */
    register() {
        this.activeModal.dismiss('to state register');
        this.router.navigate(['/register']);
    }
    /**
     * @return {?}
     */
    requestResetPassword() {
        this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'request']);
    }
}
JhiLoginModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'jhi-login-modal',
                template: `
      <div class="modal-header">
          <h4 class="modal-title" jhiTranslate="login.title">Sign in</h4>
          <button aria-label="Close" data-dismiss="modal" class="close" type="button" (click)="activeModal.dismiss('closed')"><span aria-hidden="true">x</span>
          </button>
      </div>
      <div class="modal-body">
          <div class="row justify-content-center">
              <div class="col-md-8">
                  <div class="alert alert-danger" *ngIf="authenticationError" jhiTranslate="login.messages.error.authentication">
                      <strong>Failed to sign in!</strong> Please check your credentials and try again.
                  </div>
              </div>
              <div class="col-md-8">
                  <form class="form" role="form" (ngSubmit)="login()">
                      <div class="form-group">
                          <label for="username" jhiTranslate="global.form.username">Login</label>
                          <input type="text" class="form-control" name="username" id="username" placeholder="{{'global.form.username.placeholder' | translate}}"
                          [(ngModel)]="username">
                      </div>
                      <div class="form-group">
                          <label for="password" jhiTranslate="login.form.password">Password</label>
                          <input type="password" class="form-control" name="password" id="password" placeholder="{{'login.form.password.placeholder' | translate}}"
                                 [(ngModel)]="password">
                      </div>
                      <div class="form-check">
                          <label class="form-check-label" for="rememberMe">
                              <input class="form-check-input" type="checkbox" name="rememberMe" id="rememberMe" [(ngModel)]="rememberMe" checked>
                              <span jhiTranslate="login.form.rememberme">Remember me</span>
                          </label>
                      </div>
                      <button type="submit" class="btn btn-primary" jhiTranslate="login.form.button">Sign in</button>
                  </form>
                  <p></p>
                  <div class="alert alert-warning">
                      <a class="alert-link" (click)="requestResetPassword()" jhiTranslate="login.password.forgot">Did you forget your password?</a>
                  </div>
                  <div class="alert alert-warning">
                      <span jhiTranslate="global.messages.info.register.noaccount">You don't have an account yet?</span>
                      <a class="alert-link" (click)="register()" jhiTranslate="global.messages.info.register.link">Register a new account</a>
                  </div>
              </div>
          </div>
      </div>
    `
            },] },
];
/**
 * @nocollapse
 */
JhiLoginModalComponent.ctorParameters = () => [
    { type: JhiEventManager, },
    { type: LoginService, },
    { type: StateStorageService, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: Router, },
    { type: NgbActiveModal, },
];
function JhiLoginModalComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    JhiLoginModalComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JhiLoginModalComponent.ctorParameters;
    /** @type {?} */
    JhiLoginModalComponent.prototype.authenticationError;
    /** @type {?} */
    JhiLoginModalComponent.prototype.password;
    /** @type {?} */
    JhiLoginModalComponent.prototype.rememberMe;
    /** @type {?} */
    JhiLoginModalComponent.prototype.username;
    /** @type {?} */
    JhiLoginModalComponent.prototype.credentials;
    /** @type {?} */
    JhiLoginModalComponent.prototype.eventManager;
    /** @type {?} */
    JhiLoginModalComponent.prototype.loginService;
    /** @type {?} */
    JhiLoginModalComponent.prototype.stateStorageService;
    /** @type {?} */
    JhiLoginModalComponent.prototype.elementRef;
    /** @type {?} */
    JhiLoginModalComponent.prototype.renderer;
    /** @type {?} */
    JhiLoginModalComponent.prototype.router;
    /** @type {?} */
    JhiLoginModalComponent.prototype.activeModal;
}
//# sourceMappingURL=login.component.js.map