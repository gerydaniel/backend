import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';

const appRoutes: Routes = [
{path: '', component:  LoginComponent},
{path: 'login', component:  LoginComponent},
{path: 'register', component:  RegisterComponent},
{path: '**', component:  LoginComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
