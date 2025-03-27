import React from "react"
import axios from "axios"

import Message from "./Message"

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            login: "",
            password: "",
            error: null,
            message: false
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.showMessage = this.showMessage.bind(this)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()

        const { username, login, password } = this.state;

        axios.post("http://localhost/todo-backend/register.php", {
            username,
            login,
            password
        }).then((res) => {
            if (res.data.success) {
                this.props.onLogin(res.data.user)
                this.setState({ error: res.data.success })
                this.setState({ message: true })
            } else if (res.data.error) {
                this.setState({ error: res.data.error })
                this.setState({ message: true })
            } else {
                this.setState({ error: res.data.message })
            }
        }).catch((error) => {
            console.error("Register error:", error);
            this.setState({ error: "Register error" })
        });
    }

    showMessage() {
        this.setState({
            message: false
        })
    }

    render() {
        return (
            <div className="register-form">
                <div className="form-content">
                    <h2>Register</h2>

                    {this.state.message && <Message message={this.state.error} onShowMessage={this.showMessage} />}

                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="username" placeholder="Name" value={this.state.username} onChange={this.handleChange} required /> <br />
                        <input type="text" name="login" placeholder="Login" value={this.state.login} onChange={this.handleChange} required /> <br />
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required /> <br />

                        <button type="submit">Register</button>
                    </form>

                    <p>Have an account? <button onClick={this.props.onChangePage}>Login</button></p>
                </div>
            </div>
        )
    }
}

export default Register