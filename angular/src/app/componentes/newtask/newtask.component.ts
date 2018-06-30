import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Tarea } from '../../modelos/tarea';
import { TareaServicio } from '../../services/tarea.service';
import { UsuarioServicio } from '../../services/usuario.service';


@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css'],
  providers: [UsuarioServicio, TareaServicio]
})
export class NewtaskComponent implements OnInit {

  public token;
  public identity;
  public tarea: Tarea;
  public status;
  public ListaEstados: any;

  constructor(
    private _tareaServicio: TareaServicio,
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
      this.tarea = new Tarea(1, '', '', 'new', 'null', 'null');
    }
  }

  AgregarTarea() {
    console.log(this.tarea);
    this._tareaServicio.newTask(this.token, this.tarea).subscribe(
      respuesta => {
        this.status = respuesta.status;
        console.log(this.status);
        if (this.status !== 'success') {
          this.status = 'error';
        } else {
          this.tarea = respuesta.data;
          this._router.navigate(['/']);
          // this._router.navigate(['/tarea', this.tarea.id]);

        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
