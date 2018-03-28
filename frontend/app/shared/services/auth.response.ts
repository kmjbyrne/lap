
export class AuthResponse {
    message: string;
    code: number;
    error: boolean;

    constructor(message, code) {
        this.message = message;
        this.code = code
        this.error = false;
    }
    isError() {
        return ([409, 401, 403].find(x => x === this.code));
    }
}