import React from "react";
import './Request.scss';
import axios from "axios";

export default class Request2 extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			prizes: [],
			isBackLoaded: false
		};
	}

	componentDidMount() {
		if(this.state.isBackLoaded){
			return;
		}
		axios.post('http://127.0.0.1:8800/api', {
			method: "getFormData",
			formId: 7,
		}).then((data)=>{
			if(data.data?.status !== "ok"){
				console.log("Error")
				console.error(data.data);
				return;
			}
			this.setState({
				isBackLoaded: true,
				prizes: data.data.data
			});
		})
	}


	render() {
		const countAll = (items) => {
			let counted = 0;
			items.map(item => {
				counted += item.prizeValue;
			});
			return counted;
		};

		if (!this.state.isBackLoaded) {
			return <div>Loading...</div>
		} else {

			return (
				<div className="content">
					<table>
						<caption>Премии</caption>
						<tbody>
							<tr>
								<th>Должность</th>
								<th>Кол-во</th>
							</tr>
							{
								this.state.prizes.map(item => {
									return (
										<tr key={item.prize_id}>
											<td>{item.prizePosition}</td>
											<td>{item.prizeValue}</td>
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
								<th>{countAll(this.state.prizes)}</th>
							</tr>
						</tbody>
					</table>
				</div>
			)
		}
	}

}