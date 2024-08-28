export interface User {
    id?: number;
    email?: string;
    password?: string;
    username: string;
}

export interface Login {
    email: string;
    password: string;
}
