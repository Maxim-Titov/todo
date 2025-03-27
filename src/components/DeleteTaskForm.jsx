import React from "react"

class DeleteTaskForm extends React.Component {
    render() {
        return (
            <div className="delete-tasks-form">
                <button onClick={this.props.deleteTasks} type="button">Delete completed tasks</button>
            </div>
        )
    }
}

export default DeleteTaskForm