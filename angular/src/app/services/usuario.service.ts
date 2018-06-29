import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UsuarioServicio {
    public url: string;
    public identity;
    public token;

    constructor(private _http: Http) {
        this.url = GLOBAL.URL;
    }

    signup(usuario) {
        const json = JSON.stringify(usuario);
        console.log(json);
        const params = 'json=' + json;
        const headers = new Headers({ 'Content type': 'application/x-www-form-urlencoded' });

        return this._http.post(this.url + '/login', params, { headers: headers }).map(res => res.json());
    }

    getIdentity() {

        const identity = JSON.parse(localStorage.getItem('identity'));
        if (identity !== undefined) {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return identity;
    }

    getToken() {

        const token = JSON.parse(localStorage.getItem('token'));
        if (token !== undefined) {
            this.token = token;
        } else {
            this.token = null;
        }

        return token;
    }

}
