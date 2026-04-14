function Footer() {
    return (
        <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
            <div className="container py-5">

                {/*<div className="row g-4 rounded mb-5" style={{ background: 'rgba(255, 255, 255, .03)' }}>*/}

                {/*    {[1,2,3,4].map((item, index) => (*/}
                {/*        <div className="col-md-6 col-lg-6 col-xl-3" key={index}>*/}
                {/*            <div className="rounded p-4">*/}
                {/*                <div*/}
                {/*                    className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4"*/}
                {/*                    style={{ width: '70px', height: '70px' }}*/}
                {/*                >*/}
                {/*                    <i className="fas fa-map-marker-alt fa-2x text-primary"></i>*/}
                {/*                </div>*/}
                {/*                <div>*/}
                {/*                    <h4 className="text-white">Info</h4>*/}
                {/*                    <p className="mb-2">Example content</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))}*/}

                {/*</div>*/}

                <div className="row g-5">

                    <div className="col-md-6 col-lg-6 col-xl-3">
                        <div className="footer-item d-flex flex-column">
                            <h4 className="text-primary mb-4">Newsletter</h4>
                            <p className="mb-3">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit.
                            </p>

                            <div className="position-relative mx-auto rounded-pill">
                                <input
                                    className="form-control rounded-pill w-100 py-3 ps-4 pe-5"
                                    type="text"
                                    placeholder="Enter your email"
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary rounded-pill position-absolute top-0 end-0 py-2 mt-2 me-2"
                                >
                                    SignUp
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-6 col-xl-3">
                        <div className="footer-item d-flex flex-column">
                            <h4 className="text-primary mb-4">Customer Service</h4>
                            <a href="#"><i className="fas fa-angle-right me-2"></i> Contact Us</a>
                            <a href="#"><i className="fas fa-angle-right me-2"></i> Returns</a>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-6 col-xl-3">
                        <div className="footer-item d-flex flex-column">
                            <h4 className="text-primary mb-4">Information</h4>
                            <a href="#"><i className="fas fa-angle-right me-2"></i> About Us</a>
                            <a href="#"><i className="fas fa-angle-right me-2"></i> Privacy Policy</a>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-6 col-xl-3">
                        <div className="footer-item d-flex flex-column">
                            <h4 className="text-primary mb-4">Extras</h4>
                            <a href="#"><i className="fas fa-angle-right me-2"></i> Brands</a>
                            <a href="#"><i className="fas fa-angle-right me-2"></i> Wishlist</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Footer;