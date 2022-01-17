import { useFormik } from "formik";

const initialValues = {
    name:"",
    email:"",
    password:"",
}

const SignUpForm = () => {

    const onSubmit = (values) => {
        console.log(values)
    }

    const formik = useFormik ({
        initialValues,
        onSubmit,
        // onSubmit:(values) => console.log(values),
    })
   
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