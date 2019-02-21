import { SessionStorageService } from 'ng2-webstorage';
export declare class StateStorageService {
    private $sessionStorage;
    constructor($sessionStorage: SessionStorageService);
    getPreviousState(): any;
    resetPreviousState(): void;
    storePreviousState(previousStateName: any, previousStateParams: any): void;
    getDestinationState(): any;
    storeUrl(url: string): void;
    getUrl(): any;
    storeDestinationState(destinationState: any, destinationStateParams: any, fromState: any): void;
}
