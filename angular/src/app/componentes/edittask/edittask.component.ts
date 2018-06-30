import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Tarea } from '../../modelos/tarea';
import { TareaServicio } from '../../services/tarea.service';
import { UsuarioServicio } from '../../services/usuario.service';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css'],
  providers: [UsuarioServicio, TareaServicio]
})
export class EdittaskComponent implements OnInit {

  public token;
  public identity;
  public tarea: Tarea;
  public status;
  public ListaEstados: any;
  public loading;

  constructor(private _tareaServicio: TareaServicio,
    private _usuarioServicio: UsuarioServicio,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.identity = this._usuarioServicio.getIdentity();
    this.token = this._usuarioServicio.getToken();
    // Carga la información de inicio
    this.ListaEstados = [
      { value: 'new', text: 'Nueva Tarea' },
      { value: 'todo', text: 'En Desarrollo' },
      { value: 'finished', text: 'Terminado' }
    ];
  }

  ngOnInit() {
    if (this.identity == null && !this.identity.sub) {
      this._router.navigate(['/login']);
    } else {
      // this.tarea = new Tarea(1, '', '', 'new', 'null', 'null');
      this.ObtenerTarea();
    }
  }

  ObtenerTarea() {
    this.loading = 'show';
    this._route.params.forEach((params: Params) => {
      const id = +params['id'];

      this._tareaServicio.getTask(this.token, id).subscribe(
        respuesta => {
          console.log(respuesta);
          if (respuesta.status === 'success') {
            if (respuesta.data.id = this.identity.sub) {
              this.tarea = respuesta.data;
              this.loading = 'hidden';
            } else {
              this._router.navigate(['/']);
            }
          } else {
            this._router.navigate(['/login']);
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    });
  }


  ModificarTarea() {
    console.log(this.tarea);
    this._route.params.forEach((params: Params) => {
      const id = +params['id'];
      console.log(id);
      this._tareaServicio.updateTask(this.token, this.tarea, id).subscribe(
        respuesta => {
          this.status = respuesta.status;
          console.log(this.status);
          if (this.status === 'success') {
            this.tarea = respuesta.data;
            this._router.navigate(['/']);
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    });
  }
}
