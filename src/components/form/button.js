import React, { Component } from "react";
import HTMLReactParser from "html-react-parser";

class FormButton extends Component {
    render() {
        const { title, onSubmit, extraMessage } = this.props;

        return (
            <div id="button" className="row login-form-submit-parent">
                <div className="w-100 login-form-submit">
                    <button className="btn" onClick={onSubmit}>{title}</button>
                </div>
                <div className="login-form-submit-extramsg">{HTMLReactParser(extraMessage)}</div>
            </div>
        );
    }
}

export default FormButton;