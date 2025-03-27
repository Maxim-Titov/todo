import React from "react"

import ChangeThemeForm from "./ChangeThemeForm"

import { FcExport } from "react-icons/fc";

import UserImg from "../images/user.png"

class UserProfile extends React.Component {
    handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            this.props.onLogout()
        }
    }

    render() {
        const { user } = this.props

        return (
            <div className="user-profile">
                <div className="user">
                    <img src={UserImg} alt="user logo" />
                    <h1 className="user-name">{user.username}</h1>
                </div>

                <div className="about-and-settings">
                    <div className="about">
                        <h2>- About -</h2>

                        <div className="content">
                            <p>Name: {user.username}</p>
                            <p>Login: {user.login}</p>
                        </div>
                    </div>

                    <div className="settings">
                        <h2>- Settings -</h2>

                        <div className="content">
                            <ChangeThemeForm onChangeTheme={this.props.onChangeTheme} theme={this.props.theme} />

                            <div className="logout-btn">
                                <p>Log out: </p>

                                <FcExport className="logout-button" onClick={this.handleLogout} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile