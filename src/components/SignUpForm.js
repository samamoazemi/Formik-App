import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import axios from "axios";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import Select from "./common/SelectComponent";
import CheckBoxInput from "./common/CheckBoxInput";

const checkBoxOptions = [
    {label: "react.s", value: "react.js"},
    {label: "vue.js", value: "vue.js"},
]

const radioOptions = [
    {label: "male", value: "0"},
    {label: "female", value: "1"},
]

const selectOptions = [
    {label: "select nationality ...", value: ""},
    {label: "Iran", value: "IR"},
    {label: "Germany", value: "GER"},
    {label: "USA", value: "US"},
]


// 1.
const initialValues = {
    name:"",
    email:"",
    phoneNumber:"",
    password:"",
    passwordConfirm:"",
    gender:"",
    nationality:"",
    intrests:[],
    terms: false
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
        "8 Char, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special"),
    
    passwordConfirm: yup.string()
    .required("Password Confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"), 

    gender: yup.string().required("Gender is required"),

    nationality: yup.string().required("Select nationality !"),

    intrests: yup.array().min(1).required("at least select one expertise"),

    terms: yup.boolean()
    .required("The terms and conditions must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted."),
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

    useEffect(() => {
        axios
          .get("http://localhost:3001/users/1")
          .then((res) => setFormValues(res.data))
          .catch((err) => console.log(err))
    },[])
   
    return ( 
        <div className="mainSection">
            <form onSubmit={formik.handleSubmit}>
                <Input formik={formik} name="name" label="Name" />
                <Input formik={formik} name="email" label="Email" />
                <Input formik={formik} name="phoneNumber" label="Phone Number" />
                <Input
                   formik={formik} 
                   name="password" 
                   label="Password"
                   type="password" 
                />
                <Input 
                   formik={formik} 
                   name="passwordConfirm" 
                   label="Password Confirmation" 
                   type="password" 
                />
                 <RadioInput formik={formik} radioOptions={radioOptions} name="gender" />

                 <Select
                    selectOptions={selectOptions}
                    name="nationality"
                    formik={formik}
                 />

                 <CheckBoxInput formik={formik} checkBoxOptions={checkBoxOptions} name="intrests" />

                 <div className="terms">
                 <input 
                    type="checkBox" 
                    id="terms"
                    name="terms"
                    value={true}
                    onChange={formik.handleChange}
                    checked={formik.values.terms}
                 />
                 <label htmlFor="terms">Terms and conditions</label>
        
                 {formik.errors.terms && formik.touched.terms && (
                    <div className="error termsError">{formik.errors.terms}</div>
                 )}
                 </div>

                 <button type="submit" disabled={!formik.isValid}>submit</button>
            </form> 
        </div>
     );
}
 
export default SignUpForm;

