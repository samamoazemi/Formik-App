import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import axios from "axios";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import Select from "./common/SelectComponent";

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

    nationality: yup.string().required("Select nationality !"),
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
                 <Select
                    selectOptions={selectOptions}
                    name="nationality"
                    formik={formik}
                 />
                 <RadioInput formik={formik} radioOptions={radioOptions} name="gender" />

                 <button className="submitBtn" type="submit" disabled={!formik.isValid}>submit</button>
            </form>
        </div>
     );
}
 
export default SignUpForm;
