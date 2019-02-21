import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from './login.service';
import { StateStorageService } from '../auth/state-storage.service';

@Component({
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
})
export class JhiLoginModalComponent implements AfterViewInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;

    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        public activeModal: NgbActiveModal
    ) {
        this.credentials = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        this.activeModal.dismiss('cancel');
    }

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
            const redirect = this.stateStorageService.getUrl();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]);
            }
        }).catch(() => {
            this.authenticationError = true;
        });
    }

    register() {
        this.activeModal.dismiss('to state register');
        this.router.navigate(['/register']);
    }

    requestResetPassword() {
        this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'request']);
    }
}
