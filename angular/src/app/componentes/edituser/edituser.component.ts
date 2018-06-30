import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioServicio } from '../../services/usuario.service';
import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
  providers: [UsuarioServicio]
})
export class EdituserComponent implements OnInit {

  public usuario: Usuario;
  public status;
  public identity;
  public token;

  constructor(
    private _usuarioServicio: UsuarioServicio,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.identity = this._usuarioServicio.getIdentity();
    this.token = this._usuarioServicio.getToken();
  }

  ngOnInit() {
    this.RedireccionPagina();
  }

  RedireccionPagina() {
    if (this.identity == null) {
      this._router.navigate(['/login']);
    } else {
      this.usuario = new Usuario(
        this.identity.sub,
        'usuario',
        this.identity.name,
        this.identity.surname,
        this.identity.email,
        this.identity.password
      );
      console.log(this.identity);

    }
  }

  ModificarUsuario() {
    this._usuarioServicio.update_user(this.usuario).subscribe(
      respuesta => {
        this.status = respuesta.status;
        if (this.status !== 'succes') {
          this.status = 'error';
        } else {
          this.CerrarSesion();
        }
      },
      error => { console.log(<any>error); }
    );
  }


  CerrarSesion() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.identity = null;
    this.token = null;

    window.location.href = '/login';
  }
}
