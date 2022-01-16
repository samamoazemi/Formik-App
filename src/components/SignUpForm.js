import { useState } from "react";

const SignUpForm = () => {

    const [userData, setUserData] = useState({
         name:"",
         email:"",
         password:"",
    })

        const changeHandler = (e) => {
            setUserData({...userData, [e.target.name]: e.target.value });
        }

        const submitHandler = (e) => {
            e.preventDefault();
            console.log("submitted ...");
        }
        
    return ( 
        <div className="mainSection">
            <form onSubmit={submitHandler}>
                <div className="formControl">
                    <label>Nama</label>
                    <input 
                      type="text"
                      onChange={changeHandler} 
                      value={userData.name}
                      name="name"
                      />
                </div>
                <div className="formControl">
                    <label>Email</label>
                    <input 
                      type="text"
                      onChange={changeHandler} 
                      value={userData.email}
                      name="email"
                      />
                </div>
                <div className="formControl">
                    <label>Password</label>
                    <input
                      type="text"
                      onChange={changeHandler} 
                      value={userData.password}
                      name="password"
                      />
                </div>
                <button>submit</button>
            </form>
        </div>
     );
}
 
export default SignUpForm;