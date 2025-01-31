import List from './components/List'
import './styles/index.css'
import './styles/css-helpers/reset.css'
import './styles/css-helpers/normalize.css'
import { useState, useEffect } from 'react'

const createTodos = () => {
	return [
		{
			name: 'do the dishes',
			checked: true,
			id: 1
		},
		{
			name: 'do the food',
			checked: false,
			id: 2
		},
		{
			name: 'do the grocery',
			checked: true,
			id: 3
		}
	]
}




function App() {
	const [todos, setTodos] = useState(() => createTodos())
	const [checkedState, setCheckedState] = useState(
		new Array(todos.length).fill(false)
	)

	const handleOnChange = (e: Event) => {
		const checkbox = e.target as HTMLElement
		const li = checkbox.parentElement?.parentElement
		const p = li?.querySelector('p')

		

		if(p){
			p.style.textDecoration = 'line-through'
		}
	}


	const handleSubmit = (input: Event) => {
		if (input.target) {
			let formElement = input.target as HTMLFormElement;
			let value = (formElement.elements[0] as HTMLInputElement).value;
	
			let index = 0
			todos.forEach((e) => e.id > index ? index = e.id :  index = index)
			
	
			setTodos([...todos, {
				name: value,
				checked: false,
				id: index + 1
			}])
		}
	}

	const handleDelete = (e: Event) => {
		let button = e.target as HTMLElement
		button.parentElement?.remove()
	}
	
	useEffect(() => {
		const form = document.querySelector('form')
		const buttons = document.querySelectorAll('.delete-button')
		const checkboxes = document.querySelectorAll('input[type=checkbox]')

		checkboxes.forEach((checkbox) => checkbox.addEventListener('click', handleOnChange))
		buttons.forEach((button) => button.addEventListener('click', handleDelete))
		form?.addEventListener('submit', handleSubmit)

		return () => {
			form?.removeEventListener('submit', handleSubmit)
		}
	}, [todos])


	return (
		<>
			<div className="center">
				<header>
					<div className="container">
						<h1>My Todo List</h1>
					</div>
				</header>
				<main>
					<div className="container">
						<form action="#">
							<input className="todo-input" id="todoInput" type="text" placeholder="Type a new todo" required />
							<input type="submit" value="Add Todo" />
						</form>
						<List dataArray={todos} />
					</div>
				</main>
			</div>
		</>
	)
}

export default App
