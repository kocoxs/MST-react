import React, {Component} from 'react'
import { getSnapshot } from "mobx-state-tree"
import { observer } from 'mobx-react';
import { values } from "mobx";

import './App.css';
//import { Todo, User } from './Models'

//const john = User.create({name: "aaron"});
//const eat = Todo.create();

//console.log([getSnapshot(john), getSnapshot(eat)])

const PrintJS = ({todos}) => {
  
  return (
    <div>
      {todos.map((todo, index)=>
        <p key={index}>
          {todo.name}
          <input
            type="checkbox"
            checked={todo.done}
            onChange={e => todo.toggle()}
          />
        </p>
      )} 
    </div>
  )
}
  

  


const App = (props) => (
  <div className="App">
    <form  onSubmit={(e) => {
        e.preventDefault(); 
        const name = e.target.title.value;
        const snap = getSnapshot(props.superStore)
        const id = Object.keys(snap.todos).length + 1
        props.superStore.addTodo({id, name})
        e.target.title.value = ""
      }}>
      <label>Nombre del Todo</label>
      <br/>
      <input 
        type="text"
        name="title"
        autoComplete="false"
      />
      <br/>
      <button>Guardar</button>
    </form>
    <PrintJS todos={values(props.superStore.todos)} />
  </div>
)
// {
//   input = React.createRef();

//   submit = (event) => {
//     const name = this.input.current.value
//     const snap = getSnapshot(this.props.superStore)
//     const id = Object.keys(snap.todos).length + 1
    
    
//     this.input.current.value = ""

//     console.log(getSnapshot(this.props.superStore))
//     event.preventDefault();
//   }

//   render () { 
//     const snap = getSnapshot(this.props.superStore)
//     return 
//   }
// }


export default observer(App);
