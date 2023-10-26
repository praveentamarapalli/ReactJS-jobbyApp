import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: 'rahul',
    password: 'rahul@2021',
    showPassword: false,
    showError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showError: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  render() {
    const {username, password, showPassword, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form onSubmit={this.onSubmitForm} className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <input
            type="input"
            value={username}
            id="username"
            placeholder="Username"
            className="input"
            onChange={this.onChangeUsername}
          />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            id="password"
            placeholder="Password"
            className="input"
            onChange={this.onChangePassword}
          />
          <div className="showPassword">
            <input
              type="checkbox"
              className="checkbox"
              id="showPassword"
              onChange={this.onClickShowPassword}
            />
            <label htmlFor="showPassword" className="checkboxLabel">
              Show Password
            </label>
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
          {showError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
