import React from 'react';
import './Form.scss';
import axios from 'axios';


export default class Form4 extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			userId: -1,
			userName: '',
			userEmail: '',
			userOrderCount: '',
			isBackLoaded: false,
		};
	}
	componentDidMount() {
		if(this.state.isBackLoaded){
			return;
		}
		axios.post('http://127.0.0.1:8800/api', {
			method: "getFormData",
			formId: 3,
		}).then((data)=>{
			if(data.data?.status !== "ok"){
				console.log("Error")
				console.error(data.data);
				return;
			}
			this.setState({
				isBackLoaded: true,
				pricings: data.data.data
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
						<input type="text" placeholder='Имя' value={this.state.userName} onChange={event => {this.setState({userName: event.target.value})}}/>
						<input type="email" placeholder='Почта' value={this.state.userEmail} onChange={event => {this.setState({userEmail: event.target.value})}}/>
						<input type="number" placeholder='Кол-во заказов' value={this.state.userOrderCount} onChange={event => {this.setState({userOrderCount: event.target.value})}}/>
					</div>
					<button onClick={() => {
						console.log(this.state);
						axios.post('http://127.0.0.1:8800/api', {
							method: "setFormData",
							formId: 3,
							data: [this.state.userId, this.state.userName, this.state.userEmail, this.state.userOrderCount]
						}).then((data) => {
							if(data.data?.status !== "ok"){
								console.log("Error")
								console.error(data.data);
								return;
							}

							console.log("Update success")
						})
					}}>Обновить</button>
		
					<table className='table4'>
						<caption>Пользователи</caption>
						<tbody>
							<tr>
								<th>Имя</th>
								<th>Почта</th>
								<th>Кол-во заказов</th>
							</tr>
								{
									this.state.pricings.map(item => {
										return (
											<tr onClick={() => {this.updateForm(item)}} key={item.id}>
												<td>{item.userName}</td>
												<td>{item.userEmail}</td>
												<td>{item.userOrderCount}</td>
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
		console.log(item);
		this.setState({
			userId: item.id,
			userName: item.userName,
			userEmail: item.userEmail,
			userOrderCount: item.userOrderCount,
		})
	};

};