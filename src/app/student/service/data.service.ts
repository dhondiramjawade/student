import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: Array<Student> = [{ name: "abc", department: "IT", gender: 'male', subjects: ['ddd'] }]
  constructor() { }

  /**
   * Get Student Data 
   */
  getData(): Observable<Array<Student>> {
    return new Observable((observer) => {
      observer.next(this.data)
    })
  }

  /**
   * Add new Student
   * @param student 
   */
  addStudent(student: Student) {
    this.data.push(student)
  }

  /**
   * Delete Student 
   * @param id 
   */
  deleteStudent(id: number) {
    this.data.splice(id, 1);
  }

  /**
   * Get Student by Id
   * @param id 
   */
  getStudent(id: number) {
    return this.data[id];
  }

  /**
   * Update existing student
   * @param id 
   * @param student 
   */
  updateStudent(id: number, student: Student) {
    this.data[id] = student;
  }

}
