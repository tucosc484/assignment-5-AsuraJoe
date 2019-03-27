import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.listTasks();
  }
  /**
   * load all task tasks
   */
  private listTasks() {
    this.taskService.getAll().pipe().subscribe( tasks => {
      this.tasks = tasks;
    });
  }
  deleteTask(id: string) {
    this.taskService.delete(id).pipe(first()).subscribe( () => this.listTasks());
  }
}
