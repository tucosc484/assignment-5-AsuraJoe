import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
  {path: '', component: TaskListComponent},
  {path: 'details/:id', component: TaskDetailComponent},
  {path: 'create', component: CreateTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
