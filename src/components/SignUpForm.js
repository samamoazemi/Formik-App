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
        // onSubmit:(values) => console.log(values),
        // validate: (values) => console.log(values),
    })
    console.log(formik.errors)
   
    return ( 
        <div className="mainSection">
            <form onSubmit={formik.handleSubmit}>
                <div className="formControl">
                    <label>Nama</label>
                    <input 
                      type="text"
                      onChange={formik.handleChange} 
                      value={formik.values.name}
                      name="name"
                      />
                </div>
                <div className="formControl">
                    <label>Email</label>
                    <input 
                      type="text"
                      onChange={formik.handleChange} 
                      value={formik.values.email}
                      name="email"
                      />
                </div>
                <div className="formControl">
                    <label>Password</label>
                    <input
                      type="text"
                      onChange={formik.handleChange} 
                      value={formik.values.password}
                      name="password"
                      />
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
     );
}
 
export default SignUpForm;