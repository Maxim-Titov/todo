import React from "react"
import axios from "axios"

import Message from "./Message"

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            login: "",
            password: "",
            error: null,
            message: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.showMessage = this.showMessage.bind(this)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()

        const { login, password } = this.state;

        axios.post("http://localhost/todo-backend/login.php", {
            login,
            password
        }).then((res) => {
            if (res.data.success) {
                this.props.onLogin(res.data.user)
            } else if (res.data.error) {
                this.setState({ error: res.data.error })
                this.setState({ message: true })
            } else {
                this.setState({ error: res.data.message })
            }
        }).catch((error) => {
            console.error("Login error:", error)

            this.setState({ error: "Login error" })
        })
    }

    showMessage() {
        this.setState({
            message: false
        })
    }

    render() {
        return (
            <div className="login-form">
                {this.state.message && <Message message={this.state.error} onShowMessage={this.showMessage} />}

                <div className="form-content">
                    <h2>Login</h2>

                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="login" placeholder="Login" value={this.state.login} onChange={this.handleChange} required /> <br />
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required /> <br />

                        <button type="submit">Login</button>
                    </form>

                    <p>Don't have an account? <button onClick={this.props.onChangePage}>Register</button></p>
                </div>
            </div>
        )
    }
}

export default Login