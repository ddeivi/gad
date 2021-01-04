import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { global } from 'src/app/services/global';
import { PuestoLaboralService } from '../../services/puestoLaboral.service';
import { PuestoLaboral } from 'src/app/models/puestoLaboral';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from '../../models/dataTable';






@Component({
  selector: 'app-agg-puestos-laborales',
  templateUrl: './agg-puestos-laborales.component.html',
  styleUrls: ['./agg-puestos-laborales.component.css'],
  providers: [UserService, PuestoLaboralService]
})
export class AggPuestosLaboralesComponent implements OnInit {

  public identity;
  public token;
  public url;
  public mensaje;
  public mensajeBoton;


  public niveles;

  public puestoLaboral: PuestoLaboral;

  public dtOptions: DataTables.Settings = {};

  public puestos: PuestoLaboral[];




  constructor(
    private _userService: UserService,
    private _puestoLaboralService: PuestoLaboralService,
    private http: HttpClient
  ) {
    this.token = _userService.getToken();
    this.identity = _userService.getIdentity();
    this.url = global.url;
    this.mensaje = global.mensaje;

    this.puestoLaboral = new PuestoLaboral(1, null, null, null);
    this.mensajeBoton = 'Guardar';

  }

  ngOnInit(): void {

    this.tablaPuestos();
    this.getNiveles();


  }


  onSubmit(form) {

    if (this.mensajeBoton === 'Guardar') {



      this._puestoLaboralService.registrar(this.token, this.puestoLaboral).subscribe(
        response => {
          this.success();


          // this.recargarTabla();

          setTimeout(() => {
            window.location.reload();

          }, 900);


        },

        error => {
          this.error();

        }
      )
    } else {
      this.actualizar();
    }

  }


  tablaPuestos() {
    // const that = this;


    this.dtOptions = {

      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post<DataTablesResponse>(
            this.url + 'obtener-puestos',
            dataTablesParameters, {}
          ).subscribe(resp => {
            this.puestos = resp.data;

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


      columns: [
        { data: 'id' },
        { data: 'nombre' },
        { data: 'detalle' },
        { data: 'nivel.nivel' },

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

  getNiveles() {

    this._puestoLaboralService.getNiveles(this.token).subscribe(
      response => {

        this.niveles = response.niveles;


      },
      error => {


      });


  }


  obtenerPuestoActualizar(puesto, id) {

    localStorage.setItem('idPuesto', id);


    this.puestoLaboral.nombre = puesto.nombre;
    this.puestoLaboral.detalle = puesto.detalle;
    this.puestoLaboral.id_nivel = puesto.id_nivel;

    this.mensajeBoton = 'Editar';
    window.scroll(0, 0);



  }


  actualizar() {
    let idPuesto = localStorage.getItem('idPuesto');
    this._puestoLaboralService.editar(this.token, this.puestoLaboral, idPuesto).subscribe(
      response => {
        this.success();

        setTimeout(() => {
          window.location.reload();

        }, 900);

      },
      error => {
      }
    )



  }

  cancelar(){

    this.puestoLaboral.nombre = null;
    this.puestoLaboral.detalle = null;
    this.puestoLaboral.id_nivel = null;

    this.mensajeBoton = 'Guardar';


  }

  eliminar(idPuesto){
    this._puestoLaboralService.eliminar(this.token, idPuesto).subscribe(
      response => {
        this.success();

        setTimeout(() => {
          window.location.reload();

        }, 900);
      },
      error => {
        this.errorRelacion();

      }
    )
  }



alertEliminar(id){
  Swal.fire({
    title: '¿Eliminar este registro?',
    text: 'No se podrá recuperar una vez eliminado',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.eliminar(id);
    }
  })
}




  success() {
    Swal.fire({
      icon: 'success',
      title: 'Proceso éxitoso',
      timer: 900,
      showConfirmButton: false,
    });
  }

  error() {
    Swal.fire({
      icon: 'error',
      title: 'Proceso fallido',
      text: 'Asegurese de llenar toda la información',
      showConfirmButton: true
    });
  }

  errorRelacion() {
    Swal.fire({
      icon: 'error',
      title: 'Proceso fallido',
      text: 'Este puesto esta en uso activo',
      showConfirmButton: true
    });
  }

}
