import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RequestService } from '../../services/request.service';
import { Request } from '../../models/request';
import { global } from 'src/app/services/global';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-view-requests',
  templateUrl: '../my-requests/my-requests.component.html',
  styleUrls: ['./view-requests.component.css'],
  providers: [UserService, RequestService]


})
export class ViewRequestsComponent implements OnInit {
  public identity;
  public token;
  public requests: Request;
  public url;
  public id;
  public integer;
  public result;
  public request: Request;
  public requestRole;
  public c1;
  public c2;
  public c3;
  public c4;
  public c5;


  dtOptions: DataTables.Settings = {};


  constructor(
    private _userService: UserService,
    private _requetService: RequestService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {

    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    //this.getRequests();

    this.getRoleIdentified();
    this.getResquetsDT();
  }



  getResquetsDT() {

    this.dtOptions = {



      ajax: {
        url: this.url + this.requestRole,
        headers: {
          Authorization: this.token,

        }
      },

      columns: [
        { data: this.c1 },
        { data: this.c2 },
        { data: this.c3 },
        { data: this.c4 },
        { data: this.c5 },


      ],
      columnDefs: [
        {
          targets: 5, //posición de la columna donde estara el boton
          data: null,
          className: "d-flex",
          orderable: false,
          searchable: false,
          defaultContent: "<a class='ml-5 btn ' width='100%'><i class='bt far fa-eye text-dark'></i></a>",
          
        }

      ],

      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        //  jQuery('td', row).unbind('click');
        // jQuery('td', row).bind('click', () => {
        jQuery('.bt', row).unbind('click');
        jQuery('.bt', row).bind('click', () => {

          //console.log(data['id']);
          self.detail(data['id']);
        });
        return row;
      },

      responsive: true,
      language: {
        processing: "Traitement en cours...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Registros del  _START_ al _END_, registros totales: _TOTAL_",
        infoEmpty: "total de registros 0 ",
        infoFiltered: "(filtrado de _MAX_ registros totales)",
        infoPostFix: "",
        loadingRecords: "Cargando registros",
        zeroRecords: "No se encontro el registro",
        emptyTable: "No existen registros que mostrar",
        paginate: {
          first: "Inicio",
          previous: "Anterior",
          next: "Siguiente",
          last: "Final"
        },
        aria: {
          sortAscending: ": activer pour trier la colonne par ordre croissant",
          sortDescending: ": activer pour trier la colonne par ordre décroissant"
        }

      }
    };
  }


  detail(id) {
    this._router.navigate(['detalle-solicitud', id]);
  }


  getRoleIdentified() {

    this.c1 = 'id';
    this.c2 = 'titulo';
    this.c3 = 'estado';
    this.c4 = 'de';
    this.c5 = 'para';

    if (this.identity.role === 'ROLE_SECRETARIA') {

      this.requestRole = 'requerimientos-secretaria';
      this.c4 = 'correo';
      this.c5 = 'detalle';


    } else if (this.identity.role === 'ROLE_DIRECCION') {

      this.requestRole = 'requerimientos-puesto-direccion';


    } else if (this.identity.role === 'ROLE_AREA') {

      this.requestRole = 'requerimientos-puesto-area';

    } else if (this.identity.role === 'ROLE_DEPARTAMENTO') {

      this.requestRole = 'requerimientos-puesto-departamento';

    }
   
  }

  // getRequests(){

  //   this._requetService.getRequests(this.token).subscribe(
  //     response => {

  //       this.requests = response.requerimiento.data;
  //       console.log(this.requests);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );

  // }

}
