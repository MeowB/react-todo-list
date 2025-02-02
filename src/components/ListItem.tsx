import { useState } from 'react'

const linethrough = {
	textDecoration: 'line-through',
}

export default function ListItem({ text }: { text: string}) {
	let [checkedState, setCheckedState] = useState(false)

	return <div>
			<input  onClick={ () => setCheckedState((prevState) => !prevState) } value={text} type="checkbox" />
			<p style={checkedState ? linethrough : {}}>{text}</p>
		</div>
}