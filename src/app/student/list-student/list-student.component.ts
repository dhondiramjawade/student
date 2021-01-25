import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Student } from 'src/app/interfaces/student';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {
  displayedColumns: string[] = ['name', 'gender', 'department', 'symbol', 'edit'];
  dataSource: MatTableDataSource<Student> | [] = [];
  @ViewChild("dialog") dialogTemplate: TemplateRef<any> | null = null;


  constructor(
    private router: Router,
    private dataService: DataService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  /**
   * Edit User
   * @param id 
   */
  editUser(id: number) {
    this.router.navigate(['student', "edit"], { queryParams: { id: id } })
  }

  /**
   * Delete User
   * @param id 
   */
  onDelete(id: number) {
    if (this.dialogTemplate) {
      this.dialog.open(this.dialogTemplate).afterClosed().subscribe(resp => {
        if (resp === "yes") {
          this._deleteUser(id);
        }
      })
    }
  }

  /**
   * Navigate to create user 
   */
  createUser() {
    this.router.navigateByUrl('student/create');
  }

  private _deleteUser(id: number) {
    this.dataService.deleteStudent(id)
    this.ngOnInit();
  }

}
