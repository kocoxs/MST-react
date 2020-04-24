import React, {Component} from 'react'
import { getSnapshot } from "mobx-state-tree"
import { observer } from 'mobx-react';
import { values } from "mobx";

import './App.css';
//import { Todo, User } from './Models'

//const john = User.create({name: "aaron"});
//const eat = Todo.create();

//console.log([getSnapshot(john), getSnapshot(eat)])

const PrintJS = observer((item, snap) => {
    
    return (
      <div>
        <p>{JSON.stringify(item)}</p>
        <p>{JSON.stringify(snap.todos)}</p>
      </div>
    )
  }
)

class  App extends Component {
  input = React.createRef();

  submit = (event) => {
    const name = this.input.current.value
    const snap = getSnapshot(this.props.superStore)
    const id = Object.keys(snap.todos).length + 1
    
    this.props.superStore.addTodo({id, name})
    this.input.current.value = ""

    console.log(getSnapshot(this.props.superStore))
    event.preventDefault();
  }

  render () { 
    const snap = getSnapshot(this.props.superStore)
    return (
      <div className="App">
        <form  onSubmit={this.submit}>
          <label>Nombre del Todo</label>
          <br/>
          <input 
            type="text"
            name="title"
            ref={this.input}
          />
          <br/>
          <button>Guardar</button>
        </form>
        <div>
          <button onClick={this.previousState}>Anterior</button>
          <button onClick={this.nextState} >siguiente</button>
        </div>
        <PrintJS item={this.props.superStore} snap={snap}/>
      </div>
    );
  }
}


export default App;
