export type ApiError = {
    code?: string;
    message: string;
    values: { [key: string]: string };
};

export type ApiResponse<T = unknown> =
    | {
    data: T;
    error: never;
}
    | {
    data: never;
    error: ApiError;
};

export type Role = 'admin' | 'user';

export type AppEvent =
    | 'user.password.updated'
    | 'user.password.request'
    | 'user.updated'
    | 'user.signup'
    | 'user.password.reset'
    | 'team.fetched'
    | 'team.created'
    | 'team.updated'
    | 'team.removed'

export type AUTH_PROVIDER =
    | 'google'
    | 'email'
    | 'credentials';
