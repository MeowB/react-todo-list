import List from './components/List'
import './styles/index.css'
import './styles/css-helpers/reset.css'
import './styles/css-helpers/normalize.css'


function App() {
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
						<List />
					</div>
				</main>
			</div>
		</>
	)
}

export default App
