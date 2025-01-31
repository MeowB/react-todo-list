import '../styles/List-item/List-item.css'


export default function ListItem({ text, checked, id }: { text: string, checked: boolean, id: number}) {
	let checkClass = checked === true ? 'checked' : 'not-checked'

	return <li className="list-item" key={id}>
		<div className="left">
			<input value={text} type="checkbox" className={checkClass}/>
			<p>{text}</p>
		</div>
		<button className='delete-button'>Delete</button>
	</li>
}