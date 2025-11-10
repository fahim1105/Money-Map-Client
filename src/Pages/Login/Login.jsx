import React, { use, useRef, useState } from 'react';
import { FaEye, FaGoogle } from 'react-icons/fa';
import { IoEyeOffSharp } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthContext/AuthContext';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("")

    const emailRef = useRef()

    const { signInUser, signInWithGoogle, forgetPassword } = use(AuthContext)
    const location = useLocation()
    // console.log(location)
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password)

        signInUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user)
                event.target.reset()
                toast.success("Successfully Login")
                navigate(location.state || '/')
            })
            .catch((error) => {
                const errorCode = error.code;
                setError(errorCode)
            });
    }
    const handleLoginWithGoogle = () => {
        signInWithGoogle()
            .then(() => {
                // console.log(result)
                navigate(location.state || '/')
            })
            .catch(error => {
                // console.log(error)
                const errorCode = error.code;
                setError(errorCode)
            })
    }
    const handleForgetPassword = (e) => {
        e.preventDefault()
        const email = emailRef.current.value;
        forgetPassword(email)
            .then(() => {
                toast((t) => (
                    <span>
                        Please Check Your <b>Email</b>
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="ml-2 text-blue-500 hover:underline"
                        >
                            Dismiss
                        </button>
                    </span>
                ));

            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode)
            })
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className='bg-secondary shadow-2xl rounded-2xl px-10 py-8 w-full max-w-sm'>
                <form onSubmit={handleLogin} >
                    <h1 className="text-3xl font-bold text-center text-base-300 mb-8">
                        Login
                    </h1>

                    {/* email */}
                    <div className="mb-5">
                        <input
                            type="email"
                            ref={emailRef}
                            placeholder="Your Email"
                            name='email'
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-base-300"
                        />
                    </div>

                    {/* Password with toggle */}
                    <div className="mb-5 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            name='password'
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-base-300"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-5 text-gray-500 hover:text-base-300 text-sm"
                        >
                            {showPassword ? <IoEyeOffSharp /> : <FaEye />}
                        </button>
                    </div>
                    <p className='font-semibold mt-1 text-xs my3 text-red-400'>
                        {error}
                    </p>

                    {/* Remember and Forgot */}
                    <div onClick={handleForgetPassword} className="flex items-center justify-between text-sm mb-6">

                        <button className="text-base-300 hover:underline">
                            Forgot password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-xl hover:bg-neutral transition duration-200 font-semibold"
                    >
                        Login
                    </button>
                </form>
                {/* Google Login */}
                <button
                    onClick={handleLoginWithGoogle}
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 bg-base-200 border-1 mt-2 text-accent hover:text-white py-3 rounded-xl hover:bg-accent transition duration-200 font-semibold"
                >
                    <FaGoogle />
                    Login With Google
                </button>

                {/* Register Link */}
                <div className="text-center mt-6 text-sm">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/auth/register">
                            <button className="text-base-300 font-semibold hover:underline">
                                Register
                            </button>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;