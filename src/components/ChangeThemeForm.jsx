import React from "react"

import DarkImg from '../images/theme/dark.png'
import LightImg from '../images/theme/light.png'

class ChangeThemeForm extends React.Component {
    render() {
        return (
            <div className="theme-btn">
                <p>Theme: </p>

                <img src={this.props.theme === "light" ? DarkImg : LightImg} alt="theme" onClick={() => {
                    this.props.theme === "light" ? this.props.onChangeTheme("dark") : this.props.onChangeTheme("light")
                }} />
            </div>
        )
    }
}

export default ChangeThemeForm