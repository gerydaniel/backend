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
        const params = 'json=' + json;
        const headers = new Headers({ 'Content type': 'application/x-www-form-urlencoded' });

        return this._http.post(this.url + '/login', params, { headers: headers }).map(res => res.json());
    }
}
