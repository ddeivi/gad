import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { global } from '../../services/global';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService]
})
export class SidebarComponent implements OnInit {
  public identity;
  public token;

  public user: User;
  public url;
  public mensaje;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private authService: SocialAuthService


  ) {

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User(1, '', '', '', '', '', '', '', '', '', '', '');
    this.url = global.url;
    this.mensaje = global.mensaje;
  }


  ngOnInit(): void {
   this.getUser();

  }



  logout() {
    if (this.user.red_social === 'true') {
      this.authService.signOut();

    }

    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.identity = null;
    this.token = null;

    // Redireccionando al inicio
    this._router.navigate(['login']);



  };

  async getUser() {
      await this._userService.getUserById(this.token, this.identity.sub).subscribe(
        response => {
          this.user = response.usuario;

        },
        error => {
          console.log(error);
        }
      )



  }
}

