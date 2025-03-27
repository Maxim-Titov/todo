import React from "react"

class RenameFolderForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            folder_title: this.props.folderName
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    handleChange(el) {
        this.setState({ folder_title: el.target.value })
    }

    handleSave() {
        this.props.onRename(this.props.folderId, this.state.folder_title)

        this.props.onClose()
    }

    render() {
        return (
            <form>
                <input type="text" name="folder-title" id="folder-title" value={this.state.folder_title} onChange={this.handleChange} /> <br />

                <button type="button" onClick={this.handleSave}>Save</button>
            </form >
        )
    }
}

export default RenameFolderForm