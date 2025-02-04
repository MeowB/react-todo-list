import { FaTrashCan, FaPen, FaCheck } from "react-icons/fa6"

export default function TodoItem({ item, index, handleCheck, handleEdit, handleEditValidation, handleDelete, onEdit }: any) {

	const linethrough = {
		textDecoration: 'line-through',
	}

	return (
		<li className="list-item" key={item.id}>
			<form method='#' onSubmit={(e) => handleEditValidation(e, index)}>
				<div className='text'>
					{item.checked
						? <input onChange={() => handleCheck(index)} value={item.text} type="checkbox" checked />
						: <input onChange={() => handleCheck(index)} value={item.text} type="checkbox" />
					}

					{onEdit[index] === false
						? <p style={item.checked ? linethrough : {}}>{item.text}</p>
						: <input className="todo-input" id="editInput" type="text" placeholder={item.text}/>
					}
				</div>
				<div className="buttons">
					{onEdit[index] === true
						? <button type='submit' className='validate-button'><FaCheck /></button>
						: <a type="button" onClick={() => handleEdit(index)} className='edit-button'><FaPen /></a>
					}
					<button onClick={() => handleDelete(index)} className='delete-button'><FaTrashCan /></button>
				</div>
			</form>
		</li>
	)
}
