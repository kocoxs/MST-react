import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getSnapshot, applySnapshot, onSnapshot } from "mobx-state-tree"
import { RootStore } from './Models'

const store = RootStore.create();
const superStore = RootStore.create({
  users: {
    "1": {
        id: "1",
        name: "mweststrate"
    },
    "2": {
        id: "2",
        name: "mattiamanzati"
    },
    "3": {
        id: "3",
        name: "johndoe"
    }
  },
  todos: {
      "1": {
          name: "Eat a cake",
          done: true
      }
  }
});

store.addTodo({id: 1, name: 'aprender Moxb'})

store.todos.get(1).toggle()
//abteniendo el primer snapshot
const getTheSnapShot1 = getSnapshot(store)
//imprimir el primer snapshot
//console.log(getTheSnapShot1)
//adding second todo 
store.addTodo({id: 2, name: 'la tarea que va de segunda'})
//obteniendo el segundo snapshot
const getTheSnapShot2 = getSnapshot(store)
//imprimiendo snapshot 2 como se ve el store ahora
//console.log(getTheSnapShot2);
//actualizando el stado del store con un el snapshot1 
applySnapshot(store, getTheSnapShot1)
//obteniendo e imprimiendo el nuevo snapshot del store deberia ser el snapshot1
const actualsnapshot = getSnapshot(store)
//imprimiendo el snapshot
//console.log(actualsnapshot)

let states = []
let currentFrame = -1

onSnapshot(store, snapshot => {
  if (currentFrame === states.length - 1) {
      currentFrame++
      states.push(snapshot)
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App superStore={superStore}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
