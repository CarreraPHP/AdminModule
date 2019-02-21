import { AuditData } from './audit-data.model';
export declare class Audit {
    data: AuditData;
    principal: string;
    timestamp: string;
    type: string;
    constructor(data: AuditData, principal: string, timestamp: string, type: string);
}
