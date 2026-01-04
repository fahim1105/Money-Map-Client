import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { BiHide, BiShow } from "react-icons/bi";
import { FaUserShield } from "react-icons/fa"; // অ্যাডমিন আইকন

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signInUser, signInWithGoogle } = use(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();
    const [showPassword, setShowPassword] = useState(false);

    const from = location?.state || '/';

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(() => {
                toast.success("Successfully Logged In!",
                    {
                        iconTheme: {
                            primary: '#4f6900',
                            secondary: '#000',
                        }
                    }
                );
                navigate(from, { replace: true });
            })
            .catch((error) => {
                toast.error(error?.message || "Invalid Email or Password");
            });
    }

    // --- Admin Login ---
    const handleAdminLogin = () => {
        const toastId = toast.loading("Logging in as Admin...");
        signInUser("admin001@gmail.com", "Admin001$")
            .then(() => {
                toast.success("Welcome back, Admin!", {
                    id: toastId,
                    iconTheme: {
                        primary: '#4f6900',
                        secondary: '#000',
                    },
                });
                navigate(from, { replace: true });
            })
            .catch(() => {
                toast.error("Admin account access failed!", {
                    id: toastId,
                    iconTheme: {
                        primary: '#4f6900',
                        secondary: '#000',
                    }
                });
            });
    }

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                };

                axiosSecure.post('/users', userInfo)
                    .then(() => {
                        toast.success("Google Login Successful!",
                            {
                                iconTheme: {
                                    primary: '#4f6900',
                                    secondary: '#000',
                                }
                            }
                        );
                        navigate(from, { replace: true });
                    })
                    .catch(() => navigate(from, { replace: true }));

            }).catch(() => toast.error("Google Login Failed!",
                {
                    iconTheme: {
                        primary: '#4f6900',
                        secondary: '#000',
                    }
                }
            ));
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-primary-content p-8 rounded-2xl shadow">
                <h1 className="text-3xl text-base-100 font-bold mb-1">Welcome Back</h1>
                <p className="text-base-100 mb-6">Login with <span className="text-lg font-bold tracking-tight text-gray-500">
                    Money<span className="text-secondary">Map</span>
                </span></p>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-base-100 mb-1">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="Email"
                                className="w-full px-3 py-2 border text-secondary rounded-lg focus:outline-none focus:ring focus:ring-primary"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-base-100 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: "Password is required" })}
                                    placeholder="Password"
                                    className="w-full px-3 py-2 pr-12 border rounded-lg text-secondary focus:outline-none focus:ring focus:ring-primary"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                                >
                                    {showPassword ? <BiHide /> : <BiShow />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <button type="submit" className="w-full py-2.5 rounded-lg bg-secondary/80 font-bold text-base-100 hover:bg-secondary transition shadow-lg shadow-secondary/20">
                            Login
                        </button>
                    </fieldset>
                </form>

                <div className="mt-4">
                    <Link state={from} to="/auth/register">
                        <p className="text-sm text-base-100">
                            Don’t have any account? <span className="text-secondary font-bold hover:underline">Register</span>
                        </p>
                    </Link>
                </div>

                <div className="flex items-center gap-2 my-6">
                    <div className="flex-1 h-px bg-base-100 opacity-20"></div>
                    <span className="text-base-100 text-xs uppercase font-medium">Or Quick Access</span>
                    <div className="flex-1 h-px bg-base-100 opacity-20"></div>
                </div>

                <div className="space-y-3">
                    {/* Google Login */}
                    <button onClick={handleGoogleLogin} className="w-full text-black flex items-center justify-center gap-2 py-2 border rounded-xl bg-white hover:bg-gray-50 transition font-medium">
                        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
                        Google Login
                    </button>

                    {/* Admin Direct Login Button */}
                    <button
                        onClick={handleAdminLogin}
                        className="w-full bg-secondary/80 hover:bg-secondary text-base-100 flex items-center justify-center gap-2 py-2 rounded-xl border border-primary/20 transition shadow-lg"
                    >
                        <FaUserShield className="text-primary" />
                        <span>Login as Admin</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;