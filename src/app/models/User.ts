
export class User{
    id?: number;
    username?: string;
    email?: string;
    role?: string;
    last_name?: string;
    first_name?: string;
    password?: string;
    password1?: string;
    password2?: string;
    is_superuser: boolean = false;
    is_active: boolean = false;
}
