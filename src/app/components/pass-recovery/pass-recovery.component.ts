import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pass-recovery',
  templateUrl: './pass-recovery.component.html',
  styleUrls: ['./pass-recovery.component.css'],
  providers: [UserService]
})
export class PassRecoveryComponent implements OnInit {
  public user: User;

  constructor(
    private _userService: UserService

  ) {

    this.user = new User(1, '', '', '', '', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
  }


  onSubmit(form) {
    this._userService.recuperarPass(this.user).subscribe(
      response => {

        this.success();

        form.reset();
      },
      error => {


      });
  }



  success() {
    Swal.fire({
      icon: 'info',
      title: 'Código enviado',
      text: 'Por favor revise su correo electrónico, hemos enviado el código de seguridad',
      showConfirmButton: true,
    });
  }


}
