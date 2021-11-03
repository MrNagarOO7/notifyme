import React, { PureComponent } from 'react';
import logo from '../../assets/main-logo.png';
import bellLogo from '../../assets/bell-logo.png';
import socket from '../../services/socket.js';
import './Header.scss';

class Header extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			client: socket(),
			list: false,
			data: []
		};
		this.socketClient = socket();
		this.notificationLisRef = React.createRef();
	}

	liveData = (data) => {
		this.setState({data});
	};

	sendNotification = () => {
		this.socketClient.sendNotification();
	};

	fetchInitialNotification = () => {
		this.socketClient.fetchInitialNotification();
	};

	deleteAllNotification = () => {
		this.socketClient.deleteAllNotification();
	};

	handleClickOutside = (event) => {
		if (this.notificationLisRef && this.notificationLisRef.current &&
			!this.notificationLisRef.current.contains(event.target)) {
			const {list} = this.state;
			if(list) this.setState({list: false});
		}
	};

	componentDidMount() {
		this.socketClient.fetchNotification(this.liveData);
		this.fetchInitialNotification();
		document.addEventListener('mousedown', this.handleClickOutside);
	};

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	};

	render() {
		const {list, data} = this.state;

		return(
			<div className="header">
				<div className={"left-side"}>
					<img src={logo} className="app-logo" alt="logo" />
				</div>
				<div className={"right-side"}>
					<img
						onClick={() => {
							this.setState({list: !list})
						}}
						src={bellLogo} className="app-logo" alt="logo"/>
					<button
						onClick={this.sendNotification}

						>Send Notification</button>
					{
						list &&
						<div ref={this.notificationLisRef} className={'notification-list'}>
							<ul>
								{
									data.length > 0 &&
										<li
											onClick={this.deleteAllNotification}
											style={{textAlign: 'center', color: 'red'}}>
											<span>
												<b>Delete All</b>
											</span>
										</li>
								}
								{
									data.length > 0 && data.reverse().map(({title, body}) => {
										return(
											<li>
												<span>
													<b>{title}</b>
													<p>{body}</p>
												</span>
											</li>
										)
									})
								}
								{
									!data.length &&
									<li>
										<span>
											<b>No Notifications.</b>
											<p>Click Button to Get Notification</p>
										</span>
									</li>
								}
							</ul>
						</div>
					}
				</div>
			</div>
		)
	}
}

export default Header;