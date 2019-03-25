import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup} from '@angular/forms';
import { first } from 'rxjs/operators';
import { TaskService } from '../task.service';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.sass']
})
export class CreateTaskComponent implements OnInit {

  taskForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      dateCreated: Date.now(),
      description: '',
      isComplete: Boolean,
      dateCompleted: Date
    });
  }

  get f() { return this.taskForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.taskService.create(this.taskForm.value);
  }
}