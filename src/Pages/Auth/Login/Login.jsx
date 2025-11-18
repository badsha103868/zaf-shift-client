import React, { use } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {

  //  useAuth diya context data load
  const {signInUser} = useAuth();
  // location 
  const location = useLocation();
  console.log('in the login page',location)
  // navigate
  const navigate = useNavigate()
  //  react hook form destructuring
  const {register, handleSubmit, formState: {errors} } = useForm()

 
  const handleLogIn =(data)=>{
     console.log('form data ', data)
     signInUser(data.email, data.password)
     .then(result =>{
      const user = result.user
      console.log(user)
      navigate(location?.state || '/')
     })
     .catch(error=>{
      console.log(error.message)
     })
  }
  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      
      <form onSubmit={handleSubmit(handleLogIn)} className="card-body ">
         <h3 className="text-center font-bold text-3xl">Welcome back</h3>
        <p className=" mt-3 font-bold">please login</p>
        <fieldset className="fieldset">

          {/* email */}
          <label className="label">Email</label>
          <input 
          type="email" 
           {...register('email', {required:true})}
          className="input" 
          placeholder="Email" />
          {errors.email?.type === "required" && (
        <p className='text-red-500'>Email is required</p>
         )}

          {/* password */}
          <label className="label">Password</label>
          <input
           type="password"
           {...register('password', {required:true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/})}
           className="input"
           placeholder="Password"
            />
            {/* required error */}
             {errors.password?.type === "required" && (
           <p className='text-red-500'>Password is required</p>
         )}

          {/* length error */}

          {errors.password?.type === "minLength" && (
        <p className='text-red-500'>Password must be 6 character or longer</p>
         )}

         {/* pattern error  */}
          {errors.password?.type === "pattern" && (
        <p className='text-red-500'>password must  have at least on uppercase or lowercase and one number</p>
         )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>New to Zap Shift ? <Link state={location.state} className="text-green-400 underline text-lg" to='/register'>Register</Link></p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
