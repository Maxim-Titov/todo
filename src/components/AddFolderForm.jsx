import React from "react"

class AddFolderForm extends React.Component {
    FolderAdd = {}

    constructor(props) {
        super(props)

        this.state = {
            folder_title: ""
        }
    }

    render() {
        return (
            <div className="add-folder-form">
                <form ref={(el) => { this.myForm = el }}>
                    <input type="text" name="folder-title" id="folder-title" placeholder="Folder name" onChange={(el) => {
                        this.setState({
                            folder_title: el.target.value
                        })
                    }} /> <br />

                    <button type="button" onClick={() => {
                        this.myForm.reset()

                        this.FolderAdd = {
                            user_id: this.props.userId,
                            folder_title: this.state.folder_title
                        }

                        this.props.onFolderAdd(this.FolderAdd)

                        this.setState({
                            folder_title: ""
                        })
                    }}>Add Folder</button>
                </form>
            </div>
        )
    }
}

export default AddFolderForm