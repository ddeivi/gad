import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PerfilService } from '../../services/perfil.service';
import { Perfil } from '../../models/perfil';
import { Rol } from '../../models/rol';
import { PuestoLaboral } from '../../models/puestoLaboral';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from '../../models/dataTable';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService, PerfilService]
})
export class UsersComponent implements OnInit {
  public users: User;
  public usuarios: User[];
  public token;
  public identity;
  public url;

  public perfil: Perfil;

  public roles: Rol;
  public puestos: PuestoLaboral;



  dtOptions: DataTables.Settings = {};

  constructor(
    private _userService: UserService,
    private _perfilService: PerfilService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private http: HttpClient

  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = global.url;

    this.perfil = new Perfil(1, null, null);

    // this.roles = new Rol(1, null);

  }

  ngOnInit(): void {
    this.getPerfil();


    // this.getUsers();

    this.tablaUsuario();



  }
  tablaUsuario() {
    // const that = this;



    this.dtOptions = {

      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post<DataTablesResponse>(
            this.url + 'mostrar-usuarios',
            dataTablesParameters, {}
          ).subscribe(resp => {
            this.usuarios = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [


              ]
            });
          });

      },

      pageLength: 10,
      serverSide: true,
      processing: true,
      responsive: true,


      columns: [
        { data: 'cedula' },
        { data: 'nombre' },
        { data: 'apellido' },
        { data: 'correo' },
        { data: 'tipo' },
        { data: 'detalle' },
      ],
      language: {
        processing: "Traitement en cours...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Registros del  _START_ al _END_, registros totales: _TOTAL_",
        infoEmpty: "total de registros 0 ",
        infoFiltered: "(filtrado de _MAX_ registros totales)",
        infoPostFix: "",
        loadingRecords: "Cargando registros",
        zeroRecords: "",
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


  getPerfil() {
    this.getRoles();
    this.getPuesto();
  }


  getRoles() {

    this._perfilService.getRoles(this.token).subscribe(
      response => {
        this.roles = response.roles;

      },
      error => {

      });

  }


  getPuesto() {
    this._perfilService.getPuestos(this.token).subscribe(
      response => {
        this.puestos = response.puestos;

      },
      error => {

      });

  }


  recuperarId(id) {

   localStorage.setItem('idUsuario', id);
  }


  updatePerfil() {

    let idUsuario = localStorage.getItem('idUsuario');


    this._perfilService.updatePerfil(this.token, idUsuario, this.perfil).subscribe(
      response => {
        this.success();
        setTimeout(() => {
          window.location.reload();

        }, 900);

      },
      error => {
        this.error();

      });
  }


  desactivar(idUsuario){

    this._userService.desactivarCuenta(idUsuario, this.token).subscribe(
      response => {
        this.success();

        setTimeout(() => {
          window.location.reload();

        }, 900);
      },
      error => {
        this.error();

      }
    )
  }

  activar(idUsuario){

    this._userService.activarCuenta(idUsuario, this.token).subscribe(
      response => {
        this.success();

        setTimeout(() => {
          window.location.reload();

        }, 900);
      },
      error => {
        this.error();

      }
    )
  }

  alertActivar(id){
    Swal.fire({
      title: '¿Habilitar esta cuenta?',
      text: 'El usuario podrá  volver a iniciar sesión',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.activar(id);
      }
    })
  }



  alertDesactivar(id){
    Swal.fire({
      title: '¿Deshabilitar esta cuenta?',
      text: 'El usuario no podrá iniciar sesión hasta ser habilitada nuevamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.desactivar(id);
      }
    })
  }


  success() {
    Swal.fire({
      icon: 'success',
      title: 'Proceso éxitoso',
      showConfirmButton: false,
      timer: 900
    });
  }

  error() {
    Swal.fire({
      icon: 'error',
      title: 'No se pudo procesar su información',
      showConfirmButton: false
    });
  }

  errorRelacion() {
    Swal.fire({
      icon: 'error',
      title: 'Proceso fallido',
      text: 'No puede eliminar a este usuario',
      showConfirmButton: true
    });
  }

}
