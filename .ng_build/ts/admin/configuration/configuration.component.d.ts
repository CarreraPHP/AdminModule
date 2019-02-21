import { OnInit } from '@angular/core';
import { JhiConfigurationService } from './configuration.service';
export declare class JhiConfigurationComponent implements OnInit {
    private configurationService;
    allConfiguration: any;
    configuration: any;
    configKeys: any[];
    filter: string;
    orderProp: string;
    reverse: boolean;
    constructor(configurationService: JhiConfigurationService);
    keys(dict: any): Array<string>;
    ngOnInit(): void;
}
