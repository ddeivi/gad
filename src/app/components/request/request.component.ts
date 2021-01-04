import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RequestService } from '../../services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from '../../services/global';
import { Request } from '../../models/request';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
  providers: [UserService, RequestService]

})
export class RequestComponent implements OnInit {


  public url;
  public identity;
  public token;
  public request: Request;
  public mensajeBoton;
  public mensaje;

  constructor(
    private _userService: UserService,
    private _requetService: RequestService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.request = new Request(1, '', '', '', 1, 1, '', '', '', '', null, null, null, null);
    this.url = global.url;
    this.mensaje = global.mensaje;




  }


  public afuConfig = {
    multiple: false,
    formatsAllowed: ".pdf, .rar, .zip, .docx, .xlsx",
    maxSize: "8",
    uploadAPI: {
      url: global.url + 'subir-archivo',
      headers: {
        "Authorization": this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,

    replaceTexts: {
      selectFileBtn: 'Seleccion de archivo',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      attachPinBtn: 'Selecciona archivo',
      afterUploadMsg_success: 'Carga exitosa',
      afterUploadMsg_error: 'Carga fallida'

    }
  };


  ngOnInit(): void {
  }

  onSubmit(form) {

    this._requetService.request(this.request, this.token).subscribe(
      response => {

        if (response && response.requerimiento) {

          this.success();
          form.reset();
          this.request.archivo = null;


        } else {

          this.error();
        }

      },
      error => {
        this.error();


      }
    );


  }
  Upload(datos) {
    this.request.archivo = datos.body.archivo;
    this.alertArchivo();


  }


  success() {
    Swal.fire({
      icon: 'success',
      title: 'Proceso éxitoso',
      text: 'Pronto será atendida su solicitud ',
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



}

