import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public user: User;
  public mensaje;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {

    this.mensaje = global.mensaje;

    this.user = new User(1, '', '', '', '', '', '', '', '', '', '', '');


  }

  ngOnInit(): void {
  }

  onSubmit(form) {

    this._userService.register(this.user).subscribe(
      response => {

        if (response && response.user) {
          this.user = response.user;

          form.reset();

          this._router.navigate(['login']);

          this.success();


        } else {

this.error();
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
      title: 'Registro éxitoso',
      showConfirmButton: false,
      timer: 900
    });
  }

  error() {
    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: 'No se pudo validar su información',
      timer: 1200,
      showConfirmButton: false
    });
  }

}
