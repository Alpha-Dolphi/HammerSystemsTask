import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Card, Table, Tag, Tooltip, message, Button, Descriptions  } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import UserView from './UserView';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { fetchUsersRequest, deleteUserRequest } from '../../../redux/actions/User';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

export class UserList extends Component {

	state = {
		userProfileVisible: false,
		selectedUser: null
	}

	deleteUser = userId => {
		this.props.deleteUserRequest(userId);
		message.success({ content: `Deleted user ${userId}`, duration: 2 });
	}

	showUserProfile = userInfo => {
		console.log("userInfo = ", userInfo);

		this.setState({
			userProfileVisible: true,
			selectedUser: userInfo
		});
	};

	closeUserProfile = () => {
		this.setState({
			userProfileVisible: false,
			selectedUser: null
    });
	}

	componentDidMount() {
		const { userData } = this.props;

		if (!userData.length) {
			this.props.fetchUsersRequest();
		}
	}

	render() {
		const { userData } = this.props;

		const { userProfileVisible, selectedUser } = this.state;

		const tableColumns = [
			{
				title: 'User',
				dataIndex: 'name',
				render: (_, record) => (
					<div className="d-flex">
						<AvatarStatus name={record.name} subTitle={record.email}/>
					</div>
				),
				sorter: {
					compare: (a, b) => {
						a = a.name.toLowerCase();
  						b = b.name.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Website',
				dataIndex: 'website',
			},
			{
				title: 'Phone',
				dataIndex: 'phone',
			},
			{
				title: 'Address',
				dataIndex: 'address',
				render: address => (
					<div className="d-grid">
      					<p className='mb-n1'><strong>Street:</strong> {address.street}</p>
      					<p className='mb-n1'><strong>Suite:</strong> {address.suite}</p>
      					<p className='mb-n1'><strong>City:</strong> {address.city}</p>
      					<p className='mb-n1'><strong>Zipcode:</strong> {address.zipcode}</p>
    				</div>
				),
			},
			{
				title: '',
				dataIndex: 'actions',
				render: (_, elm) => (
					<div className="text-right">
						<Tooltip title="Edit">
							<Link to={`${APP_PREFIX_PATH}/home/clients/list/edit-profile/${elm.id}`}>
								<Button className="mr-2 bg-success text-white" icon={<EditOutlined />} size="small"/>
							</Link>
						</Tooltip>
						<Tooltip title="View">
							<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {this.showUserProfile(elm)}} size="small"/>
						</Tooltip>
						<Tooltip title="Delete">
							<Button danger icon={<DeleteOutlined />} onClick={()=> {this.deleteUser(elm.id)}} size="small"/>
						</Tooltip>
					</div>
				)
			}
		];

		return (
			<Card bodyStyle={{'padding': '0px'}}>
				<Table columns={tableColumns} dataSource={userData} rowKey='id' />
				<UserView data={selectedUser} visible={userProfileVisible} close={()=> {this.closeUserProfile()}}/>
			</Card>
		)
	}
}

const mapStateToProps = state => ({
	userData: state.user.users
});


const mapDispatchToProps = {
	fetchUsersRequest,
	deleteUserRequest
  };

export default connect(mapStateToProps, mapDispatchToProps)(UserList);