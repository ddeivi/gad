import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders  } from './app.routing';
import { FormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { MomentModule } from 'angular2-moment';
import { NgSelectModule } from '@ng-select/ng-select';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RequestComponent } from './components/request/request.component';
import { MyRequestsComponent } from './components/my-requests/my-requests.component';
import { ViewRequestsComponent } from './components/view-requests/view-requests.component';
import { UsersComponent } from './components/users/users.component';
import { DetailRequestsComponent } from './components/detail-requests/detail-requests.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { PagesComponent } from './components/pages.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { HeaderRequestComponent } from './components/header-request/header-request.component';
import { ViewRequestsDireccionComponent } from './components/view-requests-direccion/view-requests-direccion.component';
import { AggPuestosLaboralesComponent } from './components/agg-puestos-laborales/agg-puestos-laborales.component';
import { UsuariosGeneralesComponent } from './components/usuarios-generales/usuarios-generales.component';
import { PassRecoveryComponent } from './components/pass-recovery/pass-recovery.component';
import { InsertCodeComponent } from './components/insert-code/insert-code.component';

// inicio sesion con fb y google
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { environment } from '../environments/environment';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RequestComponent,
    MyRequestsComponent,
    ViewRequestsComponent,
    UsersComponent,
    DetailRequestsComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    PagesComponent,
    WelcomeComponent,
    ProfileSettingsComponent,
    HeaderRequestComponent,
    ViewRequestsDireccionComponent,
    AggPuestosLaboralesComponent,
    UsuariosGeneralesComponent,
    PassRecoveryComponent,
    InsertCodeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    MomentModule,
    NgSelectModule,
    SocialLoginModule
  ],
  providers: [
    appRoutingProviders,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
           // provider: new GoogleLoginProvider(environment.client_google)
           provider: new GoogleLoginProvider('1070597364286-9a8sd9dhj3t6aodj0lf58rtrrs3l8sga.apps.googleusercontent.com')

          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
          //  provider: new FacebookLoginProvider(environment.client_fb)
            provider: new FacebookLoginProvider('383270116133569')

          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
