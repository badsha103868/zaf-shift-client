import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
  // react hook form 
  const {register,handleSubmit, formState: {errors}} = useForm()

  //  useHook import
  const {registerUser}=useAuth();
   
  const handleRegistration =(data)=>{
    console.log('after register', data)
    registerUser(data.email, data.password)
    .then(result=>{
      const user = result.user;
      console.log(user)
    })
    .catch(error=>{
      console.log(error.message)
    })
  }

  return (
    <div  className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body " onSubmit={handleSubmit(handleRegistration)}>
     <h3 className="text-center font-bold text-3xl">Welcome to Zap Shift </h3>
      <p className=" mt-3 font-bold">please register</p>
         
         <fieldset className="fieldset">

          {/* email */}
          <label className="label">Email</label>
          <input type="email" {...register('email', {required: true})} className="input w-full" placeholder="Email" />
          {errors.email?.type === "required" && (
        <p className='text-red-500'>Email is required</p>
         )}

          {/* password */}
          <label className="label">Password</label>
          <input type="password" 
          {...register('password',
           {required: true ,
            minLength: 6,
            pattern:/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
            })} className="input w-full" placeholder="Password" />


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
         
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>Already Have An Account ? <Link
         className="text-blue-400 underline text-lg" to='/login'>Login</Link></p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;