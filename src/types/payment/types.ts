export interface PaytrailProvider {
    url?: string
    icon?: string
    svg?: string
    group?: string
    name?: string
    id?: string
    parameters?: PaytrailProviderParameter[]
}

export interface PaytrailProviderParameter {
    name?: string
    value?: string
}

export interface PaymentMethod {
    name: string;
    code: string;
    group: string;
    img: string;
    gateway: string;
}