import React, { PureComponent } from 'react';
import logo from '../../assets/main-logo.png';
import bellLogo from '../../assets/bell-logo.png';
import './Header.scss';

class Header extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			list: false,
			data: [
				{
					title: 'Notification 1',
					body: 'Hello, This is Notification 1.'
				},
				{
					title: 'Notification 2',
					body: 'Hello, This is Notification 2.'
				}
			]
		}
	}

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
					<button>Send Notification</button>
					{
						list &&
						<div className={'notification-list'}>
							<ul>
								{
									data.map(({title, body}) => {
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
							</ul>
						</div>
					}
				</div>
			</div>
		)
	}
}

export default Header;