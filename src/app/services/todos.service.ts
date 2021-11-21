import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Task } from 'src/app/components/task/task';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todosCollection: AngularFirestoreCollection<Task> =
    this.afs.collection<Task>('todo', (ref) =>
      ref.where('state', '==', 'todo')
    );
  todo$: Observable<Task[]> = this.todosCollection.valueChanges({
    idField: 'id',
  });

  private inProgressCollection: AngularFirestoreCollection<Task> =
    this.afs.collection<Task>('todo', (ref) =>
      ref.where('state', '==', 'inProgress')
    );
  inProgress$: Observable<Task[]> = this.inProgressCollection.valueChanges({
    idField: 'id',
  });

  private doneCollection: AngularFirestoreCollection<Task> =
    this.afs.collection<Task>('todo', (ref) =>
      ref.where('state', '==', 'done')
    );
  done$: Observable<Task[]> = this.doneCollection.valueChanges({
    idField: 'id',
  });

  constructor(private afs: AngularFirestore) {}

  addTodo(todo: Task) {
    this.afs.collection('todo').add(todo);
  }
  editTodo(id: string | undefined, fields: Partial<Task>) {
    this.afs
      .doc<Task>(`todo/${id}`)
      .update(fields)
      .then(() => {});
  }
  deleteTodo(id: string | undefined) {
    this.afs
      .doc<Task>(`todo/${id}`)
      .delete()
      .then(() => {});
  }
}
