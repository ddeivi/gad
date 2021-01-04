import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RequestService } from '../../services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-view-requests-direccion',
  templateUrl: './view-requests-direccion.component.html',
  styleUrls: ['./view-requests-direccion.component.css'],
  providers: [UserService, RequestService]

})
export class ViewRequestsDireccionComponent implements OnInit {
  public identity;
  public token;
  public requests: Request;
  public url;
  public id;
  public integer;
  public result;
  public request: Request;

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
    //this.getMyRequests();
    this.getRequestDT();
  }

  getRequestDT() {
    this.dtOptions = {



      ajax: {
        url: this.url + 'requerimiento-puesto-direccion',
        headers: {
          Authorization: this.token,

        }
      },

      columns: [
        { data: 'id' },
        { data: 'titulo' },
        { data: 'detalle' }

      ],
      columnDefs: [
        {
          targets: 3, //posición de la columna donde estara el boton
          data: null,
          className: "d-flex",
          orderable: false,
          searchable: false,
          defaultContent: "<a class='ml-5 btn'><i class='bt fas fa-eye'></i></a>"

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

}
