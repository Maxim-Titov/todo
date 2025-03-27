import React from "react"

class AddTaskForm extends React.Component {
    TaskAdd = {}

    constructor(props) {
        super(props)

        this.state = {
            taskTitle: "",
            taskContent: "",
            priority: "1"
        }
    }

    render() {
        return (
            <div className="add-task-form">
                <form ref={(el) => { this.myForm = el }}>
                    <input type="text" name="taskTitle" id="task-title" placeholder="Task title" onChange={(el) => {
                        this.setState({
                            taskTitle: el.target.value
                        })
                    }} /> <br />

                    <textarea name="taskContent" id="task-content" placeholder="Task content" onChange={(el) => {
                        this.setState({
                            taskContent: el.target.value
                        })
                    }} ></textarea> <br />

                    <label htmlFor="task-priority">Priority</label>
                    <select name="priority" id="task-priority" onChange={(el) => {
                        this.setState({
                            priority: el.target.value
                        })
                    }} >
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                    </select> <br />

                    <button type="button" onClick={() => {
                        this.myForm.reset()

                        this.TaskAdd = {
                            user_id: this.props.userId,
                            folder_id: this.props.folderId,
                            task_title: this.state.taskTitle,
                            task_content: this.state.taskContent,
                            priority: this.state.priority,
                        }

                        this.props.onTaskAdd(this.TaskAdd)

                        this.setState({
                            taskTitle: "",
                            taskContent: "",
                            priority: "1"
                        })
                    }}>Add Task</button>
                </form>
            </div>
        )
    }
}

export default AddTaskForm
