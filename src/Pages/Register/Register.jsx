import React, { use, useState } from 'react';
import { FaEye, FaGoogle } from 'react-icons/fa';
import { IoEyeOffSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthContext/AuthContext';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [nameError, setNameError] = useState("");
    const [error, setError] = useState("")

    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const { createUser, UpdatedUser, setUser, signInWithGoogle } = use(AuthContext);

    const handleResister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        //  Name validation
        if (name.length < 4) {
            setNameError("Name should be more than 4 characters");
            return;
        } else {
            setNameError("");
        }
        // pass validation
        if (!/[A-Z]/.test(password)) {
            setPasswordError("Password must contain at least one uppercase letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setPasswordError("Password must contain at least one lowercase letter");
            return;
        }
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return;
        }
        setPasswordError("");



        //  Firebase
        createUser(email, password)
            .then(result => {
                const user = result.user;
                toast.success("Successfully Created Account");
                UpdatedUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        navigate('/');
                    })
                    .catch(error => {
                        const errorCode = error.code;
                        toast.error(errorCode);
                        setUser(user);
                    });
            })
            .catch(error => {
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    };
    const handleLoginWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result)
                navigate(location.state || '/')
            })
            .catch(error => {
                // console.log(error)
                const errorCode = error.code;
                setError(errorCode)
            })
    }

    return (
        <div className="flex items-center justify-center min-h-screen  px-4">
            <form onSubmit={handleResister} className="bg-[#A3B18A] shadow-2xl rounded-2xl px-8 py-8 w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center text-base-300 mb-8">
                    Register
                </h1>

                {/* Name */}
                <div className="mb-5">
                    <input
                        type="text"
                        placeholder="Your Name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-base-300"
                    />
                    {nameError && <p className="font-semibold text-red-500 text-xs mt-2">{nameError}</p>}
                </div>

                {/* Photo URL */}
                <div className="mb-5">
                    <input
                        type="text"
                        placeholder="Your Photo URL"
                        name="photo"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-base-300"
                    />
                </div>

                {/* Email */}
                <div className="mb-5">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-base-300"
                    />
                </div>

                {/* Password */}
                <div className="mb-5 relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-base-300"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-4 text-gray-500 hover:text-base-300"
                    >
                        {showPassword ? <IoEyeOffSharp /> : <FaEye />}
                    </button>
                    <p className='font-semibold mt-1 text-xs my3 text-red-400'>
                        {error}
                    </p>
                    {passwordError && <p className="font-semibold text-red-500 text-xs mt-2">{passwordError}</p>}
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    className="w-full bg-[#708238] text-white py-3 rounded-xl hover:bg-neutral transition duration-200 font-semibold"
                >
                    Register
                </button>
                <button
                    onClick={handleLoginWithGoogle}
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 bg-white border-1 mt-2 text-[#D4A373] hover:text-white py-3 rounded-xl hover:bg-[#D4A373] transition duration-200 font-semibold"
                >
                    <FaGoogle />
                    Login With Google
                </button>

                {/* Login Link */}
                <div className="text-center mt-6 text-sm">
                    <p>
                        Already have an account?{" "}
                        <Link to="/auth/login">
                            <button className="text-base-300 font-semibold hover:underline">
                                Login
                            </button>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
