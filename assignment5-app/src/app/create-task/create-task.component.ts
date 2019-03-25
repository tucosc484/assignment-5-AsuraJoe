import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.sass']
})
export class CreateTaskComponent implements OnInit {

  taskForm: FormGroup;
  loading: false;
  submitted: true;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      id: '',
      dateCreated: '',
      description: '',
      isComplete: '',
      dateCompleted: Date
    });
  }

  get f() { return this.taskForm.controls; }

}
