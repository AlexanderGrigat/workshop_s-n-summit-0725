import { Component } from '@angular/core';
import { Product } from './product/product';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'stn-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports:[
    RouterOutlet,
    RouterLink,
    DatePipe,
    UpperCasePipe,
    MatToolbarModule,
  ]
})
export class AppComponent {
  heute = new Date();
  title = 'stones';
}
