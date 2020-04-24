import React, {Component} from 'react'
import { getSnapshot } from "mobx-state-tree"
import { observer } from 'mobx-react';
import { values } from "mobx";

import './App.css';
//import { Todo, User } from './Models'

//const john = User.create({name: "aaron"});
//const eat = Todo.create();

//console.log([getSnapshot(john), getSnapshot(eat)])

const PrintJS = observer (({todos}) => {
  
  return (
    <div>
      {todos.map((todo, index)=>
          <p key={index}>
            {todo.name}
            <input
              type="checkbox"
              checked={todo.done}
              onChange={e => {
                todo.toggle()
              }}
            />
          </p>
      )} 
    </div>
  )
})


const App = (props) => (
  <div className="App">
    <form  onSubmit={(e) => {
        e.preventDefault(); 
        const name = e.target.title.value;
        const snap = getSnapshot(props.superStore)
        const id = Object.keys(snap.todos).length + 1
        props.superStore.addTodo({id, name})
        e.target.title.value = ""
        console.log( getSnapshot(props.superStore))
      }}>
      <label>Nombre del Todo</label>
      <br/>
      <input 
        type="text"
        name="title"
        autoComplete="off"
      />
      <br/>
      <button>Guardar</button>
    </form>
    <PrintJS todos={values(props.superStore.todos)} />
  </div>
)

export default observer(App);
