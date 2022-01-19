import { useFormik } from "formik";
import { useState } from "react";
import * as yup from 'yup';

const savedData = {
    name:"SamaMg",
    email:"moazemisama@gmail.com",
    phoneNumber:"09339014690",
    password:"Sama@1234",
    passwordConfirm:"Sama@1234",
    gender:"1",
}

// 1.
const initialValues = {
    name:"",
    email:"",
    phoneNumber:"",
    password:"",
    passwordConfirm:"",
    gender:"",
}

// 2.
const onSubmit = (values) => {
    console.log(values)
}

// 3.
const validationSchema = yup.object({
    name: yup.string()
    .required("Name is required")
    .min(6, "Name lenght is not valid"),

    email: yup.string()
    .email("Invalid email format")
    .required("Email is required "),

    phoneNumber: yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "Invalid Phone Number"),

    password: yup.string()
    .required("Password is required")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    
    passwordConfirm: yup.string()
    .required("Password Confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"), 

    gender: yup.string().required("Gender is required"),
})

const SignUpForm = () => {

    const[formValues, setFormValues] = useState(null);

    const formik = useFormik ({
        initialValues: formValues || initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
        enableReinitialize:true,
    })
    console.log(formik.values);
   
    return ( 
        <div className="mainSection">
            <form onSubmit={formik.handleSubmit}>
                <div className="formControl">
                    <label>Nama</label>
                    <input type="text" {...formik.getFieldProps("name")} name="name"/>
                      {formik.errors.name && formik.touched.name && (
                      <div className="error">{formik.errors.name}</div>
                      )}
                </div>

                <div className="formControl">
                    <label>Email</label>
                    <input type="text" {...formik.getFieldProps("email")} name="email"/>
                       {formik.errors.email && formik.touched.email && (
                      <div className="error">{formik.errors.email}</div>
                      )}
                </div>

                <div className="formControl">
                    <label>Phone Number</label>
                    <input type="text" {...formik.getFieldProps("phoneNumber")} name="phoneNumber"/>
                       {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                      <div className="error">{formik.errors.phoneNumber}</div>
                      )}
                </div>

                <div className="formControl">
                    <label>Password</label>
                    <input type="text" {...formik.getFieldProps("password")} name="password"/>
                       {formik.errors.password && formik.touched.password && (
                      <div className="error">{formik.errors.password}</div>
                      )}
                </div>

                <div className="formControl">
                    <label>Password Confirmation</label>
                    <input type="text" {...formik.getFieldProps("passwordConfirm")} name="passwordConfirm"/>
                       {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
                      <div className="error">{formik.errors.passwordConfirm}</div>
                      )}
                </div>

                <div className="genderInput">

                <input 
                  type="radio" 
                  id="0" 
                  name="gender"
                  value="0"
                  onChange={formik.handleChange}
                  checked={formik.values.gender === "0"}
                  />
                <label htmlFor="0">Male</label>

                <input 
                  type="radio" 
                  id="1" 
                  name="gender" 
                  value="1" 
                  onChange={formik.handleChange}
                  checked={formik.values.gender === "1"}
                  />
                <label htmlFor="1">Female</label>
                {formik.errors.gender && formik.touched.gender && (
                    <div className="error">{formik.errors.gender}</div>
                )}
                </div>
                <div className="formButtons">
                  <button className="dataBtn" onClick={() => setFormValues(savedData)}>load data</button>
                  <button className="submitBtn" type="submit" disabled={!formik.isValid}>submit</button>
                </div>
            </form>
        </div>
     );
}
 
export default SignUpForm;
