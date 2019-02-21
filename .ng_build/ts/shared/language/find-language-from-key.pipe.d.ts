import { PipeTransform } from '@angular/core';
export declare class FindLanguageFromKeyPipe implements PipeTransform {
    private languages;
    transform(lang: string): string;
    isRTL(lang: string): boolean;
}
