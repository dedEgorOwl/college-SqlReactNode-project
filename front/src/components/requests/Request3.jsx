import React from "react";
import './Request.scss';
import axios from "axios";

export default class Request3 extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			implementers: [],
			isBackLoaded: false
		};
	}

	componentDidMount() {
		if(this.state.isBackLoaded){
			return;
		}
		axios.post('http://127.0.0.1:8800/api', {
			method: "getFormData",
			formId: 8,
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
		const countAll = (items) => {
			let counted = 0;
			items.map(item => {
				counted += item.impSalary;
			});
			return counted;
		};

		if (!this.state.isBackLoaded) {
			return <div>Loading...</div>
		} else {

			return (
				<div className="content">
					<table>
						<caption>Зарплаты</caption>
						<tbody>
							<tr>
								<th>Имя</th>
								<th>Должность</th>
								<th>Кол-во</th>
							</tr>
							{
								this.state.implementers.map(item => {
									return (
										<tr key={item.imp_id}>
											<td>{item.impName}</td>
											<td>{item.impPosition}</td>
											<td>{item.impSalary}</td>
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
								<th></th>
								<th>{countAll(this.state.implementers)}</th>
							</tr>
						</tbody>
					</table>
				</div>
			)
		}
	}

}