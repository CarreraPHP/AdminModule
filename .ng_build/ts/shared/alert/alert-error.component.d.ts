import { OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';
export declare class JhiAlertErrorComponent implements OnDestroy {
    private alertService;
    private eventManager;
    private translateService;
    alerts: any[];
    cleanHttpErrorListener: Subscription;
    constructor(alertService: JhiAlertService, eventManager: JhiEventManager, translateService: TranslateService);
    ngOnDestroy(): void;
    addErrorAlert(message: any, key?: any, data?: any): void;
}
