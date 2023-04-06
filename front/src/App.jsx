import { useState, useEffect } from 'react';
import './App.scss';

import Form1 from './components/forms/Form1';
import Form2 from './components/forms/Form2';
import Form3 from './components/forms/Form3';
import Form4 from './components/forms/Form4';
import Form5 from './components/forms/Form5';
import Form6 from './components/forms/Form6';
import Request1 from './components/requests/Request1';
import Request2 from './components/requests/Request2';
import Request3 from './components/requests/Request3';
import Request4 from './components/requests/Request4';
import Request5 from './components/requests/Request5';


function App() {
	const [openedItem, setOpenedItem] = useState(0);

	const renderSelectedContent = (id) => {
		switch (id) {
			case 0:
				return <Form1 />
			case 1:
				return <Form2 />
			case 2:
				return <Form3 />
			case 3:
				return <Form4 />
			case 4:
				return <Form5 />
			case 5:
				return <Form6 />
			case 6:
				return <Request1 />
			case 7:
				return <Request2 />
			case 8:
				return <Request3 />
			case 9:
				return <Request4 />
			case 10:
				return <Request5 />
		}
	};

  	return (
	  	<div className="App">
  			<div className="menu">
  		  	<ul>
  		  		<li onClick={() => {setOpenedItem(0)}}>Работники (ф1)</li>
  					<li onClick={() => {setOpenedItem(1)}}>Расценка (ф2)</li>
						<li onClick={() => {setOpenedItem(2)}}>Премии (ф3)</li>
						<li onClick={() => {setOpenedItem(3)}}>Пользователи (ф4)</li>
						<li onClick={() => {setOpenedItem(4)}}>Заказы (ф5)</li>
						<li onClick={() => {setOpenedItem(5)}}>Фото (ф6)</li>
					</ul>
					<ul>
  		  		<li onClick={() => {setOpenedItem(6)}}>Кол-во заказов (о1)</li>
  					<li onClick={() => {setOpenedItem(7)}}>Премии (о2)</li>
						<li onClick={() => {setOpenedItem(8)}}>Зарплата (о3)</li>
						<li onClick={() => {setOpenedItem(9)}}>Фото кошек (о4)</li>
						<li onClick={() => {setOpenedItem(10)}}>Цена заказов (о5)</li>
					</ul>
				</div>
				{
					renderSelectedContent(openedItem)
				}
			</div>
		)
	}
export default App;