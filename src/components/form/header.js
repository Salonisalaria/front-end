import React, { Component } from "react";

class FormHeader extends Component {
    render() {
        const { title } = this.props;

        return (
            <div className="login-header">
                {title}
            </div>
        );
    }
}

export default FormHeader;