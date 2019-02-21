import { RendererFactory2, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FindLanguageFromKeyPipe } from './find-language-from-key.pipe';
export declare class JhiLanguageHelper {
    private translateService;
    private rootRenderer;
    private findLanguageFromKeyPipe;
    private titleService;
    private router;
    renderer: Renderer2;
    constructor(translateService: TranslateService, rootRenderer: RendererFactory2, findLanguageFromKeyPipe: FindLanguageFromKeyPipe, titleService: Title, router: Router);
    getAll(): Promise<any>;
    /**
     * Update the window title using params in the following
     * order:
     * 1. titleKey parameter
     * 2. $state.$current.data.pageTitle (current state page title)
     * 3. 'global.title'
     */
    updateTitle(titleKey?: string): void;
    private init;
    private getPageTitle;
    private updatePageDirection;
}
