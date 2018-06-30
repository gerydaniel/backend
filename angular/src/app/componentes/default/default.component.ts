import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TareaServicio } from '../../services/tarea.service';
import { UsuarioServicio } from '../../services/usuario.service';
import { Tarea } from '../../modelos/tarea';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers: [UsuarioServicio, TareaServicio]
})
export class DefaultComponent implements OnInit {

  public token;
  public identity;
  public tareas: Array<Tarea>;
  public status;
  public ListaEstados: any;
  public paginas;
  public paginaPrev;
  public paginaNext;
  public loading;

  constructor(
    private _tareaServicio: TareaServicio,
    private _usuarioServicio: UsuarioServicio,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.identity = this._usuarioServicio.getIdentity();
    this.token = this._usuarioServicio.getToken();
  }

  ngOnInit() {
    this.ObtenerTareas();
  }

  ObtenerTareas() {
    this.loading = 'show';
    this._route.params.forEach((params: Params) => {
      let pagina = +params['page'];

      if (!pagina) {
        pagina = 1;
      }

      this._tareaServicio.getTasks(this.token, pagina).subscribe(
        respuesta => {
          if (respuesta.status === 'success') {
            this.loading = 'hidden';
            this.tareas = respuesta.data;
            // Total de paginas
            this.paginas = [];
            for (let i = 1; i <= respuesta.total_pages; i++) {
              this.paginas.push(i);
            }
            // Pagina anterior
            if (pagina >= 2) {
              this.paginaPrev = (pagina - 1);
            } else {
              this.paginaPrev = pagina;
            }
            // Pagina siguiente
            if (pagina < respuesta.total_pages) {
              this.paginaNext = (pagina + 1);
            } else {
              this.paginaNext = pagina;
            }

          }
        },
        error => {
          console.log(<any>error);
        }
      );
    });
  }
}
