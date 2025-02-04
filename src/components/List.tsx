import todos from '../../todos.json'
import '../styles/list/list.css'
import { FaTrashCan, FaPen, FaCheck } from "react-icons/fa6"
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
		setFiltering(true)
		const newList = todoList.map((e: { checked: boolean }) => e.checked ? e : {}).filter((e: {}) => Object.keys(e).length !== 0)
		setFilteredList(newList)
	}

	const filterUndone = async () => {
		setFiltering(true)
		const newList = todoList.map((e: { checked: boolean }) => e.checked ? {} : e).filter((e: {}) => Object.keys(e).length !== 0)
		setFilteredList(newList)
	}

	const filterAll = async () => {
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

	const handleEditValidation = async (e: SyntheticEvent, index: number) => {
		e.preventDefault()
		let newTodoList = todoList
		let editList = onEdit
		const target = e.target
		let input = target[1].value

		if (input === '') input = todoList[index].text
		newTodoList[index].text = input
		editList[index] = false

		setOnEdit(editList)
		setTodoList(newTodoList)
		setEditing(false)
		saveData()
	}


	const handleDelete = (index: number) => {
		setTodoList(todoList.filter((element: {}, i: number) => element ? i + 1 != index + 1 : ''))

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
					/>
				)
			}
		</ul>

	</>
}