import React from "react";

import Task from "./Task";

class Tasks extends React.Component {
    render() {
        if (this.props.tasks.length > 0) {
            return (
                <div className="tasks">
                    {this.props.tasks.map((task) => (

                        <Task folders={this.props.folders} key={task.task_id} task={task} toggleTaskSelection={this.props.toggleTaskSelection} selectedTasks={this.props.selectedTasks} />

                    ))}
                </div>
            )
        } else {
            return (
                <p>No tasks found</p>
            )
        }
    }
}

export default Tasks