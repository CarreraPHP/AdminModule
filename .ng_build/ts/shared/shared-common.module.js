import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ExternalModuleProjectSharedLibsModule, JhiLanguageHelper, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent } from './';
export class ExternalModuleProjectSharedCommonModule {
}
ExternalModuleProjectSharedCommonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    ExternalModuleProjectSharedLibsModule
                ],
                declarations: [
                    FindLanguageFromKeyPipe,
                    JhiAlertComponent,
                    JhiAlertErrorComponent
                ],
                providers: [
                    FindLanguageFromKeyPipe,
                    JhiLanguageHelper,
                    Title,
                    {
                        provide: LOCALE_ID,
                        useValue: 'en'
                    },
                ],
                exports: [
                    ExternalModuleProjectSharedLibsModule,
                    FindLanguageFromKeyPipe,
                    JhiAlertComponent,
                    JhiAlertErrorComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
ExternalModuleProjectSharedCommonModule.ctorParameters = () => [];
function ExternalModuleProjectSharedCommonModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ExternalModuleProjectSharedCommonModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ExternalModuleProjectSharedCommonModule.ctorParameters;
}
//# sourceMappingURL=shared-common.module.js.map