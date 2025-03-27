import React from "react"

import Task from "./Task"

import { FcPrevious } from "react-icons/fc"

class InFolderTasks extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            folder: {}
        }

        this.getFolder = this.getFolder.bind(this)
    }

    componentDidMount() {
        this.getFolder(this.props.folderId)
    }

    getFolder(folder_id) {
        for (let i = 0; i < this.props.folder.length; i++) {
            if (this.props.folder[i].folder_id === folder_id) {
                this.setState({
                    folder: this.props.folder[i]
                })
            }
        }
    }

    render() {
        if (this.props.tasks.length > 0) {
            return (
                <div className="in-folder-tasks">
                    <FcPrevious className="back-btn" onClick={() => this.props.onPageChange("folders")} />

                    <h2 className="folder-title">- {this.state.folder.folder_title} -</h2>

                    <div className="folder-tasks">
                        {this.props.tasks.map((task) => (
                            <Task key={task.task_id} folders={this.props.folder} task={task} toggleTaskSelection={this.props.toggleTaskSelection} selectedTasks={this.props.selectedTasks} />
                        ))}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="in-folder-tasks">
                    <FcPrevious className="back-btn" onClick={() => this.props.onPageChange("folders")} />

                    <h2 className="folder-title">- {this.state.folder.folder_title} -</h2>
                    <p>No tasks found</p>
                </div>
            )
        }
    }
}

export default InFolderTasks