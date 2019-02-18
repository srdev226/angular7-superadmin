export interface Customer {
    address: Address;
    createdAt: number;
    currency: Currency;
    email: string;
    id: number;
    industry: Industry;
    name: string;
    phone: string;
    timezone: Timezone;
    url: string;
    user: User;
    portal_access: string;
}
// Address
export interface Address {
    addressLine1: string;
    addressLine2: string;
    addressType: AddressType;
    address_line_1: string;
    address_line_2: string;
    address_type: string;
    address_type_id: number;
    address_zip: string;
    city: City;
    country: Country;
    id: number;
    latitude: number;
    longitude: number;
    state: State;
    zipCode: string;
}
export interface AddressType {
    id: number;
    name: string;
}
export interface City {
    city_id: number;
    city_name: string;
    cityname_caps: string;
    cityname_rc: string;
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}
export interface Country {
    country_code: string;
    country_id: number;
    country_name: string;
    currency_code: string;
    currency_id: number;
    currency_name: string;
    name: string;
    phone_code: string;
}
export interface State {
    id: number;
    name: string;
    state_code: string;
    state_id: number;
    state_name: string;
}

// Currency
export interface Currency {
    currency_id: number;
    default: true;
    id: number;
    name: string;
    status: number;
    symbol: string;
}

// Industry
export interface Industry {
    id: number;
    name: string;
}

// Timezone
export interface Timezone {
    base_UtcOffset: number;
    daylight_name: string;
    id: number;
    name: string;
    standard_name: string;
    supports_daylight_saving_time: boolean;
}

// User
export interface User {
    email: string;
    employee_id: string;
    id: number;
    image: string;
    name: string;
}


