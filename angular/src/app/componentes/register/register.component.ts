import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public titulo: string;
  public usuario: Usuario;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.titulo = 'Registro Usuario';
    this.usuario = new Usuario(1, 'usuario', '', '', '', '');
  }

  ngOnInit() {
  }

}
