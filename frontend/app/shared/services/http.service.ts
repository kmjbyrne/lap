import { Injectable } from '@angular/core';
// import { Http, XHRBackend, RequestOptions, Response, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { AuthService } from '../../auth/auth.service';
// import { RequestMethod } from '@angular/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';

@Injectable()
export class HttpService {
    acceptedHttpErrors: number[];
    header: string;
    status;
    router;

    // constructor(private http: Http, _backend: XHRBackend, _options: RequestOptions, private auth: AuthenticationService, private router: Router) {
    constructor(private http: HttpClient, private auth: AuthService, router: Router) {
        this.auth = auth;
        this.router = router;
        // this.options = options;
        // this.backend = backend;
        // Attempts to get an auth token from local storage
        // let token = localStorage.getItem('authToken');
        // Apply the auth token to the auth header
        // options.headers.set('Authorization', `Bearer ${btoa(token)}`);
        // super(backend, options);
    }

    prepareToken(): boolean {
        return this.auth.token();
    }

    extract(response: Response) {
        console.log('Extracting request response: ', response);
        return response;
    }

    headers(_url = '') {
        let headers = new HttpHeaders();
        headers.set('Authorization', `Bearer ${this.prepareToken()}`);
        return headers;
        // let options = undefined;
        // if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
        //     if (!options) {
        //         // let's make option object
        //         options = { headers: new Headers() };
        //     }
        //     options.headers.set('Authorization', `Bearer ${this.prepareToken()}`);
        // } else {
        //     // we have to add the token to the url object
        //     url.headers.set('Authorization', `Bearer ${this.prepareToken()}`);
        // }
        // return options;
    }

    prepare(path, method) {
        let request = { 'url': undefined, 'options': undefined };
        const url: string = this.completeURL(path);
        const headers = this.headers(path);
        console.log(headers);
        let methods = {
            'get': 'get',
            'post': 'post',
            'put': 'put',
            'delete': 'delete',
            'options': 'options',
        };
        const options: RequestOptions = new RequestOptions({
            url: url,
            method: methods[method],
            // headers: headers
        });
        request.url = url;
        request.options = options;
        // options.headers = headers;
        return request
    }

    get(path: string, _params?: {}, _credentials?: boolean): Observable<any> {
        // this.auth.checkAuth();
        let request = this.prepare(path, 'get');
        return this.http.get(request.url, request.options).catch(this.catchAuthError(this));
    }

    post(path: string, _params?: {}) {
        let request = this.prepare(path, 'post');
        return this.http.post(request.url, _params).catch(this.catchAuthError(this));
    }

    put(path: string, _params?: {}) {
        let request = this.prepare(path, 'put');
        return this.http.put(request.url, _params).catch(this.catchAuthError(this));
    }

    delete(path: string, _params?: {}) {
        let request = this.prepare(path, 'delete');
        return this.http.delete(request.url, _params).catch(this.catchAuthError(this));
    }

    head(path: string, _params?: {}) {
        let request = this.prepare(path, 'head');
        return this.http.head(request.url, _params).catch(this.catchAuthError(this));
    }

    options(path: string, _params?: {}) {
        let request = this.prepare(path, 'options');
        return this.http.options(request.url, _params).catch(this.catchAuthError(this));
    }

    // request(url: string | Request, options?: RequestOptionsArgs) {
    //     let token = localStorage.getItem('authToken');
    //     if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
    //         if (!options) {
    //             // let's make option object
    //             options = { headers: new Headers() };
    //         }
    //         options.headers.set('Authorization', `Bearer ${this.prepareToken(token)}`);
    //     } else {
    //         // we have to add the token to the url object
    //         url.headers.set('Authorization', `Bearer ${this.prepareToken(token)}`);
    //     }
    //     url = this.completeURL(url);
    //     console.log(url);
    //     return super.request(url, options).catch(this.catchAuthError(this));
    // }

    private completeURL(url) {
        url = 'http://localhost:5000' + url;
        return url;
    }

    private catchAuthError(_self: HttpService) {
        // we have to pass HttpService's own instance here as `self`
        return (res: Response) => {
            let acceptedCodes = [401, 403, 409];
            if (acceptedCodes.find(status => status === res.status)) {
                if (res.status === 401 || res.status === 403) {
                    console.log('Access denied. Redirecting to auth section');
                    this.router.navigate(['/login']);
                    // this.router.navigate(['/login']);
                    return Observable.throw(res);
                }
                return Observable.of(res);
            }
            return Observable.throw(res);
        };
    }
}