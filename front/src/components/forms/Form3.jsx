import React from 'react';
import './Form.scss';
import axios from 'axios';


export default class Form3 extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			prizeId: -1,
			prizePosition: '',
			prizeValue: '',
			isBackLoaded: false,
		};
	}
	componentDidMount() {
		if(this.state.isBackLoaded){
			return;
		}
		axios.post('http://127.0.0.1:8800/api', {
			method: "getFormData",
			formId: 2,
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
						<input type="text" placeholder='Должность' value={this.state.prizePosition} onChange={event => {this.setState({prizePosition: event.target.value})}}/>
						<input type="number" placeholder='Кол-во' value={this.state.prizeValue} onChange={event => {this.setState({prizeValue: event.target.value})}}/>
					</div>
					<button onClick={() => {
						console.log(this.state);
						axios.post('http://127.0.0.1:8800/api', {
							method: "setFormData",
							formId: 2,
							data: [this.state.prizeId, this.state.prizePosition, this.state.prizeValue]
						}).then((data) => {
							if(data.data?.status !== "ok"){
								console.log("Error")
								console.error(data.data);
								return;
							}

							console.log("Update success")
						})
					}}>Обновить</button>
		
					<table className='table3'>
						<caption>Премии</caption>
						<tbody>
							<tr>
								<th>Должность</th>
								<th>Кол-во</th>
							</tr>
								{
									this.state.pricings.map(item => {
										return (
											<tr onClick={() => {this.updateForm(item)}} key={item.prize_id}>
												<td>{item.prizePosition}</td>
												<td>{item.prizeValue}</td>
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
			prizeId: item.prize_id,
			prizePosition: item.prizePosition,
			prizeValue: item.prizeValue
		})
	};

};