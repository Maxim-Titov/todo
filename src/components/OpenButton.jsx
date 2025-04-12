import React from "react"

import { FcCollapse } from "react-icons/fc"

class OpenButton extends React.Component {
    render() {
        return (
            <FcCollapse className="open-btn" type="button" onClick={() => {
                const aside = document.querySelector("aside")

                if (aside.classList.contains("open")) {
                    aside.classList.remove("open")
                } else {
                    aside.classList.add("open")
                }
            }} />
        )
    }
}

export default OpenButton