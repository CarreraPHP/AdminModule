import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User, UserService } from '../../shared';
export declare class UserModalService {
    private modalService;
    private router;
    private userService;
    private isOpen;
    constructor(modalService: NgbModal, router: Router, userService: UserService);
    open(component: Component, login?: string): NgbModalRef;
    userModalRef(component: Component, user: User): NgbModalRef;
}
