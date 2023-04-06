import React from "react";
import './Request.scss';
import axios from "axios";

export default class Request2 extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			photos: [],
			isBackLoaded: false
		};
	}

	componentDidMount() {
		if(this.state.isBackLoaded){
			return;
		}
		axios.post('http://127.0.0.1:8800/api', {
			method: "getFormData",
			formId: 9,
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
		const countAll = (items) => {
			let counted = 0;
			items.map(item => {
				counted += 1;
			});
			return counted;
		};

		if (!this.state.isBackLoaded) {
			return <div>Loading...</div>
		} else {
			return (
				<div className="content">
					<table>
						<caption>Фото</caption>
						<tbody>
							<tr>
								<th>Тема</th>
								<th>Путь</th>
							</tr>
							{
								this.state.photos.map(item => {
									return (
										<tr key={item.photo_id}>
											<td>{item.photoName}</td>
											<td>{item.photoPath}</td>
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
								<th>{countAll(this.state.photos)}</th>
							</tr>
						</tbody>
					</table>
				</div>
			)
		}
	}

}