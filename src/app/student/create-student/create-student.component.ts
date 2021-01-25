import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Student } from 'src/app/interfaces/student';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit, OnDestroy {

  studentData: Student = {
    name: "",
    department: "",
    gender: "",
    subjects: []
  };

  formGroup: FormGroup = new FormGroup({
    'gender': new FormControl("", [Validators.required]),
    'department': new FormControl("", [Validators.required]),
    'subjects': new FormControl(null, [Validators.required]),
    'agree': new FormControl(false, [Validators.requiredTrue])
  });


  options: string[] = ['One', 'Two', 'Three'];
  genderList = ['male', 'female', 'other'];
  departmentList = ['IT', 'CSE', 'E&TC']
  conditions = false;
  viewMode: 'edit' | 'create' = "create";
  id: number | null = null;

  /**
   * Subscription
   */
  filteredOptions$: Observable<string[]> | null | undefined = null;
  routes$: Subscription | null = null


  constructor(private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      if (param.id) {
        this.id = param.id;
        this.viewMode = "edit";
        this.studentData = this.dataService.getStudent(param.id);
      }
    })

    this.filteredOptions$ = this.formGroup.get('subjects')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  /**
   * Submit
   */
  onSubmit() {
    this.dataService.addStudent(this.studentData);
    this.router.navigateByUrl('student/list')
  }

  /**
   * Student Update 
   */
  onUpdate(): void {
    if (this.id) {
      this.dataService.updateStudent(this.id, this.studentData);
      this.router.navigateByUrl('student/list')
    }
  }

  ngOnDestroy(): void {
    this.routes$?.unsubscribe();
  }

}
