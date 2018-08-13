import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  data = {
    labels: ['BMW', 'Audi', 'Mazda'],
    datasets: [
      {
        data: [5, 3, 1],
        backgroundColor:[
          '#ff6384',
          '#36a2eb',
          '#ffce56'
        ]
      }
    ]
  }

  constructor() { }

  ngOnInit() {
  }

}
