import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { global } from './global';



@Injectable()
export class DireccionService {
    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }


    getDirecciones(token): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                                                    .set('Authorization', token);

        return this._http.get(this.url + 'mostrar-direcciones', { headers: headers });


    }

    

    

/*
    getCandidates(): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'candidates', { headers: headers });


    }

    getCanByList(id): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'candidate/list/' + id, { headers: headers });


    }



    

    
    getCandidateById(token, id): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        

        return this._http.get(this.url + 'candidate/' + id, { headers: headers });


    }

    update(token, candidate, id): Observable<any> {

        let json = JSON.stringify(candidate);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.put(this.url + 'edit/candidate/' + id, params, { headers: headers });


    }

    
    delete(token, id): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.delete(this.url + 'delete/candidate/' + id, { headers: headers });


    }
*/
}