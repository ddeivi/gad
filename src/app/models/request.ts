
export class Request {
    constructor(

        public id: number,
        public titulo: string,
        public descripcion: string,
        public archivo: string,
        public id_proceso: number,
        public id_usuario: number,
        public estado: any,
        public proceso: any,
        public lugar: any,
        public atencionArea: string,
        public atencionDireccion: string,
        public atencionSecretaria: string,
        public respDepartamento: string,
        public fecha_solicitud: string,


    ) {

    }

}