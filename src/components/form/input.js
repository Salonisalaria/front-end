import React, { Component } from "react";

class FormInput extends Component {
    render() {
        const {title, value, name, type, onChange} = this.props;

        return (
            <div className="row login-form-input-parent">
                <div className="login-form-input">
                    <label className="w-100">{title}</label>
                    <input className="w-100" id={name} name={name} type={type} onChange={onChange} value={value} />
                </div>
            </div>
        );
    }
}

export default FormInput;