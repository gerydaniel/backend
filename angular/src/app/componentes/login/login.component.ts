import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsuarioServicio } from '../../services/usuario.service';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioServicio]
})
export class LoginComponent implements OnInit {

  public titulo: string;
  public usuario;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioServicio: UsuarioServicio
  ) {
    this.titulo = 'registrarse';
    this.usuario = {
      'email': '',
      'password': '',
      'getHash': true
    };
  }

  ngOnInit() {
    this.CerrarSesion();
  }

  CerrarSesion() {
    this._route.params.forEach((params: Params) => {
      const cerrar = +params['id'];
      if (cerrar === 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        window.location.href = '/login';
      }
    });
  }

  enviarDatos() {
    this._usuarioServicio.signup(this.usuario).subscribe(
      respuesta => {
        this.identity = respuesta;
        if (this.identity.length <= 1) {
          console.log('Error en el servidor');
        } else {
          if (!this.identity.status) {
            localStorage.setItem('identity', JSON.stringify(this.identity));
            // Obtener el token
            this.usuario.getHash = false;
            this._usuarioServicio.signup(this.usuario).subscribe(
              respuestaToken => {
                this.token = respuestaToken;
                if (this.identity.length <= 1) {
                  console.log('Error en el servidor');
                } else {
                  if (!this.identity.status) {
                    localStorage.setItem('token', JSON.stringify(this.token));
                  }
                }
              },
              error => {
                console.log('error');
                console.log(<any>error);
              }
            );
          }
        }
      },
      error => {
        console.log('error');
        console.log(<any>error);
      }
    );
  }
}
