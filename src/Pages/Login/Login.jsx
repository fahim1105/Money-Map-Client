import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast"; // ১. টোস্ট ইম্পোর্ট
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { BiHide, BiShow } from "react-icons/bi";

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    // const { signinUser, signInGoogle } = UseAuth();
    const { signInUser, signInWithGoogle } = use(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();
    const [showPassword, setShowPassword] = useState(false);

    // রিডাইরেক্ট পাথ নির্ধারণ
    const from = location?.state || '/';

    // ইমেইল-পাসওয়ার্ড লগইন
    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(() => {
                toast.success("Successfully Logged In!"); // ২. সাকসেস টোস্ট
                navigate(from, { replace: true }); // ৩. সঠিক পেজে রিডাইরেক্ট
            })
            .catch((error) => {
                console.error(error);
                toast.error(error?.message || "Invalid Email or Password"); // ৪. এরর টোস্ট
            });
    }

    // গুগল লগইন
    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
                // toast.success("Successfully Logged In!");
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                };

                // ডাটাবেসে ইউজার সেভ করা
                axiosSecure.post('/users', userInfo)
                    .then((res) => {
                        toast.success("Google Login Successful!");
                        navigate(from, { replace: true });
                    })
                    .catch(err => {
                        // যদি ইউজার আগে থেকেই থাকে তাও রিডাইরেক্ট হবে
                        navigate(from, { replace: true });
                    });

            }).catch((error) => {
                toast.error("Google Login Failed!");
                console.log(error.message);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-primary-content p-8 rounded-2xl shadow">
                <h1 className="text-3xl text-base-100 font-bold mb-1">Welcome Back</h1>
                <p className="text-base-100 mb-6">Login with <span className="text-lg font-bold tracking-tight text-gray-500">
                    Money<span className="text-secondary">Map</span>
                </span></p>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <fieldset>
                        <label className="block text-sm font-medium text-base-100 mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Email"
                            className="w-full px-3 py-2 mb-1 border text-secondary rounded-lg focus:outline-none focus:ring focus:ring-primary"
                        />
                        {errors.email && <p className="text-red-500 text-xs mb-3">{errors.email.message}</p>}
                        <label className="block text-sm font-medium text-base-100 mb-1">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Min 6 characters required" }
                                })}
                                placeholder="Password"
                                className="w-full px-3 py-2 pr-12 mb-1 border rounded-lg text-secondary focus:outline-none focus:ring focus:ring-primary"
                            />

                            {/* Show / Hide button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-secondary"
                            >
                                {showPassword ? <BiHide /> : <BiShow />}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-xs mb-3">
                                {errors.password.message}
                            </p>
                        )}

                        <p className="text-sm text-secondary cursor-pointer mb-4">Forget Password?</p>

                        <button type="submit" className="w-full py-2 rounded-lg bg-secondary/80 font-semibold text-base-100 hover:bg-secondary transition">
                            Login
                        </button>
                    </fieldset>
                </form>

                <Link state={from} to="/auth/register">
                    <p className="text-sm text-base-100 mt-4">
                        Don’t have any account? <span className="text-secondary cursor-pointer">Register</span>
                    </p>
                </Link>

                <div className="flex items-center gap-2 my-4">
                    <div className="flex-1 h-px bg-base-100"></div>
                    <span className="text-base-100 text-sm">Or</span>
                    <div className="flex-1 h-px bg-base-100"></div>
                </div>

                <button onClick={handleGoogleLogin} className="w-full text-black flex items-center justify-center gap-2 py-2 border rounded-lg bg-white transition">
                    <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;