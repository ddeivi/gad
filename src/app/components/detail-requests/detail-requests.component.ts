import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RequestService } from '../../services/request.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Request } from 'src/app/models/request';
import { global } from 'src/app/services/global';
import { DireccionService } from '../../services/direccion.service';
import { PuestoLaboral } from '../../models/puestoLaboral';
import { AtencionSecretaria } from '../../models/atencionSecretaria';
import { AtencionSecretariaService } from '../../services/atencionSecretaria.service';
import { AreaService } from '../../services/area.service';
import { DepartamentoService } from '../../services/departamento.service';
import { AtencionDireccionService } from '../../services/atencionDireccion.service';
import { AtencionDireccion } from '../../models/atencionDireccion';
import { AtencionAreaService } from '../../services/atencionArea.service';
import { AtencionArea } from '../../models/atencionArea';
import { RespuestaDepartamentoService } from '../../services/respuestaDepartamento.service';
import { RespuestaDepartamento } from '../../models/respuestaDepartamento';
import { RespuestaArea } from '../../models/respuestaArea';
import { RespuestaAreaService } from '../../services/respuestaArea.service';
import { RespuestaDireccionService } from '../../services/respuestaDirreccion.service';
import { RespuestaDireccion } from '../../models/respuestaDireccion';
import { RespuestaSecretariaService } from '../../services/respuestaSecretaria.service';
import { RespuestaSecretaria } from '../../models/respuestaSecretaria';
import Swal from 'sweetalert2';
import { Historial } from '../../models/historial';
import * as moment from 'moment';

@Component({
  selector: 'app-detail-requests',
  templateUrl: './detail-requests.component.html',
  styleUrls: ['./detail-requests.component.css'],
  providers: [
    UserService,
    RequestService,
    DireccionService,
    AreaService,
    DepartamentoService,
    AtencionSecretariaService,
    AtencionDireccionService,
    AtencionAreaService,
    RespuestaDepartamentoService,
    RespuestaAreaService,
    RespuestaDireccionService,
    RespuestaSecretariaService]
})
export class DetailRequestsComponent implements OnInit {


  public url;
  public identity;
  public token;

  public request: Request;
  public puestosLaborales;
  public historial: Historial[];

  public atencionSecretaria: AtencionSecretaria;
  public atencionDireccion: AtencionDireccion;
  public atencionArea: AtencionArea;

  public respuestaDepartamento: RespuestaDepartamento;
  public respuestaArea: RespuestaArea;
  public respuestaDireccion: RespuestaDireccion;
  public respuestaSecretaria: RespuestaSecretaria;

  public respDir;
  public respArea;
  public respDepa;
  public respSecre;

  public mensajeBoton;
  public mensajeDetalleSolicitud;
  public mensajeResponder;
  public mensajeMemo;

  public afuConfig;
  public afuConfigRespuesta;

  public urlMemo;

  public dFecha;



  constructor(
    private _userService: UserService,
    private _requetService: RequestService,
    private _direccionService: DireccionService,
    private _areaService: AreaService,
    private _departamentoService: DepartamentoService,
    private _atencionSecretariaService: AtencionSecretariaService,
    private _atencionDireccionService: AtencionDireccionService,
    private _atencionAreaService: AtencionAreaService,
    private _respuestaDepartamentoService: RespuestaDepartamentoService,
    private _respuestaAreaService: RespuestaAreaService,
    private _respuestaDireccionService: RespuestaDireccionService,
    private _respuestaSecretariaService: RespuestaSecretariaService,
    private _router: Router,
    private _activateRoute: ActivatedRoute


  ) {

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.request = new Request(1, '', '', '', 1, 1, '', '', '', '', null, null, null, null);
    this.atencionSecretaria = new AtencionSecretaria(1, null, null, null, null);
    this.atencionDireccion = new AtencionDireccion(null, null, null, null, 1, null);
    this.atencionArea = new AtencionArea(1, null, null, null, null, null);
    this.respuestaDepartamento = new RespuestaDepartamento(null, null, null, null, null, null, null, null);
    this.respuestaArea = new RespuestaArea(null, null, null, null, null, null, null, null);
    this.respuestaDireccion = new RespuestaDireccion(null, null, null, null, null, null, null, null);
    this.respuestaSecretaria = new RespuestaSecretaria(null, null, null, null, null, null, null, null);


    this.url = global.url;



  }



