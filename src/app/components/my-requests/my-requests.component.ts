import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RequestService } from '../../services/request.service';
import { Request } from '../../models/request';
import { global } from 'src/app/services/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css'],
  providers: [UserService, RequestService]
})
export class MyRequestsComponent implements OnInit {

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
    private _router: Router,
  ) {

    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {

    this.getRequestDT();

  }

  getRequestDT() {
    this.dtOptions = {

      ajax: {
      
        url: this.url + 'requerimientos-usuario',
        headers: {
          Authorization: this.token,

        }
        
      },
      
      columns: [
        { data: 'id' },
        { data: 'titulo' },
        { data: 'estado' },
        { data: 'detalle' },

      ],
      columnDefs: [
        {
          targets: 4, //posición de la columna donde estara el boton
          data: null,
          className: "d-flex",
          orderable: false,
          searchable: false,
          defaultContent: "<a class='ml-5 btn'><i class='bt far fa-eye text-dark'></i></a>"

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
