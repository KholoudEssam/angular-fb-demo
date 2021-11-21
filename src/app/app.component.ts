import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  TaskDialogComponent,
  TaskDialogResult,
} from './components/task-dialog/task-dialog.component';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-fb-demo';

  constructor(private dialog: MatDialog, private todosService: TodosService) {}

  newTask() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: { task: {} },
    });

    dialogRef.afterClosed().subscribe((res: TaskDialogResult) => {
      if (!res?.task?.title || !res?.task?.description) return;
      res.task.state = 'todo';

      this.todosService.addTodo(res.task);
    });
  }
}
