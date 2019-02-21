import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
export class ExternalModuleProjectSharedLibsModule {
}
ExternalModuleProjectSharedLibsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    NgbModule.forRoot(),
                    NgJhipsterModule.forRoot({
                        // set below to true to make alerts look like toast
                        alertAsToast: false,
                        i18nEnabled: true,
                        defaultI18nLang: 'en'
                    }),
                    InfiniteScrollModule,
                    CookieModule.forRoot()
                ],
                exports: [
                    FormsModule,
                    HttpModule,
                    CommonModule,
                    NgbModule,
                    NgJhipsterModule,
                    InfiniteScrollModule
                ]
            },] },
];
/**
 * @nocollapse
 */
ExternalModuleProjectSharedLibsModule.ctorParameters = () => [];
function ExternalModuleProjectSharedLibsModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ExternalModuleProjectSharedLibsModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ExternalModuleProjectSharedLibsModule.ctorParameters;
}
//# sourceMappingURL=shared-libs.module.js.map