import React from "react";
import './Request.scss';
import axios from "axios";

export default class Request1 extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			users: [],
			isBackLoaded: false
		};
	}

	componentDidMount() {
		if(this.state.isBackLoaded){
			return;
		}
		axios.post('http://127.0.0.1:8800/api', {
			method: "getFormData",
			formId: 6,
		}).then((data)=>{
			if(data.data?.status !== "ok"){
				console.log("Error")
				console.error(data.data);
				return;
			}
			this.setState({
				isBackLoaded: true,
				users: data.data.data
			});
		})
	}


	render() {
		const countAll = (items) => {
			let counted = 0;
			items.map(item => {
				counted += item.userOrderCount;
			});
			return counted;
		};

		if (!this.state.isBackLoaded) {
			return <div>Loading...</div>
		} else {

			return (
				<div className="content">
					<table>
						<caption>Кол-во заказов</caption>
						<tbody>
							<tr>
								<th>Имя</th>
								<th>Кол-во заказов</th>
							</tr>
							{
								this.state.users.map(item => {
									return (
										<tr key={item.id}>
											<td>{item.userName}</td>
											<td>{item.userOrderCount}</td>
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
								<th>{countAll(this.state.users)}</th>
							</tr>
						</tbody>
					</table>
				</div>
			)
		}
	}

}