import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { global } from './global';
import * as moment from 'moment';



@Injectable()
export class RespuestaAreaService {
    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }


    responderRequerimiento(token, respuestaArea, idRequerimiento, idAtencionDireccion): Observable<any> {

        let fecha = Date.now();
        moment.locale('es');
        let formatFecha = moment(fecha).format('YYYY-MM-DD HH:mm:ss');

        let json = JSON.stringify(respuestaArea);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.post(this.url + 'respuesta-requerimiento-area/' + idRequerimiento + '/' + idAtencionDireccion + '/'+ formatFecha, params, { headers: headers });


    }

    obtenerAtencionSecretaria(token, id_requerimiento) {

        //  let name = 'json=' + json;
        let name = 'name=' + id_requerimiento;
        //let name = id_requerimiento;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);


        return this._http.post(this.url + 'atencion-secretaria', name, { headers: headers });

    }

    obtenerRespuestaArea(token, idResDepa) {
        let name;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + 'obtener-respuesta-area/' + idResDepa, name, { headers: headers });

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