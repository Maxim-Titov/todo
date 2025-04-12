import React from "react";

class MainMenu extends React.Component {
    render() {
        return (
            <div className="menu">
                <nav>
                    <ul>
                        <li onClick={() => {
                            this.props.onPageChange("folders")
                            this.props.onCloseMenu()
                        }}>Folders</li>
                        <li onClick={() => {
                            this.props.loadTasks(this.props.userId)
                            this.props.onPageChange("tasks")
                            this.props.onCloseMenu()
                        }}>Tasks</li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default MainMenu