  ngOnInit(): void {

    // // detalle de requerimiento
    this.getDetailRequest();

    // // solicitudes
    // this.getAtencion();

    // // respuestas de departamentos, areas y direcciones
    // this.getRespuestas();

    // // puestos laborales direccion, areas y departamentos
    // this.getPuestosLaborales();

    // // subir memos
    // this.subirMemo();

    // // subir respuestas
    // this.subirRespuesta();

  }

 



  // subir memo
  subirMemo() {

    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".pdf, .rar, .zip, .docx, .xlsx",
      maxSize: "8",
      uploadAPI: {
        url: this.url + this.urlMemo,
        headers: {
          "Authorization": this.token
        }
      },
      theme: "attachPin",
      hideProgressBar: true,
      hideResetBtn: true,
      hideSelectBtn: false,

      replaceTexts: {
        selectFileBtn: 'Seleccion de archivo',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Memorandum',
        afterUploadMsg_success: 'Carga exitosa',
        afterUploadMsg_error: 'Carga fallida'

      }
    };


  }

  // subir respuesta
  subirRespuesta() {

    this.afuConfigRespuesta = {
      multiple: false,
      formatsAllowed: ".pdf, .rar, .zip, .docx, .xlsx",
      maxSize: "8",
      uploadAPI: {
        url: this.url + 'subir-respuesta',
        headers: {
          "Authorization": this.token
        }
      },
      theme: "attachPin",
      hideProgressBar: true,
      hideResetBtn: true,
      hideSelectBtn: false,

      replaceTexts: {
        selectFileBtn: 'Seleccion de archivo',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Añadir archivos',
        afterUploadMsg_success: 'Carga exitosa',
        afterUploadMsg_error: 'Carga fallida'

      }
    };


  }

  /*
  ===========================================================
  OBTENER DETALLE DEL REQUERIMIENTO
  ===========================================================
  */


  getDetailRequest() {

    this._activateRoute.params.subscribe(async params => {
      let id = +params['id'];

      await this._requetService.getRequestById(id, this.token).subscribe(
        response => {

          this.request = response.requerimiento;

          // solicitudes
          this.getAtencion();

          // respuestas de departamentos, areas y direcciones
          this.getRespuestas();

          // puestos laborales direccion, areas y departamentos
          this.getPuestosLaborales();

          // subir memos
          this.subirMemo();

          // subir respuestas
          this.subirRespuesta();


        },
        error => {
          console.log(error);
        }
      );
    });

  }

  /*
 ===========================================================
 OBTENER PUESTOS LABORALES PARA SELECT OPTION
 ===========================================================
 */


  // obtener direcciones para secretaria
  async getDirecciones() {
    await this._direccionService.getDirecciones(this.token).subscribe(
      response => {
        this.puestosLaborales = response.direcciones;
        // console.log(this.puestosLaborales);

      },
      error => {
        console.log(error);

      });
  }


  // obtener area para direcciones

  async getAreas() {
    await this._areaService.getAreas(this.token).subscribe(
      response => {
        this.puestosLaborales = response.areas;
        // console.log(this.puestosLaborales);

      },
      error => {
        console.log(error);

      });
  }


  // obtener departamentos para area

  async getDepartamentos() {
    await this._departamentoService.getDepartamentos(this.token).subscribe(
      response => {
        this.puestosLaborales = response.departamentos;
        // console.log(this.puestosLaborales);

      },
      error => {
        console.log(error);

      });
  }


  // obtener puestos laborales
  getPuestosLaborales() {

    if (this.identity.role === 'ROLE_SECRETARIA') {
      this.urlMemo = 'subir-memo-secretaria';
      this.mensajeDetalleSolicitud = 'Dirección';
      this.mensajeResponder = 'Usuario';
      this.getDirecciones();

    } else if (this.identity.role === 'ROLE_DIRECCION') {
      this.urlMemo = 'subir-memo-direccion';
      this.mensajeDetalleSolicitud = 'Área';
      this.mensajeResponder = 'Secretaria';
      this.getAreas();

    } else if (this.identity.role === 'ROLE_AREA') {
      this.urlMemo = 'subir-memo-area';
      this.mensajeDetalleSolicitud = 'Departamento';
      this.mensajeResponder = 'Dirección';
      this.getDepartamentos();

    } else if (this.identity.role === 'ROLE_DEPARTAMENTO') {
      this.mensajeResponder = 'Área';

    }


  }


  /*
  ===========================================================
  OBTENER SOLICITUDES
  ===========================================================
  */


  // obtener solicitud de secretaria para direccion
  async getAtencionSecretaria(idRequerimiento) {

    await this._atencionSecretariaService.obtenerAtencionSecretaria(this.token, idRequerimiento).subscribe(
      response => {

        response['atencionSecretaria'].forEach(atencionSecretaria => {
          this.atencionSecretaria = atencionSecretaria;
        },
          error => {
            console.log(error);
          });

      });

  }


  // obtener solicitud de direccion para area
  async getAtencionDireccion(idRequerimiento) {

    await this._atencionDireccionService.obtenerAtencionDireccion(this.token, idRequerimiento).subscribe(
      response => {

        response['atencionDireccion'].forEach(atencionDireccion => {
          this.atencionDireccion = atencionDireccion;

        });

      },
      error => {
        console.log(error);
      });

  }



  // obtener solicitud de area para departamento
  async getAtencionArea(idRequerimiento) {

    await this._atencionAreaService.obtenerAtencionArea(this.token, idRequerimiento).subscribe(
      response => {

        response['atencionArea'].forEach(atencionArea => {
          this.atencionArea = atencionArea;
        });

      },
      error => {
        console.log(error);
      });

  }

  // obtener solicitudes

  async getAtencion() {

    await this._activateRoute.params.subscribe(params => {
      let id_requerimiento = +params['id'];

      if (this.identity.role === 'ROLE_DIRECCION') {
        this.getAtencionSecretaria(id_requerimiento);

      } else if (this.identity.role === 'ROLE_AREA') {
        this.getAtencionDireccion(id_requerimiento);

      } else if (this.identity.role === 'ROLE_DEPARTAMENTO') {
        this.getAtencionArea(id_requerimiento);

      }
    });


  }


  /*
   ===========================================================
   ASIGNAR SOLICITUDES
   ===========================================================
   */



  // asignar de secretaria a direccion
  setDireccion() {
    this.atencionSecretaria.id_requerimiento = this.request.id;
    this._atencionSecretariaService.atenderRequerimiento(this.token, this.atencionSecretaria).subscribe(
      response => {
        if (response) {
          this.success();
          this._router.navigate(['ver-solicitudes']);

        } else {
          this.error();
        }

      },
      error => {
        this.error();


      });
  }

  // asignar de direccion a area
  setArea() {
    this.atencionDireccion.id_requerimiento = this.request.id;
    this._atencionDireccionService.atenderRequerimiento(this.token, this.atencionDireccion).subscribe(
      response => {

        if (response) {
          this.success();
          this._router.navigate(['ver-solicitudes']);

        } else {
          this.error();

        }
      },
      error => {
        this.error();


      });
  }

  // asignar de area a departamento
  setDepartamento() {
    this.atencionArea.id_requerimiento = this.request.id;
    this._atencionAreaService.atenderRequerimiento(this.token, this.atencionArea).subscribe(
      response => {
        if (response) {

          this.success();
          this._router.navigate(['ver-solicitudes']);
        } else {
          this.error();

        }
      },
      error => {
        this.error();

      });
  }

  // asignar

  onSubmit(form) {

    if (this.identity.role === 'ROLE_SECRETARIA') {
      this.setDireccion();
      // alert("enviado a direccion")

    } else if (this.identity.role === 'ROLE_DIRECCION') {
      this.setArea();
      // alert("enviado a area")


    } else if (this.identity.role === 'ROLE_AREA') {
      this.setDepartamento();
      // alert("enviado a area")

    } else if (this.identity.role === 'ROLE_DEPARTAMENTO') {

    }


  }


  /*
  ===========================================================
  RESPONDER SOLICITUDES
  ===========================================================
  */


  // RESPUESTA DEPARTAMENTO HACIA AREA

  setRespuestaDepartamento(idRequerimiento) {
    this._respuestaDepartamentoService.responderRequerimiento(this.token, this.respuestaDepartamento, idRequerimiento, this.atencionArea.id).subscribe(
      response => {
        this._router.navigate(['ver-solicitudes']);
        this.success();


      },
      error => {
        this.error();

      });



  }


  // RESPUESTA AREA HACIA DIRECCION

  setRespuestaArea(idRequerimiento) {

    this._respuestaAreaService.responderRequerimiento(this.token, this.respuestaArea, idRequerimiento, this.atencionDireccion.id).subscribe(
      response => {
        this._router.navigate(['ver-solicitudes']);
        this.success();


      },
      error => {
        this.error();

      });


  }

  // RESPUESTA DIRECCION HACIA SECRETARIA

  setRespuestaDireccion(idRequerimiento) {

    this._respuestaDireccionService.responderRequerimiento(this.token, this.respuestaDireccion, idRequerimiento).subscribe(
      response => {
        this.success();
        this._router.navigate(['ver-solicitudes']);

      },
      error => {
        this.error();


      });

  }

  // RESPUESTA SECRETARIA HACIA USUARIO

  setRespuestaScretaria(idRequerimiento) {
    this._respuestaSecretariaService.responderRequerimiento(this.token, this.respuestaSecretaria, idRequerimiento).subscribe(
      response => {

        this._router.navigate(['ver-solicitudes']);
        this.success();


      },
      error => {
        this.error();
      });



  }



  // responder

  responder(form) {

    this._activateRoute.params.subscribe(params => {
      let idRequerimiento = +params['id'];

      if (this.identity.role === 'ROLE_SECRETARIA') {
        this.respuestaSecretaria.titulo = this.request.titulo;
        this.setRespuestaScretaria(idRequerimiento);

        // alert("enviado a usuario")

      } else if (this.identity.role === 'ROLE_DIRECCION') {
        this.respuestaDireccion.titulo = this.request.titulo;
        this.setRespuestaDireccion(idRequerimiento);
        // alert("enviado a secretaria")


      } else if (this.identity.role === 'ROLE_AREA') {
        this.respuestaArea.titulo = this.request.titulo;
        this.setRespuestaArea(idRequerimiento);
        // alert("enviado a direccion")


      } else if (this.identity.role === 'ROLE_DEPARTAMENTO') {
        this.respuestaDepartamento.titulo = this.request.titulo;
        this.setRespuestaDepartamento(idRequerimiento);
        // alert("enviado a area")

      }

    });


  }


  /*
  ===========================================================
  OBTENER RESPUESTAS
  ===========================================================
  */

  // respuesta de departamento

  async getRespuestaDepartamento(idResDepa) {
    await this._respuestaDepartamentoService.obtenerRespuestaDepartamento(this.token, idResDepa).subscribe(
      response => {
        // response['res_requerimiento'].forEach(resDepartamento => {

        this.respDepa = response['res_requerimiento'];
        console.log(this.respDepa);

        // });

      },
      error => {
        console.log(error);
      });

  }


  // respuesta de area

  async getRespuestaArea(idResDepa) {
    await this._respuestaAreaService.obtenerRespuestaArea(this.token, idResDepa).subscribe(
      response => {
        // response['res_requerimiento'].forEach(resArea => {

        this.respArea = response['res_requerimiento'];
        console.log(response);
      },
      error => {
        console.log(error);
      });

    // });
  }


  // respuesta de direccion

  async getRespuestaDireccion(idResDepa) {
    await this._respuestaDireccionService.obtenerRespuestaDireccion(this.token, idResDepa).subscribe(
      response => {

        this.respDir = response['res_requerimiento'];

      },
      error => {
        console.log(error);

      });
  }

  // respuesta de secretaria
  async getRespuestaSecretaria(idResDepa) {
    await this._respuestaSecretariaService.obtenerRespuestaSecretaria(this.token, idResDepa).subscribe(
      response => {

        this.respSecre = response['res_requerimiento'];

        // console.log(this.respuestaSecretaria);

      },
      error => {
        console.log(error);

      });
  }


  // obtener respuestas

  async getRespuestas() {

    await this._activateRoute.params.subscribe(params => {
      let idResDepa = +params['id'];


      if (this.identity.role === 'ROLE_AREA') {
        this.getRespuestaDepartamento(idResDepa);

      } else if (this.identity.role === 'ROLE_DIRECCION') {

        this.getRespuestaArea(idResDepa);

      } else if (this.identity.role === 'ROLE_SECRETARIA') {

        this.getRespuestaDireccion(idResDepa);

      } else if (this.identity.role === 'ROLE_USER') {
        this.getRespuestaSecretaria(idResDepa);
      }
    });

  }


  /*
 ===========================================================
 REENVIAR RESPUESTA
 ===========================================================
 */

  reenviar(idRespuesta) {
    this._activateRoute.params.subscribe(params => {
      let idRequerimiento = +params['id'];

      if (this.identity.role === 'ROLE_AREA') {

        this.respDepa.forEach(respuestaDepartamento => {

          if (idRespuesta === respuestaDepartamento.id) {

            this.respuestaArea.titulo = respuestaDepartamento.titulo;
            this.respuestaArea.descripcion = respuestaDepartamento.descripcion;
            this.respuestaArea.archivo = respuestaDepartamento.archivo;

            this.setRespuestaArea(idRequerimiento);
            console.log('se encontro');


          } else {

          }


        });


      } else if (this.identity.role === 'ROLE_DIRECCION') {

        this.respArea.forEach(respuestaArea => {

          if (idRespuesta === respuestaArea.id) {

            this.respuestaDireccion.titulo = respuestaArea.titulo;
            this.respuestaDireccion.descripcion = respuestaArea.descripcion;
            this.respuestaDireccion.archivo = respuestaArea.archivo;

            this.setRespuestaDireccion(idRequerimiento);

          } else {

          }


        });


      } else if (this.identity.role === 'ROLE_SECRETARIA') {

        this.respDir.forEach(respuestaDireccion => {

          if (idRespuesta === respuestaDireccion.id) {

            this.respuestaSecretaria.titulo = respuestaDireccion.titulo;
            this.respuestaSecretaria.descripcion = respuestaDireccion.descripcion;
            this.respuestaSecretaria.archivo = respuestaDireccion.archivo;


            this.setRespuestaScretaria(idRequerimiento);
          } else {

          }
        });



      }


    });
  }


  


  // historial 
  getHistorial() {

    this._activateRoute.params.subscribe(params => {
      let idRequerimiento = +params['id'];
      this._requetService.historial(idRequerimiento, this.token).subscribe(

        response => {

          this.historial = response.historial;

         


        },

        error => {

        }
      )

    });
  }




  // subir respuesta
  UploadRespuesta(datos) {

    if (this.identity.role === 'ROLE_DEPARTAMENTO') {
      this.respuestaDepartamento.archivo = datos.body.archivo;
      this.alertArchivo();


    } else if (this.identity.role === 'ROLE_AREA') {
      this.respuestaArea.archivo = datos.body.archivo;
      this.alertArchivo();


    } else if (this.identity.role === 'ROLE_DIRECCION') {
      this.respuestaDireccion.archivo = datos.body.archivo;
      this.alertArchivo();


    } else if (this.identity.role === 'ROLE_SECRETARIA') {
      this.respuestaSecretaria.archivo = datos.body.archivo;
      this.alertArchivo();


    }

  }


  // subir memo
  UploadMemo(datos) {

    // if (datos) {

    if (this.identity.role === 'ROLE_SECRETARIA') {

      this.atencionSecretaria.memo = datos.body.archivo;
      this.alertArchivo();

    } else if (this.identity.role === 'ROLE_DIRECCION') {
      this.atencionDireccion.memo = datos.body.archivo;
      this.alertArchivo();

    } else if (this.identity.role === 'ROLE_AREA') {
      this.atencionArea.memo = datos.body.archivo;
      this.alertArchivo();

    }

    // } else {

    //   this.alertArchivoError();


    // }

  }



  success() {
    Swal.fire({
      icon: 'success',
      title: 'Proceso éxitoso',
      showConfirmButton: true,
    });
  }

  error() {
    Swal.fire({
      icon: 'error',
      title: 'Proceso fallido',
      text: 'Asegurese de llenar toda la información y adjuntar archivos',
      showConfirmButton: true
    });
  }

  alertArchivo() {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Archivo listo',
      background: '#E5E9E8',


    });
  }

  alertArchivoError() {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'error',
      title: 'Su archivo no se proceso',
      background: '#E5E9E8',


    });
  }



}
