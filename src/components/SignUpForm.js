import { useFormik } from "formik";
import * as yup from 'yup';

// 1.
const initialValues = {
    name:"",
    email:"",
    phoneNumber:"",
    password:"",
    passwordConfirm:"",
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
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    
    passwordConfirm: yup.string()
    .required("Password Confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"), 
})

const SignUpForm = () => {

    const formik = useFormik ({
        initialValues,
        onSubmit,
        validationSchema,
    })
    console.log("visited fields", formik.touched);
   
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
                <button type="submit">submit</button>
            </form>
        </div>
     );
}
 
export default SignUpForm;
