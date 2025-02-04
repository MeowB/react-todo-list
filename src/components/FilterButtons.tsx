export default function FilterButtons({ filterAll, filterDone, filterUndone }: { filterAll: () => void, filterDone: () => void, filterUndone: () => void }) {
	return (
		<div className="filter">
			<button onClick={filterAll}>All tasks</button>
			<button onClick={filterDone}>Tasks done</button>
			<button onClick={filterUndone}>Tasks to do</button>
		</div>
	)
}
