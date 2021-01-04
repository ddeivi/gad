import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { global } from './global';



@Injectable()
export class RequestService {
    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }

   

    getMyRequests(token): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                                                     .set('Authorization', token);

        return this._http.get(this.url + 'requerimientos-usuario', { headers: headers });


    }
    getRequestById(id, token): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                                                    .set('Authorization', token);

        return this._http.get(this.url + 'requerimiento/' + id, { headers: headers });


    }

    getRequests(token): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                                                     .set('Authorization', token);

        return this._http.get(this.url + 'requerimientos-secretaria', { headers: headers });


    }

    getFileRequestByName(name): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

        return this._http.get(this.url + 'obtener-archivo/' + name, { headers: headers });


    }

    request(request, token): Observable<any> {

        let json = JSON.stringify(request);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.post(this.url + 'solicitar-requerimiento', params, { headers: headers });

        
    }

    update(token, id): Observable<any> {
        let name;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.put(this.url + 'editar-reenviado/' + id, name, { headers: headers });


    }

    historial(id, token): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                                                    .set('Authorization', token);

        return this._http.get(this.url + 'obtener-historial/' + id, { headers: headers });


    }
}