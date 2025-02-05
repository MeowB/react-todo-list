import todos from '../../todos.json'
import '../styles/list/list.css'
import { SyntheticEvent, useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import FilterButtons from './FilterButtons'
import TodoItem from './TodoItem'

export default function List() {
	const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem("data") || JSON.stringify(todos)))
	const [filteredList, setFilteredList] = useState(todoList)
	const [filtering, setFiltering] = useState(false)
	const [editing, setEditing] = useState(false)
	const [onEdit, setOnEdit] = useState(new Array(todoList.length).fill(false))

	const saveData = () => {
		localStorage.setItem("data", JSON.stringify(todoList))

		if (todoList.length === 0) {
			localStorage.clear()
		}
	}

	const createId = (list: {}) => {
		const str = JSON.stringify(list);

		let id = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

		return id.toString(36);
	};

	useEffect(() => {
		saveData()
	}, [todoList])


	const filterDone = async () => {
		setOnEdit(onEdit.fill(false))
		setEditing(false)
		setFiltering(true)
		const newList = todoList.map((e: { checked: boolean }) => e.checked ? e : {}).filter((e: {}) => Object.keys(e).length !== 0)
		setFilteredList(newList)
	}

	const filterUndone = async () => {
		setOnEdit(onEdit.fill(false))
		setEditing(false)
		setFiltering(true)
		const newList = todoList.map((e: { checked: boolean }) => e.checked ? {} : e).filter((e: {}) => Object.keys(e).length !== 0)
		setFilteredList(newList)
	}

	const filterAll = async () => {
		setEditing(false)
		setOnEdit(onEdit.fill(false))
		setFiltering(false)
	}

	const handleCheck = (index: number) => {
		let newTodoList = [...todoList]
		newTodoList[index].checked = !newTodoList[index].checked

		setTodoList(newTodoList)
	}

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault()
		const form = e.target as HTMLFormElement
		const input = form.todoInput.value
		const id = createId(todoList)

		setOnEdit([...onEdit, false])
		setTodoList([...todoList, { text: input, id: id, checked: false, key: id }])
	}


	const handleEdit = (index: number) => {

		if (editing === true) return
		let newEditList = onEdit
		newEditList[index] = !newEditList[index]

		setOnEdit(newEditList)
		setEditing(true)
	}

	const handleEditValidation = async (e: SyntheticEvent, index: number, filtered: boolean) => {
		e.preventDefault()

		let newTodoList
		let editList = onEdit
		const target = e.target as HTMLFormElement
		let input = target.editInput.value

		if (input === '') input = todoList[index].text
		
		if (filtered) {
			newTodoList = filteredList
			newTodoList[index].text = input
			setFilteredList(newTodoList)
			
		} else {
			newTodoList = todoList
			newTodoList[index].text = input
			setTodoList(newTodoList)
		}

		editList[index] = false
		setOnEdit(editList)
		setEditing(false)
		saveData()
	}


	const handleDelete = (e: SyntheticEvent, index: number, filtered: boolean) => {
		e.preventDefault()
		let listCopy = todoList
		if (filtered) {
			setFilteredList(filteredList.filter((element: {}, i: number) => element ? i + 1 != index + 1 : ''))

		} else {
			setTodoList(todoList.filter((element: {}, i: number) => element ? i + 1 != index + 1 : ''))
		}

		delete listCopy[todoList.findIndex((el: string) => el === filteredList[index])]
		listCopy = listCopy.filter((el: {}) => el !== null)
		setTodoList(listCopy)
	}



	return <>
		<TodoForm handleSubmit={handleSubmit} />
		<FilterButtons filterAll={filterAll} filterDone={filterDone} filterUndone={filterUndone} />
		<ul>
			{filtering === false
				? todoList.map((item: { text: string, id: number }, index: number) =>
					<TodoItem
						item={item}
						index={index}
						handleCheck={handleCheck}
						handleEdit={handleEdit}
						handleEditValidation={handleEditValidation}
						handleDelete={handleDelete}
						onEdit={onEdit}
						filtered={false}
					/>
				)
				: filteredList.map((item: { text: string, id: number }, index: number) =>
					<TodoItem
						item={item}
						index={index}
						handleCheck={handleCheck}
						handleEdit={handleEdit}
						handleEditValidation={handleEditValidation}
						handleDelete={handleDelete}
						onEdit={onEdit}
						filtered={true}
					/>
				)
			}
		</ul>

	</>
}