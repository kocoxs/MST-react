import React, {Component} from 'react'
import { getSnapshot } from "mobx-state-tree"
import { observer } from 'mobx-react';
import { values } from "mobx";

import './App.css';
//import { Todo, User } from './Models'

//const john = User.create({name: "aaron"});
//const eat = Todo.create();

//console.log([getSnapshot(john), getSnapshot(eat)])


const UserPickerView = observer(({superStore, user, onChange}) => (
  <select value={user ? user.id : ""} onChange={e => onChange(e.target.value)}>
      <option value="">-none-</option>
      {values(superStore.users).map(user => (
          <option value={user.id} key={user.id}>{user.name}</option>
      ))}
  </select>
))

const PrintJS = observer (({superStore}) => {

  return (
    <div>
      {values(superStore.todos).map((todo, index)=>{
          console.log(values(todo),index)
          return (<p key={index}>
            {todo.name}
            <input
              type="checkbox"
              checked={todo.done}
              onChange={e => {
                todo.toggle()
              }}
            />
            <UserPickerView
              user={todo.user}
              superStore={superStore}
              onChange={userId => todo.setUser(userId)}
            />
          </p>)}
      )} 
    </div>
  )
})

const TodoCounterView = observer(({superStore}) => (
  <p>
      pendientes  {superStore.pendingCount} - {superStore.completedCount} completos
  </p>
))

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
    <TodoCounterView superStore = {props.superStore} />
    <PrintJS superStore={props.superStore} />
  </div>
)

export default observer(App);
