import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { fakeBackendProvider } from './_providers/fake-backend';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './task.service';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListItemComponentComponent } from './task-list-item-component/task-list-item-component.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskListItemComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    TaskService,
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
