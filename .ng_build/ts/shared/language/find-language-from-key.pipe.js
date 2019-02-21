import { Pipe } from '@angular/core';
export class FindLanguageFromKeyPipe {
    constructor() {
        this.languages = {
            'ar-ly': { name: 'العربية', rtl: true },
            'zh-cn': { name: '中文（简体）' },
            'en': { name: 'English' },
            'hi': { name: 'हिंदी' },
            'ta': { name: 'தமிழ்' }
            // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
        };
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    transform(lang) {
        return this.languages[lang].name;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    isRTL(lang) {
        return this.languages[lang].rtl;
    }
}
FindLanguageFromKeyPipe.decorators = [
    { type: Pipe, args: [{ name: 'findLanguageFromKey' },] },
];
/**
 * @nocollapse
 */
FindLanguageFromKeyPipe.ctorParameters = () => [];
function FindLanguageFromKeyPipe_tsickle_Closure_declarations() {
    /** @type {?} */
    FindLanguageFromKeyPipe.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    FindLanguageFromKeyPipe.ctorParameters;
    /** @type {?} */
    FindLanguageFromKeyPipe.prototype.languages;
}
//# sourceMappingURL=find-language-from-key.pipe.js.map