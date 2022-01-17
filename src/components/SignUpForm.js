import { useFormik } from "formik";

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
const validate = (values) => {
    let errors = {};

    if(!values.name){
        errors.name = "Name is Required";
    }

    if(!values.email){
        errors.email = "Email is Required";
    }

    if(!values.password){
        errors.password = "Password is Required";
    }

    return errors;
}

const SignUpForm = () => {

    const formik = useFormik ({
        initialValues,
        onSubmit,
        validate,
    })
    console.log("visited fields", formik.touched);
   
    return ( 
        <div className="mainSection">
            <form onSubmit={formik.handleSubmit}>
                <div className="formControl">
                    <label>Nama</label>
                    <input 
                      type="text"
                      onChange={formik.handleChange} 
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      name="name"
                      />
                      {formik.errors.name && formik.touched.name && (
                      <div className="error">{formik.errors.name}</div>
                      )}
                </div>

                <div className="formControl">
                    <label>Email</label>
                    <input 
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} 
                      value={formik.values.email}
                      name="email"
                      />
                       {formik.errors.email && formik.touched.email && (
                      <div className="error">{formik.errors.email}</div>
                      )}
                </div>

                <div className="formControl">
                    <label>Password</label>
                    <input
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} 
                      value={formik.values.password}
                      name="password"
                      />
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