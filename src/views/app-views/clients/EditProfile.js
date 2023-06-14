import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Form, Avatar, Button, Input, DatePicker, Row, Col, message, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex'
import { updateAvatarUrl, fetchUsersRequest, updateUserRequest, setUpdatedUserToIdle } from '../../../redux/actions/User';
import { LoadingStatuses } from '../../../constants/loadingStatuses';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

export class EditProfile extends Component {

	avatarEndpoint = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'

    componentDidMount() {
        const { userData } = this.props;

        if (!userData.length) {
			this.props.fetchUsersRequest();
		}

      }

	getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	componentDidUpdate() {
		const { updatedUser, history } = this.props;
		const key = 'updatable';

        if (updatedUser === LoadingStatuses.success) {
            message.success({ content: 'Done!', key, duration: 2 });
            this.props.setUpdatedUserToIdle();
            history.push(`${APP_PREFIX_PATH}/home/clients/list`);
        } else if (updatedUser === LoadingStatuses.inProgress) {
            message.loading({ content: 'Updating...', key });
        } else if (updatedUser === LoadingStatuses.failed) {
            message.error({ content: 'Error updating user!', key, duration: 2 });
        }
	}

	render() {
        const { match, userData } = this.props;
        const userId = +match.params.id;

        const user = userData.find((user) => user.id === userId);

		const onFinish = (values) => {

              this.props.updateUserRequest(user.id, {
                ...user,
                name: values.name,
                username: values.username,
                email: values.email,
                phone: values.phone,
                website: values.website,
                address: {
                  ...user.address,
                  street: values.street,
                  suite: values.suite,
                  city: values.city,
                  zipcode: values.zipcode,
                },
              });
          };


		const onFinishFailed = errorInfo => {
			console.log('Failed:', errorInfo);
		};

		const onUploadAavater = info => {
			const key = 'updatable';
			if (info.file.status === 'uploading') {
				message.loading({ content: 'Uploading...', key, duration: 1000 });
				return;
			}
			if (info.file.status === 'done') {
				this.getBase64(info.file.originFileObj, imageUrl =>
					this.setState({
						avatarUrl: imageUrl,
					}),
				);
				message.success({ content: 'Uploaded!', key,  duration: 1.5 });
			}
		};

		const onRemoveAvater = () => {
			this.setState({
				avatarUrl: ''
			})
		}

        if (!user) {
            return <></>
        }

		const { name, email, username, phone, website, address, city, postcode, avatarUrl } = user;

		return (
			<>
				<Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
					<Avatar size={90} src={avatarUrl} icon={<UserOutlined />}/>
					<div className="ml-md-3 mt-md-0 mt-3">
						<Upload onChange={onUploadAavater} showUploadList={false} action={this.avatarEndpoint}>
							<Button type="primary">Change Avatar</Button>
						</Upload>
						<Button className="ml-2" onClick={onRemoveAvater}>Remove</Button>
					</div>
				</Flex>
				<div className="mt-4">
					<Form
						name="basicInformation"
						layout="vertical"
						initialValues={
							{
								'name': name,
								'email': email,
								'username': username,
								'phone': phone,
								'website': website,
								'street': address.street,
								'suite': address.suite,
								'city': address.city,
								'zipcode': address.zipcode
							}
						}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Row>
							<Col xs={24} sm={24} md={24} lg={16}>
								<Row gutter={ROW_GUTTER}>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Name"
											name="name"
											rules={[
												{
													required: true,
													message: 'Please input your name!',
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Username"
											name="username"
											rules={[
												{
													required: true,
													message: 'Please input your username!'
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Email"
											name="email"
											rules={[{
												required: true,
												type: 'email',
												message: 'Please enter a valid email!'
											}]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Phone Number"
											name="phone"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Website"
											name="website"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="City"
											name="city"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={24}>
										<Form.Item
											label="Street"
											name="street"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={24}>
										<Form.Item
											label="Suite"
											name="suite"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Zipcode"
											name="zipcode"
										>
											<Input />
										</Form.Item>
									</Col>
								</Row>
								<Button type="primary" htmlType="submit">
									Save Change
								</Button>
							</Col>
						</Row>
					</Form>
				</div>
			</>
		)
	}
}

const mapStateToProps = state => ({
	userData: state.user.users,
    updatedUser: state.user.updatedUser
});

const mapDispatchToProps = {
	updateAvatarUrl,
    fetchUsersRequest,
    updateUserRequest,
    setUpdatedUserToIdle
  };

  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
  )(EditProfile);
