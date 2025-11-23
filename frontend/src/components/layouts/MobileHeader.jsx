import React from 'react';
import Link from 'next/link';
// import Image from 'next/image'; // Uncomment for next/image optimization

const MobileHeader = () => {
    return (
        <div className="_header_mobile_menu">
            <div className="_header_mobile_menu_wrap">
                <div className="container">
                    <div className="_header_mobile_menu">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div className="_header_mobile_menu_top_inner">
                                    <div className="_header_mobile_menu_logo">
                                        <Link href="/feed" className="_mobile_logo_link">
                                            {/* Ensure  is in your public folder */}
                                            <img src="/images/logo.svg" alt="Logo" className="_nav_logo" />
                                        </Link>
                                    </div>
                                    <div className="_header_mobile_menu_right">
                                        <form className="_header_form_grp">
                                            <a href="#0" className="_header_mobile_search">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
                                                    <circle cx="7" cy="7" r="6" stroke="#666" />
                                                    <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
                                                </svg>
                                            </a>
                                        </form>
                                        {/* NOTE: The toggle button below was commented out in the source HTML.
                                          If you uncomment it to implement a mobile drawer menu, you will need
                                          to add React state (useState) to handle the open/close functionality,
                                          instead of relying on a form submission to a separate HTML file.
                                        */}
                                        {/* <div className="_header_mobile_toggle">
                                            <button type="button" className="_header_mobile_btn_link" aria-label="Open mobile menu">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" fill="none" viewBox="0 0 18 14">
                                                    <path stroke="#666" strokeLinecap="round" strokeWidth="1.5" d="M1 1h16M1 7h16M1 13h16"/>
                                                </svg>
                                            </button>
                                        </div> 
                                        */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileHeader;