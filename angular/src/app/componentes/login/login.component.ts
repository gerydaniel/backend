import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioServicio } from '../../services/usuario.service';


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
      'correo': '',
      'contrasenia': '',
      'gethash': 'false'
    };
  }

  ngOnInit() {
    console.log(this._usuarioServicio.signup);
  }

  enviarDatos() {
    console.log(this.usuario);

    this._usuarioServicio.signup(this.usuario).subscribe(
      Response => {
        this.identity = Response;
        if (this.identity.length <= 1) {
          console.log('Error en el servidor');
        } else {
          if (!this.identity.status) {
            localStorage.setItem('token', JSON.stringify(this.identity));
          }
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
