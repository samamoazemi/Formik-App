import { useFormik } from "formik";
import * as yup from 'yup';

// 1.
const initialValues = {
    name:"",
    email:"",
    password:"",
}

// 2.
const onSubmit = (values) => {
    console.log(values)
}

// 3.
const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string()
    .email("Invalid email format")
    .required("Email is required "),
    password: yup.string().required("Password is required"),
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
                    <label>Password</label>
                    <input type="text" {...formik.getFieldProps("password")} name="password"/>
                       {formik.errors.password && formik.touched.password && (
                      <div className="error">{formik.errors.password}</div>
                      )}
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
     );
}
 
export default SignUpForm;