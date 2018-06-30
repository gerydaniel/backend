import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { routing, appRoutingProviders } from './app.routing';


import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { DefaultComponent } from './componentes/default/default.component';
import { EdituserComponent } from './componentes/edituser/edituser.component';
import { NewtaskComponent } from './componentes/newtask/newtask.component';
import { EdittaskComponent } from './componentes/edittask/edittask.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    EdituserComponent,
    NewtaskComponent,
    EdittaskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
