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
    return this.http.get<Task[]>(`${environment.apiUrl}/_tasks`);
}
/**
 * Get Task by id.
 * @param {string} id - task's id
 */
getById(id: string) {
    return this.http.get<Task>(`${environment.apiUrl}/_tasks/` + id);
}
/**
 * create task.
 * @param {Task} task- new task
 */
create(task: Task) {
    return this.http.post(`${environment.apiUrl}/_tasks/create`, task);
}
/**
 * delete task.
 * @param {string} id - task's id
 * @param {Task} task- updated body
 */
update(id: string, task: Task) {
    return this.http.put(`${environment.apiUrl}/_tasks/` + id, task);
}
/**
 * delete task.
 * @param {string} id - task's id
 */
delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/_tasks/` + id);
}

}
