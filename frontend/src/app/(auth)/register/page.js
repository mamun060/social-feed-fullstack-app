"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/lib/features/api/apiSlice';

const RegistrationPage = () => {
    const router = useRouter();
    const [register, { isLoading }] = useRegisterMutation();
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (formData.password !== formData.confirm_password) {
            setErrorMsg("Passwords do not match");
            return;
        }

        try {
            await register(formData).unwrap();
            alert("Registration successful! Please login.");
            router.push('/'); 
        } catch (err) {
            console.error("Registration error:", err);
            if (err.data) {
                const firstErrorKey = Object.keys(err.data)[0];
                setErrorMsg(`${firstErrorKey}: ${err.data[firstErrorKey][0]}`);
            } else {
                setErrorMsg("Registration failed.");
            }
        }
    };

    return (
        <section className="_social_registration_wrapper _layout_main_wrapper">
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
            <div className="_social_registration_wrap">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="_social_registration_right">
                                <div className="_social_registration_right_image">
                                    <img src="/images/registration.png" alt="Registration Illustration" />
                                </div>
                                <div className="_social_registration_right_image_dark">
                                    <img src="/images/registration1.png" alt="Registration Illustration Dark Mode" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <div className="_social_registration_content">
                                <div className="_social_registration_right_logo _mar_b28">
                                    <img src="/images/logo.svg" alt="Logo" className="_right_logo" />
                                </div>
                                <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
                                <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>
                                
                                {errorMsg && (
                                    <p style={{color: 'red', marginBottom: '15px', fontSize: '14px'}}>{errorMsg}</p>
                                )}

                                <form className="_social_registration_form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_registration_form_input _mar_b14">
                                                <label className="_social_registration_label _mar_b8">First Name</label>
                                                <input 
                                                    type="text" 
                                                    name="first_name"
                                                    placeholder='First Name'
                                                    value={formData?.first_name} 
                                                    className="form-control _social_registration_input" 
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_registration_form_input _mar_b14">
                                                <label className="_social_registration_label _mar_b8">Last Name</label>
                                                <input 
                                                    type="text" 
                                                    name="last_name"
                                                    placeholder='Last Name'
                                                    value={formData?.last_name} 
                                                    className="form-control _social_registration_input" 
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_registration_form_input _mar_b14">
                                                <label className="_social_registration_label _mar_b8">Last Name</label>
                                                <input 
                                                    type="text" 
                                                    name="username"
                                                    placeholder='User Name' 
                                                    value={formData?.username} 
                                                    className="form-control _social_registration_input" 
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_registration_form_input _mar_b14">
                                                <label className="_social_registration_label _mar_b8">Email</label>
                                                <input 
                                                    type="email" 
                                                    name="email"
                                                    placeholder='Email'
                                                    value={formData?.email}
                                                    className="form-control _social_registration_input" 
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_registration_form_input _mar_b14">
                                                <label className="_social_registration_label _mar_b8">Password</label>
                                                <input 
                                                    type="password" 
                                                    name="password"
                                                    className="form-control _social_registration_input" 
                                                    onChange={handleChange}
                                                    value={formData?.password}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_registration_form_input _mar_b14">
                                                <label className="_social_registration_label _mar_b8">Repeat Password</label>
                                                <input 
                                                    type="password" 
                                                    name="confirm_password"
                                                    className="form-control _social_registration_input" 
                                                    onChange={handleChange}
                                                    value={formData?.confirm_password}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
                                            <div className="form-check _social_registration_form_check">
                                                <input 
                                                    className="form-check-input _social_registration_form_check_input" 
                                                    type="radio" 
                                                    name="flexRadioDefault" 
                                                    id="flexRadioDefault2" 
                                                    defaultChecked 
                                                />
                                                <label className="form-check-label _social_registration_form_check_label" htmlFor="flexRadioDefault2">I agree to terms & conditions</label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BUTTON SECTION - EXACT STRUCTURE PRESERVED */}
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                                            <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                                                <button 
                                                    type="submit" 
                                                    disabled={isLoading}
                                                    className=" btn btn-primary _social_registration_form_btn_link _btnLogin"
                                                >
                                                    {isLoading ? 'Registering...' : 'Register Now'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="_social_registration_bottom_txt">
                                            <p className="_social_registration_bottom_txt_para">Dont have an account? <Link href="/">Login Now</Link>
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

export default RegistrationPage;