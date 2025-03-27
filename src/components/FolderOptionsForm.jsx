import React from "react"

class FolderOptionsForm extends React.Component {

    render() {
        return (
            <form>
                <button type="button" onClick={this.props.onRenameClick}>Rename</button> <br />

                <button type="button" onClick={() => { this.props.onDelete(this.props.folderId) }}>Delete</button>
            </form>
        )
    }
}

export default FolderOptionsForm