import { Injectable, RendererFactory2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from './language.constants';
import { FindLanguageFromKeyPipe } from './find-language-from-key.pipe';
export class JhiLanguageHelper {
    /**
     * @param {?} translateService
     * @param {?} rootRenderer
     * @param {?} findLanguageFromKeyPipe
     * @param {?} titleService
     * @param {?} router
     */
    constructor(translateService, rootRenderer, findLanguageFromKeyPipe, titleService, router) {
        this.translateService = translateService;
        this.rootRenderer = rootRenderer;
        this.findLanguageFromKeyPipe = findLanguageFromKeyPipe;
        this.titleService = titleService;
        this.router = router;
        this.renderer = null;
        this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);
        this.init();
    }
    /**
     * @return {?}
     */
    getAll() {
        return Promise.resolve(LANGUAGES);
    }
    /**
     * Update the window title using params in the following
     * order:
     * 1. titleKey parameter
     * 2. $state.$current.data.pageTitle (current state page title)
     * 3. 'global.title'
     * @param {?=} titleKey
     * @return {?}
     */
    updateTitle(titleKey) {
        if (!titleKey) {
            titleKey = this.getPageTitle(this.router.routerState.snapshot.root);
        }
        this.translateService.get(titleKey).subscribe((title) => {
            this.titleService.setTitle(title);
        });
    }
    /**
     * @return {?}
     */
    init() {
        this.translateService.onLangChange.subscribe((event) => {
            this.renderer.setAttribute(document.querySelector('html'), 'lang', this.translateService.currentLang);
            this.updateTitle();
            this.updatePageDirection();
        });
    }
    /**
     * @param {?} routeSnapshot
     * @return {?}
     */
    getPageTitle(routeSnapshot) {
        let /** @type {?} */ title = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'externalModuleProjectApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }
    /**
     * @return {?}
     */
    updatePageDirection() {
        this.renderer.setAttribute(document.querySelector('html'), 'dir', this.findLanguageFromKeyPipe.isRTL(this.translateService.currentLang) ? 'rtl' : 'ltr');
    }
}
JhiLanguageHelper.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
JhiLanguageHelper.ctorParameters = () => [
    { type: TranslateService, },
    { type: RendererFactory2, },
    { type: FindLanguageFromKeyPipe, },
    { type: Title, },
    { type: Router, },
];
function JhiLanguageHelper_tsickle_Closure_declarations() {
    /** @type {?} */
    JhiLanguageHelper.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JhiLanguageHelper.ctorParameters;
    /** @type {?} */
    JhiLanguageHelper.prototype.renderer;
    /** @type {?} */
    JhiLanguageHelper.prototype.translateService;
    /** @type {?} */
    JhiLanguageHelper.prototype.rootRenderer;
    /** @type {?} */
    JhiLanguageHelper.prototype.findLanguageFromKeyPipe;
    /** @type {?} */
    JhiLanguageHelper.prototype.titleService;
    /** @type {?} */
    JhiLanguageHelper.prototype.router;
}
//# sourceMappingURL=language.helper.js.map