import ListItem from "./ListItem"
import todos from '../../todos.json'
import '../styles/list/list.css'
import { FaTrashCan } from "react-icons/fa6"
import { SyntheticEvent, useState } from 'react'

export default function List() {
	let [todoList, setTodoList] = useState(todos)

	const handleSubmit = (e: SyntheticEvent) => {
		const form = e.target as HTMLFormElement
		const input = form.todoInput.value

		setTodoList([...todoList, {text: input, id: todoList.length + 1}])
	}

	const handleDelete = (index: number) => {
		setTodoList(todoList.filter((element, i) => element? i + 1 != index + 1 : ''))
	}

	return <>
		<form action="#" onSubmit={(e) => handleSubmit(e)}>
			<input className="todo-input" id="todoInput" type="text" placeholder="Type a new todo" required />
			<input  type="submit" value="Add Todo" />
		</form>
		<ul>
			{todoList.map((item, index) => (
				<li className="list-item" key={item.id}>
					<ListItem text={item.text}/>
					<button onClick={() => handleDelete(index)} className='delete-button'><FaTrashCan /></button>
				</li>
				))}
		</ul>

	</>
}