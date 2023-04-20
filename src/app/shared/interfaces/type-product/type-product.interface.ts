export interface ITypeProductRequest {
    name: string;
    path: string;
}

export interface ITypeProductResponse extends ITypeProductRequest {
    id: string;
}
