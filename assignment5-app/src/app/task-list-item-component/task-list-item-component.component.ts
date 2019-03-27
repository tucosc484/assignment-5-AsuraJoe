import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { first } from 'rxjs/operators';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'taskItem',
  templateUrl: './task-list-item-component.component.html',
  styleUrls: ['./task-list-item-component.component.sass']
})
export class TaskListItemComponentComponent implements OnInit {
  // Data from task list Component is passed here
  @Input() task: Task;
  constructor(
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit() {
  }
  /**
   * delete the task and then refresh the page
   * @param id - id to search for task
   */
  deleteTask(id: string) {
    this.taskService.delete(id).pipe(first()).subscribe( () => this.router.navigate(['/']));
  }

}
