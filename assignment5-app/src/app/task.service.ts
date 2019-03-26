import { Injectable } from '@angular/core';

import {environment} from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient ) { }
  getAll() {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
}

getById(id: string) {
    return this.http.get(`${environment.apiUrl}/tasks/` + id);
}

create(task: Task) {
    return this.http.post(`${environment.apiUrl}/tasks/create`, task);
}

update(task: Task) {
    return this.http.put(`${environment.apiUrl}/task/` + task.id, task);
}
}
