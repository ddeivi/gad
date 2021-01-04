import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { PerfilService } from '../../services/perfil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-usuarios-generales',
  templateUrl: './usuarios-generales.component.html',
  styleUrls: ['./usuarios-generales.component.css'],
  providers: [UserService]

})
export class UsuariosGeneralesComponent implements OnInit {
  public users: User;
  public token;
  public identity;
  public url;
  dtOptions: DataTables.Settings = {};

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = global.url;

  }
  ngOnInit(): void {
    this.tablaUsuario();
  }

  tablaUsuario(){

    this.dtOptions = {
  
      ajax: {
        url: this.url + 'mostrar-usuarios-ciudadanos',
        headers: {
          Authorization: this.token,
  
        }
      },
  
      columns: [
        { data: 'id' },
        { data: 'cedula' }, 
        { data: 'nombre' },
        { data: 'apellido' },
        { data: 'telefono' },
        { data: 'correo' },
        { data: 'tipo' },
  
       ],
      columnDefs: [
        {
          targets: 7, //posición de la columna donde estara el boton
          data: null,
          className: "d-flex",
          orderable: false,
          searchable: false,
  
          defaultContent: "<button type='button' class=' bt m-auto btn btn-info' data-toggle='modal' data-target='#modalEditar'><i class='fas fa-edit'></i></button>"
  
  
        }
  
      ],
  
      // rowCallback: (row: Node, data: any[] | Object, index: number) => {
      //   const self = this;
      //   jQuery('.bt', row).unbind('click');
      //   jQuery('.bt', row).bind('click', () => {
  
      //     var id = data['id'];
      //     this.obtenerIdUsuario(id);
  
  
      //   });
  
      //   return row;
      // },
  
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
}
