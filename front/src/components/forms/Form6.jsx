import React from 'react';
import './Form.scss';
import axios from 'axios';


export default class Form6 extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			photoId: -1,
			photoName: '',
			photoPath: '',
			isBackLoaded: false,
		};
	}
	componentDidMount() {
		if(this.state.isBackLoaded){
			return;
		}
		axios.post('http://127.0.0.1:8800/api', {
			method: "getFormData",
			formId: 5,
		}).then((data)=>{
			if(data.data?.status !== "ok"){
				console.log("Error")
				console.error(data.data);
				return;
			}
			this.setState({
				isBackLoaded: true,
				photos: data.data.data
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
						<input type="text" placeholder='Название' value={this.state.photoName} onChange={event => {this.setState({photoName: event.target.value})}}/>
						<input type="text" placeholder='Путь' value={this.state.photoPath} onChange={event => {this.setState({photoPath: event.target.value})}}/>
					</div>
					<button onClick={() => {
						console.log(this.state);
						axios.post('http://127.0.0.1:8800/api', {
							method: "setFormData",
							formId: 5,
							data: [this.state.photoId, this.state.photoName, this.state.photoPath]
						}).then((data) => {
							if(data.data?.status !== "ok"){
								console.log("Error")
								console.error(data.data);
								return;
							}

							console.log("Update success")
						})
					}}>Обновить</button>
		
					<table className='table6'>
						<caption>Фото</caption>
						<tbody>
							<tr>
								<th>Название</th>
								<th>Путь</th>
							</tr>
								{
									this.state.photos.map(item => {
										return (
											<tr onClick={() => {this.updateForm(item)}} key={item.photo_id}>
												<td>{item.photoName}</td>
												<td>{item.photoPath}</td>
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
			photoId: item.photo_id,
			photoName: item.photoName,
			photoPath: item.photoPath
		})
	};

};