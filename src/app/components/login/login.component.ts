import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { global } from '../../services/global';
import Swal from 'sweetalert2';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]

})
export class LoginComponent implements OnInit {

  public user: User;
  public status: string;
  public identity;
  public token;
  public mensaje;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private authService: SocialAuthService
  ) {

    this.mensaje = global.mensaje;
    this.user = new User(1, '', '', '', '', '', '', '', '', '', '', '');


  }

  ngOnInit(): void {
  }

  async onSubmit(form) {

    await this._userService.signup(this.user).subscribe(


      response => {

        if (response.code === 404) {
this.suspendida();          
        } else {
          
        



        // TOKEN
        if (response.status !== 'error') {
          // this.status = response.status;
          this.status = 'success';
          this.token = response;

          // objeto usuario identificado
          this._userService.signup(this.user, true).subscribe(


            response => {

              this.identity = response;

              // persistir datos de usuario
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              if (this.identity.role === 'ROLE_USER') {
                this._router.navigate(['inicio']);

              } else {
                this._router.navigate(['bienvenido']);


              }

              setTimeout(() => {
                window.location.reload();
              }, 30);


            },
            error => {
              this.error();

            }

          );


          // fin
        } else {
          this.error();

        }
      }
      },
      error => {
        this.error();
      }

    );

  }


  // sesion con redes sociales

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.registroGoogle();


  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.registroFacebook();
  }

  signOut(): void {
    this.authService.signOut();
  }


  registroGoogle() {
    this.authService.authState.subscribe((user) => {
      console.log(user);

      if (user) {
        this.user.cedula = 'sin cedula';
        this.user.nombre = user.firstName;
        this.user.apellido = user.lastName;
        this.user.imagen = user.photoUrl;
        this.user.telefono = '09';
        this.user.correo = user.email;
        this.user.password = '1';
        this.user.red_social = 'true';

        this._userService.register(this.user).subscribe(
          response => {
            if (response.user) {
              this.loguear();

            }
            if (response.message === 'El usuario no se creado') {
              this.loguear();

            }
            else {
              console.log('correo registrado');
            }


          },

          error => {
            console.log(error);

          });
      }

    });
  }


  registroFacebook() {
    this.authService.authState.subscribe((user) => {
      console.log(user);

      if (user) {
        this.user.cedula = 'sin cedula';
        this.user.nombre = user.firstName;
        this.user.apellido = user.lastName;
        this.user.imagen = user.photoUrl;
        this.user.telefono = '09';
        this.user.correo = user.email;
        this.user.password = '1';
        this.user.red_social = 'true';

        this._userService.register(this.user).subscribe(
          response => {
            if (response.user) {
              this.loguear();

            }
            if (response.message === 'El usuario no se creado') {
              this.loguear();

            }
            else {
              console.log('correo registrado');
            }


          },

          error => {
            console.log(error);

          });
      }
    });
  }














  loguear() {
    this._userService.signup(this.user).subscribe(


      response => {
        if (response.code === 404) {
          this.suspendida();          
                  } else {

        // TOKEN
        if (response.status !== 'error') {
          // this.status = response.status;
          this.status = 'success';
          this.token = response;

          // objeto usuario identificado
          this._userService.signup(this.user, true).subscribe(


            response => {

              this.identity = response;

              // persistir datos de usuario
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              if (this.identity.role === 'ROLE_USER') {
                this._router.navigate(['inicio']);

              } else {
                this._router.navigate(['bienvenido']);


              }

              setTimeout(() => {
                window.location.reload();
              }, 30);


            },
            error => {
              this.error();

            }

          );
          

          // fin
        } else {
          this.error();

        }
      }
      },
      error => {
        this.error();
      }

    );


  }


  success() {
    Swal.fire({
      icon: 'success',
      title: 'Proceso éxitoso',
      showConfirmButton: true,
    });
  }

  error() {
    Swal.fire({
      icon: 'error',
      title: 'Ingreso incorrecto',
      text: 'Contraseña o usuario incorrectos',
      timer: 1200,
      showConfirmButton: false
    });
  }

  suspendida() {
    Swal.fire({
      icon: 'info',
      title: 'Cuenta no habilitada',
      text: 'Esta cuenta ha sido suspendida, consulte con el administrador',
      showConfirmButton: true
    });
  }



}
