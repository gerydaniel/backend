import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioServicio } from '../../services//usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public titulo: string;
  public usuario: Usuario;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioServicio: UsuarioServicio
  ) {
    this.titulo = 'Registro Usuario';
    this.usuario = new Usuario(1, 'usuario', '', '', '', '');
  }

  ngOnInit() {
  }

  CrearUsuario() {
    console.log(this.usuario);
    this._usuarioServicio.register(this.usuario).subscribe(
      respuesta => {
        this.status = respuesta.status;
        if (this.status !== 'succes') {
          this.status = 'error';
        } else {
          this.usuario = new Usuario(1, 'usuario', '', '', '', '');
        }

      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
