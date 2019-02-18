import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoadScriptsService } from '../shared/service/load-scripts';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit, AfterViewInit {

  constructor(private loadScriptsService: LoadScriptsService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // this.loadScriptsService.loadScripts();
  }
}
