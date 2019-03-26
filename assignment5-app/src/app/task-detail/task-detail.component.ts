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
  formBuilder: FormBuilder;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    ) { }

  ngOnInit() {
    this.taskService.getById(this.route.snapshot.params.id).pipe(first())
    .subscribe( task => { this.task = task; });
    this.taskForm = this.formBuilder.group({
      dateCreated: this.task.dateCreated,
      description: this.task.description,
      isComplete: this.task.isComplete,
    }) ;
  }
}
