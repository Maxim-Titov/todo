import React from "react"

class Message extends React.Component {
    render() {
        return (
            <div className="message-background">
                <div className="message-box">
                    <p>{this.props.message}</p>

                    <form>
                        <button type="button" onClick={this.props.onShowMessage}>OK</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Message