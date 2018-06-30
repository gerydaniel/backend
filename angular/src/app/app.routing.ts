import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { DefaultComponent } from './componentes/default/default.component';
import { EdituserComponent } from './componentes/edituser/edituser.component';

const appRoutes: Routes = [
{path: '', component:  DefaultComponent},
{path: 'login', component:  LoginComponent},
{path: 'login/:id', component:  LoginComponent},
{path: 'register', component:  RegisterComponent},
{path: 'app-edituser', component:  EdituserComponent},
{path: '**', component:  LoginComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

