export enum Permissions {
    READ_GLOBAL_ROLES = 'read:global:roles',
    READ_ORG_ROLES = 'read:org:roles',
}

export interface AuthzModuleOptions {
    prefix?: string;
    adminPrefix?: string;
}

export type AuthContext = {
    userId?: string;
    organizationId?: string | null;
    resourceId?: string | null;
    [key: string]: any;
};

export type PermissionEntry = {
    action: string;
    resource?: string | null;
    policy?: any | null; // JSONLogic
};

export type EvaluatedPermission = PermissionEntry & {
    roleId: string;
    organizationId?: string | null;
};
