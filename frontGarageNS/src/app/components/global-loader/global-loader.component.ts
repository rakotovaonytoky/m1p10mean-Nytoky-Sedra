import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/service/loader/loader.service';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.css']
})
export class GlobalLoaderComponent implements OnInit {

  loading!: boolean;
  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v: boolean) => {
      // console.log("Console log from components \n"+v);
      this.loading = v;
    });

  }

  ngOnInit(): void {
  }

}
