import { OnInit } from '@angular/core';
import { Log } from './log.model';
import { LogsService } from './logs.service';
export declare class LogsComponent implements OnInit {
    private logsService;
    loggers: Log[];
    filter: string;
    orderProp: string;
    reverse: boolean;
    constructor(logsService: LogsService);
    ngOnInit(): void;
    changeLevel(name: string, level: string): void;
}
