import React from 'react';
import './Form.scss';
import axios from 'axios';


export default class Form5 extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			orderId: -1,
			userEmail: '',
			userName: '',
			orderType: '',
			orderPrice: '',
			orderTime: '',
			orderImp: '',
			pricings: [],
			isBackLoaded: false,
		};
	}
	componentDidMount() {
		if(this.state.isBackLoaded){
			return;
		}
		axios.post('http://127.0.0.1:8800/api', {
			method: "getFormData",
			formId: 4,
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
						<input type="email" placeholder='Почта' value={this.state.userEmail} onChange={event => {this.setState({userEmail: event.target.value})}}/>
						<input type="text" placeholder='Имя' value={this.state.userName} onChange={event => {this.setState({userName: event.target.value})}}/>
						<input type="text" placeholder='Тип' value={this.state.orderType} onChange={event => {this.setState({orderType: event.target.value})}}/>
						<input type="number" placeholder='Цена' value={this.state.orderPrice} onChange={event => {this.setState({orderPrice: event.target.value})}}/>
						<input type="number" placeholder='Время' value={this.state.orderTime} onChange={event => {this.setState({orderTime: event.target.value})}}/>
						<input type="text" placeholder='Исполнитель' value={this.state.orderImp} onChange={event => {this.setState({orderImp: event.target.value})}}/>
					</div>
					<button onClick={() => {
						console.log(this.state);
						axios.post('http://127.0.0.1:8800/api', {
							method: "setFormData",
							formId: 4,
							data: [this.state.orderId, this.state.userEmail, this.state.userName, this.state.orderType, this.state.orderPrice, this.state.orderTime, this.state.orderImp]
						}).then((data) => {
							if(data.data?.status !== "ok"){
								console.log("Error")
								console.error(data.data);
								return;
							}

							console.log("Update success")
						})
					}}>Обновить</button>
		
					<table className='table5'>
						<caption>Пользователи</caption>
						<tbody>
							<tr>
								<th>Почта</th>
								<th>Имя</th>
								<th>Тип</th>
								<th>Цена</th>
								<th>Время</th>
								<th>Исполнитель</th>
							</tr>
								{
									this.state.pricings.map(item => {
										return (
											<tr onClick={() => {this.updateForm(item)}} key={item.order_id}>
												<td>{item.userEmail}</td>
												<td>{item.userName}</td>
												<td>{item.orderType}</td>
												<td>{item.orderPrice}</td>
												<td>{item.orderTime}</td>
												<td>{item.orderImp}</td>
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
			orderId: item.order_id,
			userEmail: item.userEmail,
			userName: item.userName,
			orderType: item.orderType,
			orderPrice: item.orderPrice,
			orderTime: item.orderTime,
			orderImp: item.orderImp,
		})
	};

};