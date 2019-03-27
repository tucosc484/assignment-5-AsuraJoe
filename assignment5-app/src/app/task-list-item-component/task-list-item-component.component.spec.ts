import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListItemComponentComponent } from './task-list-item-component.component';

describe('TaskListItemComponentComponent', () => {
  let component: TaskListItemComponentComponent;
  let fixture: ComponentFixture<TaskListItemComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListItemComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListItemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
