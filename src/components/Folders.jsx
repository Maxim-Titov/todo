import React from "react"

import Folder from "./Folder"

class Folders extends React.Component {
    render() {
        if (this.props.folders.length > 0) {
            return (
                <div className="folders">
                    {this.props.folders.map((folder) => (
                        <Folder userId={this.props.userId} loadFolderTasks={this.props.loadFolderTasks} getFolderId={this.props.getFolderId} onPageChange={this.props.onPageChange} key={folder.folder_id} folder={folder} onRename={this.props.onRename} onDelete={this.props.onDelete} />
                    ))}
                </div>
            )
        } else {
            return (
                <p>No folders found</p>
            )
        }
    }
}

export default Folders