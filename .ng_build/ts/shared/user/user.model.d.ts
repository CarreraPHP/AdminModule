export declare class User {
    id?: any;
    login?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    activated?: Boolean;
    langKey?: string;
    authorities?: any[];
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
    password?: string;
    constructor(id?: any, login?: string, firstName?: string, lastName?: string, email?: string, activated?: Boolean, langKey?: string, authorities?: any[], createdBy?: string, createdDate?: Date, lastModifiedBy?: string, lastModifiedDate?: Date, password?: string);
}
