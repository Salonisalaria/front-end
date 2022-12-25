import React, { Component } from "react";
import FormHeader from "./header";
import FormInput from "./input";
import FormButton from "./button";

class Form extends Component {
    render() {
        const { formHeader, formFields, buttonTitle, onChange, onSubmit, extraMessage } = this.props;

        return (
            <div className="col-xs-8 col-md-8 center login-form-body">
                <FormHeader title={formHeader} />
                {
                    formFields.map(formField => <FormInput key={formField.name} 
                    title={formField.title} name={formField.name} type={formField.type} onChange={onChange} 
                    />)
                }
                <FormButton title={buttonTitle} onSubmit={onSubmit} extraMessage={extraMessage} />
            </div>
        )
    }
}

export default Form;