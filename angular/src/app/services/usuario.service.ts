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
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/login', params, { headers: headers }).map(res => res.json());
    }

    // obtiene el identity del local storage
    getIdentity() {
        // obtenemos del local storage
        const identity = JSON.parse(localStorage.getItem('identity'));
        if (identity !== 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        // retorna la identidad
        return identity;
    }

    // obtiene el token del local storage
    getToken() {
        // obtenemos del local storage
        const token = JSON.parse(localStorage.getItem('token'));
        if (token !== 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }
        console.log(this.token);

        // retorna el token
        return token;
    }

    register(usuario_registro) {
        const json = JSON.stringify(usuario_registro);
        const params = 'json=' + json;
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/new', params, { headers: headers }).map(res => res.json());
    }

    update_user(usuario_update) {
        console.log(usuario_update);
        const json = JSON.stringify(usuario_update);
        const params = 'json=' + json + '&authorization=' + this.getToken();
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/edit', params, { headers: headers }).map(res => res.json());
    }
}
