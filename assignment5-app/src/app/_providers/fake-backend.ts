import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { __param } from 'tslib';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let tasks: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            if (request.url.endsWith('/tasks') && request.method === 'GET') {
                    return of(new HttpResponse({ status: 200, body: tasks }));
            }

            // get task by id
            if (request.url.match(/\/tasks\/\d+$/) && request.method === 'GET') {
                    // find task by id in tasks array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedTask = tasks.filter(task => task.id === id);
                    let task = matchedTask.length ? matchedTask[0] : null;

                    return of(new HttpResponse({ status: 200, body: task }));
            }

            // create task
            if (request.url.endsWith('/tasks/create') && request.method === 'POST') {
                // get new task object from post body
                let newTask = request.body;

                // save new task
                newTask.id = tasks.length + 1;
                tasks.push(newTask);
                localStorage.setItem('tasks', JSON.stringify(tasks));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/tasks\/\d+$/) && request.method === 'DELETE') {
               
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < tasks.length; i++) {
                        let task = tasks[i];
                        if (task.id === id) {
                            // delete user
                            tasks.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(tasks));
                            break;
                        }
            }

            // pass through any requests not handled above
                    return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};