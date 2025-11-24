"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/lib/features/api/apiSlice';


const LoginPage = () => {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: '', 
    password: ''
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // Clear previous errors

    try {
      // 1. ATTEMPT LOGIN
      // .unwrap() is CRITICAL here. It makes sure that if the API returns 400/401,
      // it throws an error immediately and jumps to the 'catch' block.
      const res = await login(formData).unwrap();

      // 2. IF SUCCESSFUL (Code reaches here only if password is correct)
      console.log("Login Successful");
      localStorage.setItem("access_token", res.access);
      localStorage.setItem("refresh_token", res.refresh);

      // 3. REDIRECT
      router.push("/feed");

    } catch (err) {
      // 4. IF FAILED (Wrong password/username)
      // The code jumps here. router.push() NEVER runs.
      console.error("Login Failed:", err);
      
      if (err.status === 401) {
        setErrorMsg("Invalid username or password.");
      } else {
        setErrorMsg("Something went wrong. Please check your connection.");
      }
    }
  };

  return (
    <section className="_social_login_wrapper _layout_main_wrapper">
      <div className="_shape_one">
        <img src="/images/shape1.svg" alt="" className="_shape_img" />
        <img src="/images/dark_shape.svg" alt="" className="_dark_shape" />
      </div>
      <div className="_shape_two">
        <img src="/images/shape2.svg" alt="" className="_shape_img" />
        <img src="/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className="_shape_three">
        <img src="/images/shape3.svg" alt="" className="_shape_img" />
        <img src="/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className="_social_login_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_login_left">
                <div className="_social_login_left_image">
                  <img src="/images/login.png" alt="Login Illustration" className="_left_img" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_login_content">
                <div className="_social_login_left_logo _mar_b28">
                  <img src="/images/logo.svg" alt="Logo" className="_left_logo" />
                </div>
                <p className="_social_login_content_para _mar_b8">Welcome back</p>
                <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>

                {/* ERROR MESSAGE DISPLAY */}
                {errorMsg && (
                    <div style={{ color: '#dc3545', marginBottom: '20px', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '4px', fontSize: '14px' }}>
                        {errorMsg}
                    </div>
                )}

                <form className="_social_login_form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8">Username</label>
                        <input 
                            type="text" 
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-control _social_login_input" 
                            placeholder="Enter your username"
                            required
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control _social_login_input" 
                            placeholder="Enter your password"
                            required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                      <div className="_social_login_form_btn _mar_t40 _mar_b60">
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="_social_login_form_btn_link _btn1"
                        >
                            {isLoading ? 'Checking...' : 'Login now'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_login_bottom_txt">
                      <p className="_social_login_bottom_txt_para">Dont have an account?  
                        <Link href="/register" style={{marginLeft: '5px'}}>Create New Account</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;