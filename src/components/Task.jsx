import React from "react"

import { FcLowPriority, FcMediumPriority, FcHighPriority } from "react-icons/fc";

class Task extends React.Component {
    setPriority() {
        if (this.props.task.priority === 1) {
            return (
                <FcLowPriority className="priority" />
            )
        } else if (this.props.task.priority === 2) {
            return (
                <FcMediumPriority className="priority" />
            )
        } else {
            return (
                <FcHighPriority className="priority" />
            )
        }
    }

    getFolderTitle(folder_id) {
        for (let i = 0; i < this.props.folders.length; i++) {
            if (this.props.folders[i].folder_id === folder_id) {
                return this.props.folders[i].folder_title
            }
        }
    }

    render() {
        return (
            <div className="task">
                <input type="checkbox" name="done" className="done" checked={this.props.selectedTasks.includes(this.props.task.task_id)}
                    onChange={(e) => {
                        this.props.toggleTaskSelection(this.props.task.task_id)

                        const taskElement = e.target.closest(".task")

                        if (e.target.checked) {
                            taskElement.classList.add("checked")
                        } else {
                            taskElement.classList.remove("checked")
                        }
                    }} />

                <div className="content">
                    <div className="task-header">
                        <div className="task-title">
                            <h2>{this.props.task.task_title}</h2>

                            {this.setPriority()}
                        </div>

                        <p>{this.getFolderTitle(this.props.task.folder_id)}</p>
                    </div>

                    <p>{this.props.task.task_content}</p>
                </div>
            </div>
        )
    }
}

export default Task