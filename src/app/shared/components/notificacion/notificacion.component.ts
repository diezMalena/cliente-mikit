import { Component, OnInit } from '@angular/core';
import { RestNotificacionesService } from '../../services/rest-notificaciones.service';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent implements OnInit {

  constructor(public servicioNotificaciones: RestNotificacionesService) { }

  ngOnInit(): void {
  }

}
