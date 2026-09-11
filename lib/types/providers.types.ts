export type GetProvidersResponse = {
    success: boolean;
    data: Provider[]
}

export type Provider = {
    id: string;
    name: string;
    slug: string;
    info: string;
    image: string;
    certified: boolean;
    popularity: number;
    planCount: number;
}