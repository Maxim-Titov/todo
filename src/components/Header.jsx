import React from "react";

import SiteBranding from "./SiteBranding";
import Menu from "./Menu";
import User from "./User";

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="container">

                    <SiteBranding />

                    <Menu loadTasks={this.props.loadTasks} userId={this.props.userId} onPageChange={this.props.onPageChange} />

                    <User page={this.props.page} onPageChange={this.props.onPageChange} user={this.props.user} />

                </div>
            </header>
        )
    }
}

export default Header