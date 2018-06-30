import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class TareaServicio {
    public url: string;
    public identity;
    public token;

    constructor(private _http: Http) {
        this.url = GLOBAL.URL;
    }

    newTask(token, nueva_tarea) {
        const json = JSON.stringify(nueva_tarea);
        const params = 'json=' + json + '&authorization=' + token;
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/new1', params, { headers: headers }).map(res => res.json());
    }

    getTasks(token, page = null) {
        const params = 'authorization=' + token;
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/list?page=' + page, params, { headers: headers }).map(res => res.json());

    }

    getTask(token, id) {
        const params = 'authorization=' + token;
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/detail/' + id, params, { headers: headers }).map(res => res.json());

    }

    updateTask(token, tarea, id) {
        const json = JSON.stringify(tarea);
        const params = 'json=' + json + '&authorization=' + token;
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/edit1/' + id, params, { headers: headers }).map(res => res.json());
    }
}
