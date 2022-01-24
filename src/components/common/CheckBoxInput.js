import React from "react";

const CheckBoxInput = ({name, formik, checkBoxOptions}) => {
    return ( 
        <div className="checkBox">
            {checkBoxOptions.map((item) => (
                <React.Fragment key={item.value}>
                  <input 
                    type="checkBox" 
                    id={item.value}
                    name={name}
                    value={item.value}
                    onChange={formik.handleChange}
                    checked={formik.values[name].includes(item.value)}
                    />
                  <label htmlFor={item.value}>{item.label}</label>
                </React.Fragment>
            ))}
            {formik.errors[name] && formik.touched[name] && (
              <div className="error checkBoxError">{formik.errors[name]}</div>
            )}
        </div>
     );
}
 
export default CheckBoxInput;