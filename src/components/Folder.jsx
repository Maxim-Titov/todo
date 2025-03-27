import React from "react"

import FolderImg from "../images/folder.png"
import FolderOptionsForm from "./FolderOptionsForm"
import RenameFolderForm from "./RenameFolderForm"

class Folder extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            options: false,
            rename: false
        }
    }

    render() {
        return (
            <div className="folder">
                <div className="options" onClick={() => {
                    this.setState({ options: !this.state.options })
                }}>
                    <span>...</span>

                    {this.state.options && <FolderOptionsForm onRenameClick={() => this.setState({ rename: true })} onDelete={this.props.onDelete} folderId={this.props.folder.folder_id} />}
                </div>

                <div>
                    <img src={FolderImg} alt="folder" onClick={() => {
                        this.props.getFolderId(this.props.folder.folder_id)
                        this.props.onPageChange("inFolder")
                        this.props.loadFolderTasks(this.props.userId, this.props.folder.folder_id)
                    }} />

                    {this.state.rename ? <RenameFolderForm onRename={this.props.onRename} onClose={() => this.setState({ rename: false })} folderName={this.props.folder.folder_title} folderId={this.props.folder.folder_id} /> : <p>{this.props.folder.folder_title}</p>}
                </div>
            </div>
        )
    }
}

export default Folder