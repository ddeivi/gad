import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { global } from './global';
import * as moment from 'moment';



@Injectable()
export class RespuestaDepartamentoService {
    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }


    responderRequerimiento(token, respuestaDepartamento, idRequerimiento, idAtencionArea): Observable<any> {

        let fecha = Date.now();
        moment.locale('es');
        let formatFecha = moment(fecha).format('YYYY-MM-DD HH:mm:ss');

        let json = JSON.stringify(respuestaDepartamento);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.post(this.url + 'respuesta-requerimiento-departamento/' + idRequerimiento + '/' + idAtencionArea + '/' + formatFecha, params, { headers: headers });


    }

    obtenerAtencionSecretaria(token, id_requerimiento) {

        //  let name = 'json=' + json;
        let name = 'name=' + id_requerimiento;
        //let name = id_requerimiento;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);


        return this._http.post(this.url + 'atencion-secretaria', name, { headers: headers });

    }

    obtenerRespuestaDepartamento(token, idResDepa) {
        let name;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + 'obtener-respuesta-departamento/' + idResDepa, name, { headers: headers });

    }



}