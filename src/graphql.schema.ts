export interface CreateChitInput {
    content?: string;
    author?: number;
}

export interface CreateUserInput {
    email?: string;
    username?: string;
    password?: string;
}

export interface LoginUserInput {
    username?: string;
    password?: string;
}

export interface Chit {
    id?: number;
    content?: string;
    author?: User;
}

export interface IMutation {
    createChit(createChitInput?: CreateChitInput): Chit | Promise<Chit>;
    createUser(createUserInput?: CreateUserInput): User | Promise<User>;
    loginUser(loginUserInput?: LoginUserInput): UserWithToken | Promise<UserWithToken>;
}

export interface IQuery {
    getChits(): Chit[] | Promise<Chit[]>;
    getChit(id: string): Chit | Promise<Chit>;
    getUsers(): User[] | Promise<User[]>;
    temp__(): boolean | Promise<boolean>;
}

export interface UserWithToken {
    user?: User;
    token?: string;
}

export interface User {
    id?: number;
    email?: string;
    username?: string;
    password?: string;
    chits?: Chit[];
    token?: string;
}
