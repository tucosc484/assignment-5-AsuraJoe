import { Injectable } from '@angular/core';

import {environment} from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient ) { }
/**
 * Get All tasks.
 */
  getAll() {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
}
/**
 * Get Task by id.
 * @param {number} id - task's id
 */
getById(id: number) {
    return this.http.get<Task>(`${environment.apiUrl}/tasks/` + id);
}
/**
 * create task.
 * @param {Task} task- new task
 */
create(task: Task) {
    return this.http.post(`${environment.apiUrl}/tasks/`, task);
}
/**
 * delete task.
 * @param {number} id - task's id
 * @param {Task} task- updated body
 */
update(id: number, task: Task) {
    return this.http.put(`${environment.apiUrl}/tasks/` + id, task);
}
/**
 * delete task.
 * @param {number} id - task's id
 */
delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/tasks/` + id);
}

}
