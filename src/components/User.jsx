import React from "react";

import UserImg from "../images/user.png";

class User extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userImg: UserImg
        }
    }

    render() {
        if (this.props.user.userImg) {
            this.setState({
                userImg: this.props.user.userImg
            })
        }

        return (
            <div style={{ visibility: this.props.page === "profile" ? "hidden" : "visible" }} className="user" onClick={() => this.props.onPageChange("profile")}>
                <p className="user-name">{this.props.user.username}</p>
                <img src={this.state.userImg} alt="user logo" />
            </div>
        )
    }
}

export default User