import { SyntheticEvent } from 'react'

export default function TodoForm({ handleSubmit }: { handleSubmit: (e: SyntheticEvent) => void }) {
	return (
		<form className='add-item-form' action="#" onSubmit={handleSubmit}>
			<input className="todo-input" id="todoInput" type="text" placeholder="Type a new todo" required />
			<input type="submit" value="Add Todo" />
		</form>
	)
}
