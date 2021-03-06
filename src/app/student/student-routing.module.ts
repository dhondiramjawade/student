import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ListStudentComponent } from './list-student/list-student.component';

const routes: Routes = [{
  path: "",
  redirectTo: 'list',
  pathMatch: 'full'
}, {
  path: 'list',
  component: ListStudentComponent
}, {
  path: 'create',
  component: CreateStudentComponent
}, {
  path: 'edit',
  component: CreateStudentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
