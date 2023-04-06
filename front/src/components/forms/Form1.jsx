import React from 'react';
import './Form.scss';
import axios from 'axios';

export default class Form1 extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			impName: '',
			impExp: '',
			impPosition: '',
			impSalary: '',
			isBackLoaded: false,
			implementers: []
		};
	}
	componentDidMount() {
		if(this.state.isBackLoaded){
			return;
		}
		axios.post('http://127.0.0.1:8800/api', {
			method: "getFormData",
			formId: 0,
		}).then((data)=>{
			if(data.data?.status !== "ok"){
				console.log("Error")
				console.error(data.data);
				return;
			}
			this.setState({
				isBackLoaded: true,
				implementers: data.data.data
			});
		})
	}
	render() {
		if (!this.state.isBackLoaded) {
			return <div className='loading'>Loading...</div>
		} else {
			return (
				<div className="content">
					<div className='form'>
						<input type="text" placeholder='Имя Работника' value={this.state.impName} onChange={event => {this.setState({impName: event.target.value})}}/>
						<input type="number" placeholder='Опыт работы' value={this.state.impExp} onChange={event => {this.setState({impExp: event.target.value})}}/>
						<input type="text" placeholder='Должность' value={this.state.impPosition} onChange={event => {this.setState({impPosition: event.target.value})}}/>
						<input type="number" placeholder='Зарплата' value={this.state.impSalary} onChange={event => {this.setState({impSalary: event.target.value})}}/>
					</div>
					<button onClick={() => {
						console.log(this.state);
						axios.post('http://127.0.0.1:8800/api', {
							method: "setFormData",
							formId: 0,
							data: [this.state.imp_id ,this.state.impName, this.state.impExp, this.state.impPosition, this.state.impSalary]
						}).then((data) => {
							if(data.data?.status !== "ok"){
								console.log("Error")
								console.error(data.data);
								return;
							}

							console.log("Update success")
						})
					}}>Обновить</button>
		
					<table className='table1'>
						<caption>Работники</caption>
						<tbody>
							<tr>
								<th>Имя</th>
								<th>Опыт</th>
								<th>Должность</th>
								<th>Зарплата</th>
							</tr>
								{
									this.state.implementers.map(item => {
										return (
											<tr onClick={() => {this.updateForm(item)}} key={item.imp_id}>
												<td>{item.impName}</td>
												<td>{item.impExp}</td>
												<td>{item.impPosition}</td>
												<td>{item.impSalary}</td>
											</tr>
										)
									})
								}
						</tbody>
					</table>
				</div>
			)
		}
	}


	updateForm = (item) => {
		console.log(item)
		this.setState({
			imp_id: item.imp_id,
			impName: item.impName,
			impExp: item.impExp,
			impPosition: item.impPosition,
			impSalary: item.impSalary,
		})
	};

};