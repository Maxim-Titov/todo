import React from "react";

import LogoImg from "../images/logo.png";

class SiteBranding extends React.Component {
    render() {
        return (
            <div className="site-branding">
                <img src={LogoImg} alt="logo" />
                <h1>ToDo</h1>
            </div>
        )
    }
}

export default SiteBranding