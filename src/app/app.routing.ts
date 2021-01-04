// imports necesarios
import { PagesComponent } from './components/pages.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestComponent } from './components/request/request.component';
import { MyRequestsComponent } from './components/my-requests/my-requests.component';
import { UsersComponent } from './components/users/users.component';
import { ViewRequestsComponent } from './components/view-requests/view-requests.component';
import { DetailRequestsComponent } from './components/detail-requests/detail-requests.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './shared/header/header.component';
import { HeaderRequestComponent } from './components/header-request/header-request.component';
import { ViewRequestsDireccionComponent } from './components/view-requests-direccion/view-requests-direccion.component';
import { AggPuestosLaboralesComponent } from './components/agg-puestos-laborales/agg-puestos-laborales.component';
import { UsuariosGeneralesComponent } from './components/usuarios-generales/usuarios-generales.component';
import { PassRecoveryComponent } from './components/pass-recovery/pass-recovery.component';
import { InsertCodeComponent } from './components/insert-code/insert-code.component';

// importar componentes






// definir las rutas
const appRoutes: Routes = [

      {path: '',
      component: PagesComponent,
      children:
            [
                  {path: 'inicio', component: HomeComponent},
                  {path: 'bienvenido', component: WelcomeComponent},

                  {path: 'solicitar', component: RequestComponent},
                  {path: 'mis-requerimientos', component: MyRequestsComponent},

                  {path: 'ver-solicitudes', component: ViewRequestsComponent},
                  {path: 'ver-solicitudes/direccion', component: ViewRequestsDireccionComponent},

                  {path: 'detalle-solicitud', component: DetailRequestsComponent},
                  {path: 'detalle-solicitud/:id', component: DetailRequestsComponent},
                  {path: 'detalle-solicitud/:name', component: DetailRequestsComponent},
                  {path: 'perfil', component: ProfileSettingsComponent},
                  {path: 'perfil/:id', component: ProfileSettingsComponent},

                  {path: 'menu-requerimientos', component: HeaderRequestComponent},

                  // {path: '', redirectTo: '/inicio', pathMatch: 'full'},


                  {path: 'usuarios', component: UsersComponent},
                  {path: 'usuarios-generales', component: UsuariosGeneralesComponent},

                  {path: 'puestos-laborales', component: AggPuestosLaboralesComponent},


            ]
},

      // {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'registro', component: RegisterComponent},
      {path: 'recuperar-contraseña', component: PassRecoveryComponent},
      {path: 'insertar-codigo', component: InsertCodeComponent},
      {path: 'insertar-codigo/:correo', component: InsertCodeComponent},


      {path: '**', component: HomeComponent},


];

// exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);




