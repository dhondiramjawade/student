import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'student';
  opened = false;

  typesOfShoes = [{
    name: 'Create Student',
    route: 'student/create',
  }, {
    name: "Student List",
    route: 'student/list',
  }]
}
