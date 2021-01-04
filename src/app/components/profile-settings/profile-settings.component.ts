import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
  providers: [UserService]
})
export class ProfileSettingsComponent implements OnInit {
  public token;
  public identity;
  public user: User;
  public url;
  public mensaje;
  public nuevaPassInput;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.user = new User(null, '', '', '', '', '', '', '', '', '', '', '');
    // this.user = this.identity;
    this.url = global.url;
    this.mensaje = global.mensaje;

  }

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".png, .jpg, .jpeg",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'subir-imagen-usuario',
      headers: {
        "Authorization": this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,

    replaceTexts: {
      selectFileBtn: 'Seleccion de archivo',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      attachPinBtn: 'Subir foto',
      afterUploadMsg_success: 'Carga exitosa',
      afterUploadMsg_error: 'Carga fallida'

    }
  };


  ngOnInit(): void {
    this.getUser();
  }

  onSubmit(form) {

    console.log(this.user);
    this._activateRoute.params.subscribe(params => {
      let id = params['id'];
      this._userService.updateUser(this.token, this.user, id).subscribe(
        response => {

          if (response && response.usuario) {

            this.identity.imagen = this.user.imagen;
            localStorage.setItem('identity', JSON.stringify(this.identity));

            this.success();

          } else {
            this.error();

          }


        },
        error => {
          this.error();

          console.log(error);
        }
      )
    });


  }

  getUser() {
    this._activateRoute.params.subscribe(params => {
      let id = params['id'];


      if (id !== this.identity.sub) {

        id = this.identity.sub;

        if (this.identity.role === 'ROLE_ADMIN') {
          
          id = params['id'];

        }

      }

      this._router.navigate(['perfil', id]);

      this._userService.getUserById(this.token, id).subscribe(
        response => {
          this.user = response.usuario;
        },
        error => {
        });


    });

  }



  cambiarPass() {
    this._userService.cambiarPass(this.user, this.nuevaPassInput, this.token).subscribe(
      response => {
        this.success();


      },
      error => {
        this.errorPass();
      }
    )
  }



  Upload(datos) {
    let file = datos.body.imagen;
    this.user.imagen = file;

  }


  success() {
    Swal.fire({
      icon: 'success',
      title: 'Actualización éxitosa',
      showConfirmButton: false,
      timer: 900
    });
  }

  error() {
    Swal.fire({
      icon: 'error',
      title: 'No se pudo procesar su información',
      showConfirmButton: true
    });
  }

  errorPass() {
    Swal.fire({
      icon: 'error',
      title: 'Contraseña actual incorrecta',
      timer: 900,
      showConfirmButton: false
    });
  }



}
