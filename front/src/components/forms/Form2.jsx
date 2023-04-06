import React from 'react';
import './Form.scss';
import axios from 'axios';


export default class Form2 extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			orderId: -1,
			orderType: '',
			orderPrice: '',
			orderTime: '',
			isBackLoaded: false,
		};
	}
	componentDidMount() {
		if(this.state.isBackLoaded){
			return;
		}
		axios.post('http://127.0.0.1:8800/api', {
			method: "getFormData",
			formId: 1,
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
						<input type="text" placeholder='Тип' value={this.state.orderType} onChange={event => {this.setState({orderType: event.target.value})}}/>
						<input type="number" placeholder='Цена' value={this.state.orderPrice} onChange={event => {this.setState({orderPrice: event.target.value})}}/>
						<input type="number" placeholder='Время' value={this.state.orderTime} onChange={event => {this.setState({orderTime: event.target.value})}}/>
					</div>
					<button onClick={() => {
						console.log(this.state);
						axios.post('http://127.0.0.1:8800/api', {
							method: "setFormData",
							formId: 1,
							data: [this.state.orderId, this.state.orderType, this.state.orderPrice, this.state.orderTime]
						}).then((data) => {
							if(data.data?.status !== "ok"){
								console.log("Error")
								console.error(data.data);
								return;
							}

							console.log("Update success")
						})
					}}>Обновить</button>
		
					<table className='table2'>
						<caption>Расценки</caption>
						<tbody>
							<tr>
								<th>Тип</th>
								<th>Цена</th>
								<th>Время</th>
							</tr>
								{
									this.state.pricings.map(item => {
										return (
											<tr onClick={() => {this.updateForm(item)}} key={item.price_id}>
												<td>{item.orderType}</td>
												<td>{item.orderPrice}</td>
												<td>{item.orderTime}</td>
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
			orderId: item.price_id,
			orderType: item.orderType,
			orderPrice: item.orderPrice,
			orderTime: item.orderTime,
		})
	};

};