import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading-service.service';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [ AsyncPipe, CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

  constructor(public loadingService: LoadingService) {}

  cubes = Array(8);

}
