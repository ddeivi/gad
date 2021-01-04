import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { global } from './global';



@Injectable()
export class UserService {
    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }

    register(user): Observable<any> {

        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'registro-usuario', params, { headers: headers });


    }

    signup(user, gettoken = null): Observable<any> {

        if (gettoken != null) {
            user.gettoken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'login', params, { headers: headers });

    }



    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity && identity != null && identity != undefined && identity != "undefined"){
            this.identity = identity;

        }else{
            this.identity = null;
        }
        return this.identity;

    }
    getToken(){
        let token = localStorage.getItem('token');

        if (token && token != null && token != undefined && token != "undefined"){
            this.token = token;

        }else{
            this.token = null;
        }
        return this.token;


    }

    getUsers(token): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.get(this.url + 'mostrar-usuarios-nuevo', { headers: headers });
    }
    
    updateUser(token, user, id): Observable<any> {

        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.put(this.url + 'editar-usuario/' + id , params, { headers: headers });


    }

    getUserById(token, id): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        

        return this._http.get(this.url + 'detalle-usuario/' + id, { headers: headers });


    }
    

    desactivarCuenta(id,token): Observable<any> {
       
       // let pass = '1';

       let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
       .set('Authorization', token);

        return this._http.post(this.url + 'desactivar-cuenta/' + id, { headers: headers });


    }

    activarCuenta(id,token): Observable<any> {
  
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);
        return this._http.post(this.url + 'activar-cuenta/' + id, { headers: headers });


    }

    recuperarPass(user): Observable<any> {

        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'recuperar-password', params, { headers: headers });


    }

    InsertarCodigo(user): Observable<any> {

        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'ingresar-codigo', params, { headers: headers });


    }

    cambiarPass(user, newPass,token): Observable<any> {

        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);

        return this._http.put(this.url + 'cambiar-pass/' + newPass, params, { headers: headers });


    }


}