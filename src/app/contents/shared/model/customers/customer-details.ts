import {Customer} from './customer';

export interface CustomerDetails {
    enabled_preferences: Object[];
    entities: Entity[];
    modules: Module[];
    organization_details: Customer;
}
// Object
export interface Object {
    id: number;
    name: string;
}
// Entity
export interface Entity {
    dependencies: Object[];
    enabled: boolean;
    id: number;
    name: string;
    preferences: Object[];
}
// Module
export interface Module {
    entities: Entity[];
    id: number;
    name: string;
}

// EntityRequestBody
export interface EntityRequestBody {
    entities: EntityRequest[];
}
export interface EntityRequest {
    enabled: boolean;
    id: number;
}
// Profile
export interface Profile {
    email?: string;
    first_name: string;
    last_name: string;
    phone?: string;
    salutation: string;
    status: string;
    tenant: number;
}
