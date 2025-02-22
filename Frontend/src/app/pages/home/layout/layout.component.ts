import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  appname = environment.appname;

}
