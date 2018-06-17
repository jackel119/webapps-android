import React, { Component } from 'react';
import { ImageBackground, View, Text, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Spinner } from './common';

class LoginForm extends Component {
	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChang(text) {
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { email, password } = this.props;

		this.props.loginUser({ email, password });
	}

	renderButton() {
		if (this.props.loading) {
			return (
			<View style={styles.loginButtonStyle}>
				<Spinner size="large" />
			</View>);
		}
		return (
			<TouchableOpacity style={styles.loginButtonStyle} onPress={this.onButtonPress.bind(this)}>
				<Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Log In</Text>
			</TouchableOpacity>
		);
	}

	renderError() {
		if (this.props.error) {
			return (
				<View style={{ backgroundColor: 'white' }}>
					<Text style={styles.errorTextStyle}>
						{this.props.error}
					</Text>
				</View>
			);
		}
	}

	render() {
		return (
			<ImageBackground
      source={require('./Img/login.jpg')}
      style={styles.imageStyle}
			>
			<View style={styles.containerStyle}>
				<View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.6 }}>
					<Text style={{ fontSize: 50, color: 'white', fontWeight: 'bold' }}>SHARETrack</Text>
				</View>
				<View style={styles.loginStyle}>
					<StatusBar barStyle="dark-content" />
					<View style={{ borderRadius: 10 }}>
					<View style={styles.cardStyle}>
						<TextInput
							placeholder="email@gmail.com"
							placeholderTextColor='rgba(255, 255, 255, 0.3)'
							autoCorrect={false}
							style={styles.inputStyle}
							value={this.props.email}
							onChangeText={this.onEmailChange.bind(this)}
						/>
					</View>
					<View style={styles.cardStyle}>
						<TextInput
							secureTextEntry
							placeholder="password"
							placeholderTextColor='rgba(255, 255, 255, 0.3)'
							autoCorrect={false}
							style={styles.inputStyle}
							value={this.props.password}
							onChangeText={this.onPasswordChang.bind(this)}
						/>
					</View>
					</View>

					{this.renderError()}

					<View>
						{this.renderButton()}
					</View>
					<View>
					<TouchableOpacity style={styles.signupButtonStyle}>
						<Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Sign Up</Text>
					</TouchableOpacity>
					</View>
				</View>
			</View>
			</ImageBackground>
		);
	}
}

const styles = {
	containerStyle: {
		flex: 1,
	},
	loginStyle: {
		paddingHorizontal: 50,
		flex: 0.4,
	},
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	},
	imageStyle: {
		justifyContent: 'center',
		alignContent: 'space-between',
		flex: 1,
		width: null //to make sure the img spread across the page
	},
	inputStyle: {
		color: 'white',
		fontSize: 18,
		lineHeight: 23,
		flex: 2
	},
	labelStyle: {
		color: 'white',
		fontSize: 18,
		paddingLeft: 20,
		flex: 1
	},
	cardStyle: {
		borderRadius: 5,
		paddingHorizontal: 20,
		alignItems: 'center',
		marginBottom: 2,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		position: 'relative'
	},
	loginButtonStyle: {
		borderRadius: 10,
		alignItems: 'center',
		marginBottom: 2,
		marginTop: 10,
		height: 40,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		justifyContent: 'center',
		position: 'relative'
	},
	signupButtonStyle: {
		borderRadius: 10,
		alignItems: 'center',
		marginBottom: 2,
		marginTop: 5,
		height: 40,
		backgroundColor: 'rgba(255, 255, 255, 0.4)',
		justifyContent: 'center',
		position: 'relative',
	}
};

const mapStateToProps = state => {
	const { email, password, error, loading } = state.auth;
	return { email, password, error, loading };
};

export default connect(mapStateToProps, {
	emailChanged,
	passwordChanged,
	loginUser
})(LoginForm);
