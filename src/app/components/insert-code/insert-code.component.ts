import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insert-code',
  templateUrl: './insert-code.component.html',
  styleUrls: ['./insert-code.component.css'],
  providers: [UserService]

})
export class InsertCodeComponent implements OnInit {
  public user: User;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
  ) {

    this.user = new User(1, '', '', '', '', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
  }


  onSubmit(form) {

    this._activateRoute.params.subscribe(params => {
      let correo = params['correo'];
      this.user.correo = correo;
      this._userService.InsertarCodigo(this.user).subscribe(
        response => {


          this.success();
          form.reset();


        },
        error => {
          this.error();

        });
    });

  }



  success() {
    Swal.fire({
      icon: 'success',
      title: 'Proceso exitoso',
      text: 'Hemos enviado una contraseña a su correo electrónico',
      showConfirmButton: true,
    });
  }

  error() {
    Swal.fire({
      icon: 'error',
      title: 'Codigo incorrecto',
      timer:900,
      showConfirmButton: false
    });
  }

}
