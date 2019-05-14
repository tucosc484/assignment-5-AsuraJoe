import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.sass']
})
export class TaskDetailComponent implements OnInit {
  task: Task ;
  taskForm: FormGroup;
  loading = false;
  update = false;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private formBuilder: FormBuilder
    ) { }
  /**
   * preload the form and load up the task
   */
  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.taskForm = this.formBuilder.group({
      id: Number,
      dateCreated: Date,
      description: String,
      isComplete: Boolean,
      dateCompleted: Date
    });
    this.loadTask();
  }
  /**
   * Shorten the form controls
   */
  get f() { return this.taskForm.controls; }
  /**
   * load the specific task
   */
  loadTask() {
    this.taskService.getById(this.id).pipe(first())
    .subscribe( task => { this.task = task; });
  }
  /**
   * set values and show the form
   */
  taskUpdate() {
    this.update = true;
    this.f.id.setValue(this.task.id);
    this.f.dateCreated.setValue(this.task.dateCreated);
    this.f.description.setValue(this.task.description);
    this.f.isComplete.setValue(this.task.isComplete);
  }
  /** cancel the update */
  cancel() {
    this.update = false;
  }
  onSubmit() {
    if (this. taskForm.value.isComplete !== false) {
      this.taskForm.value.dateCompleted = Date.now();
    }
    this.loading = true;
    this.update = false;
    this.taskService.update(this.id, this.taskForm.value).pipe(first()).subscribe(() => this.loadTask());
  }
}
