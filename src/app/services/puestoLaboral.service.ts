import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { global } from './global';



@Injectable()
export class PuestoLaboralService {
    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }




    getNiveles(token): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.get(this.url + 'niveles', { headers: headers });


    }

    registrar(token, puestoLaboral): Observable<any> {

        let json = JSON.stringify(puestoLaboral);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.post(this.url + 'registrar-puestos', params, { headers: headers });


    }

    editar(token, puestoLaboral, idPuesto): Observable<any> {

        let json = JSON.stringify(puestoLaboral);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.put(this.url + 'editar-puesto/' + idPuesto, params, { headers: headers });


    }

    eliminar(token, idPuesto): Observable<any> {

  
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.delete(this.url + 'eliminar-puesto/' + idPuesto, { headers: headers });


    }


}