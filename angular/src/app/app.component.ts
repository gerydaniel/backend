import { Component, OnInit } from '@angular/core';
import { UsuarioServicio } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioServicio]
})
export class AppComponent implements OnInit {
  title = 'app';
  public identity;
  public token;

  constructor(private _usuarioServicio: UsuarioServicio) {
    this.identity = this._usuarioServicio.getIdentity();
    this.token = this._usuarioServicio.getToken();
  }

  ngOnInit() {
  }
}
