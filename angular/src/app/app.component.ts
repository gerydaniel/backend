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

  constructor(private _usuarioServicio: UsuarioServicio) {

  }

  ngOnInit() {
    console.log(this._usuarioServicio.getIdentity);
    console.log(this._usuarioServicio.getToken);
  }
}
