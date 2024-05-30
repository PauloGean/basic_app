import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-icons',
  templateUrl: './check-icons.component.html',
  styleUrls: ['./check-icons.component.css']
})
export class CheckIconsComponent implements OnInit {
  @Input() value:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
