import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Todo = (props) =>{
    return(
        <tr>
            <td>{props.todo.todo_description}</td>
            <td>{props.todo.todo_responsible}</td>
            <td>{props.todo.todo_priority}</td>
            <td>
                <Link to={"/edit/" + props.todo._id}>Edit</Link>
            </td>
        </tr>
    );
}

export default class TodosList extends React.Component{
    constructor(props){
        super(props);
        this.state = {todos: []};
    }

    componentDidMount(){
        axios.get("http://localhost:4000/todos/").then(res =>{
            this.setState({
                todos: res.data
            });
        }).catch(err=>{
            console.log(err);
        })
    }

    todoList(){
        return this.state.todos.map((currentTodo, i) =>{
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render(){
        return(
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        );
    }
}