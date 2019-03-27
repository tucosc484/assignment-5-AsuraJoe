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
  update = false;
  id: string;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private formBuilder: FormBuilder
    ) { }

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

  get f() { return this.taskForm.controls; }
  loadTask() {
    this.taskService.getById(this.id).pipe(first())
    .subscribe( task => { this.task = task; });
  }
  taskUpdate() {
    this.update = true;
    this.f.id.setValue(this.task.id);
    this.f.dateCreated.setValue(this.task.dateCreated);
    this.f.description.setValue(this.task.description);
    this.f.isComplete.setValue(this.task.isComplete);
  }

  onSubmit() {
    if (this. taskForm.value.isComplete !== false) {
      this.taskForm.value.dateCompleted = Date.now();
    }
    this.update = false;
    this.taskService.update(this.id, this.taskForm.value).pipe(first()).subscribe(() => this.loadTask());
  }
}
