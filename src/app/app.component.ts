import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent implements OnInit, DoCheck {
  title = 'Angular-ARC-GAD';
  public identity;
  public token;
  public url;


  constructor(
    private _userService: UserService,
    private _router: Router,
    private _activateRoute: ActivatedRoute

  ) {
    this.loadUser();
    this.url = global.url;



  }
  ngOnInit() {

    console.log("pagina cargarda correctamente");

  }

  ngDoCheck() {

    this.loadUser();



  }


  loadUser() {

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  logout() {
   

        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // Redireccionando al inicio
        this._router.navigate(['login']);



    };

  




}

