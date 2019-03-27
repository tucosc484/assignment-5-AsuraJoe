import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup} from '@angular/forms';
import { first } from 'rxjs/operators';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
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
    private taskService: TaskService,
    private router: Router
  ) { }
  /** preload form  */
  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      dateCreated: Date,
      description: '',
      isComplete: Boolean,
      dateCompleted: Date
    });
  }
  /** shorten the form controls */
  get f() { return this.taskForm.controls; }

  /** controls what happens when the form is submitted and adding completion date if task is completed */
  onSubmit() {
    this.submitted = true;
    this.taskForm.value.dateCreated = Date.now();
    // add completed date if created and completed on the same day
    if (this. taskForm.value.isComplete !== false) {
      this.taskForm.value.dateCompleted = Date.now();
    }
    this.loading = true;
    // post the form into a task
    this.taskService.create(this.taskForm.value)
      .pipe(first())
        .subscribe(
          data => {console.log('success');
                   this.router.navigate(['/']); },
          error => {console.log('failure'); }
        );
  }
}
