import React from "react"

import SiteBranding from "./SiteBranding"
import MainMenu from "./MainMenu"
import User from "./User"

import { slide as Menu } from 'react-burger-menu'

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            menuOpen: false
        }
    }

    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen })
    }

    closeMenu() {
        this.setState({ menuOpen: false })
    }

    toggleMenu() {
        this.setState(state => ({ menuOpen: !state.menuOpen }))
    }

    render() {
        return (
            <header>
                <div className="container">

                    <SiteBranding />

                    <MainMenu loadTasks={this.props.loadTasks} userId={this.props.userId} onPageChange={this.props.onPageChange} />

                    <User page={this.props.page} onPageChange={this.props.onPageChange} user={this.props.user} />

                    <Menu
                        right
                        width={'90%'}
                        isOpen={this.state.menuOpen}
                        onStateChange={(state) => this.handleStateChange(state)}
                    >
                        <MainMenu loadTasks={this.props.loadTasks} userId={this.props.userId} onPageChange={this.props.onPageChange} />

                        <User page={this.props.page} onPageChange={this.props.onPageChange} user={this.props.user} />
                    </Menu>

                </div>
            </header>
        )
    }
}

export default Header