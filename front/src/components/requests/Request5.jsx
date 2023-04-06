import React from "react";
import './Request.scss';
import axios from "axios";

export default class Request5 extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			orders: [],
			isBackLoaded: false
		};
	}

	componentDidMount() {
		if(this.state.isBackLoaded){
			return;
		}
		axios.post('http://127.0.0.1:8800/api', {
			method: "getFormData",
			formId: 10,
		}).then((data)=>{
			if(data.data?.status !== "ok"){
				console.log("Error")
				console.error(data.data);
				return;
			}
			this.setState({
				isBackLoaded: true,
				orders: data.data.data
			});
		})
	}


	render() {
		const countAll = (items) => {
			let counted = 0;
			items.map(item => {
				counted += item.orderPrice;
			});
			return counted;
		};

		if (!this.state.isBackLoaded) {
			return <div>Loading...</div>
		} else {

			return (
				<div className="content">
					<table>
						<caption>Заказы</caption>
						<tbody>
							<tr>
								<th>Почта</th>
								<th>Цена</th>
							</tr>
							{
								this.state.orders.map(item => {
									return (
										<tr key={item.order_id}>
											<td>{item.userEmail}</td>
											<td>{item.orderPrice}</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
					<table>
						<tbody>
							<tr>
								<th>Итого:</th>
								<th>{countAll(this.state.orders)}</th>
							</tr>
						</tbody>
					</table>
				</div>
			)
		}
	}

}