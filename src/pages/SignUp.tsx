import React from "react";
import { FiUser, FiPhone, FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../hook/useAxios";
import { API_URL } from "../hook/useEnv";

// FieldType interfeysi
type FieldType = {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  password?: string;
};

// Qayta ishlatiladigan InputField komponenti
type InputFieldProps = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  required?: boolean;
  pattern?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  placeholder,
  icon,
  required,
  pattern,
}) => (
  <div className="mb-5">
    <label
      htmlFor={id}
      className="block text-gray-700 font-medium mb-2"
    >
      {name.replace("_", " ").toUpperCase()}
    </label>
    <div className="relative">
      {icon}
      <input
        autoComplete="off"
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
        pattern={pattern}
      />
    </div>
  </div>
);

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const onFinish = async (values: FieldType) => {
    try {
      const response = await axiosInstance.post(
        `${API_URL}/auth/admin/sign-up`,
        values
      );
      console.log(response);
      alert("Signup successful! Redirecting to login.");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const values = Object.fromEntries(formData.entries()) as FieldType;
          onFinish(values);
        }}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        {/* Ismlar */}
        <InputField
          id="first_name"
          name="first_name"
          type="text"
          placeholder="Enter your first name"
          icon={<FiUser className="absolute left-3 top-3 text-gray-500" />}
          required
        />
        <InputField
          id="last_name"
          name="last_name"
          type="text"
          placeholder="Enter your last name"
          icon={<FiUser className="absolute left-3 top-3 text-gray-500" />}
          required
        />

        {/* Telefon raqami */}
        <InputField
          id="phone_number"
          name="phone_number"
          type="text"
          placeholder="+998 91 234 56 78"
          icon={<FiPhone className="absolute left-3 top-3 text-gray-500" />}
          required
          pattern="^\+998 \d{2} \d{3} \d{2} \d{2}$"
        />

        {/* Email */}
        <InputField
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          icon={<FiMail className="absolute left-3 top-3 text-gray-500" />}
          required
        />

        {/* Parol */}
        <InputField
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          icon={<FiLock className="absolute left-3 top-3 text-gray-500" />}
          required
        />

        {/* Yuborish tugmasi */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Sign Up
        </button>

        {/* Havola */}
        <div className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="hover:underline hover:text-blue-500">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
