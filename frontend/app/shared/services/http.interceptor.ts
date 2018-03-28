import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "./auth.service";


@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

    constructor(private auth: AuthenticationService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.token();
        // Clone the request to add the new header.
        const authHeaders = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        // Pass on the cloned request instead of the original request.
        console.log('Applying headers now', authHeaders);
        return next.handle(authHeaders);
        // return next.handle(req);
    }
}