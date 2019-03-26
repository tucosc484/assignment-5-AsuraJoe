import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.sass']
})
export class TaskDetailComponent implements OnInit {
  task: Task ;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    ) { }

  ngOnInit() {
    this.taskService.getById(this.route.snapshot.params.id).pipe(first())
    .subscribe( task => { this.task = task; });
  }

}
