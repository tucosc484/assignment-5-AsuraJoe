import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
  {path: 'tasks', component: TaskListComponent},
  {path: 'tasks/create', component: CreateTaskComponent},
  {path: 'tasks/:id', component: TaskDetailComponent},
  // redirect to tasks
  { path: '**', redirectTo: 'tasks'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
