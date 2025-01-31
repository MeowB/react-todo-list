import ListItem from "./List-item"

interface ListItemData {
	id: number;
	name: string;
	checked: boolean;
}

interface ListProps {
	dataArray: ListItemData[];
}

export default function List({ dataArray }: ListProps) {
	const listItems = dataArray.map((item) => (
		<ListItem key={item.id} text={item.name} checked={item.checked} id={item.id}></ListItem>
	));

	return <ul>{listItems}</ul>;
}