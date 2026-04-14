function Header() {
    return (
        <div className="container-fluid px-5 d-none border-bottom d-lg-block">
            <div className="row gx-0 align-items-center">
                <div className="col-lg-4 text-center text-lg-start mb-lg-0">
                    <div className="d-inline-flex align-items-center" style={{ height: '45px' }}>
                        <a href="#" className="text-muted mx-2">Hỗ trợ</a>
                        <small> / </small>
                        <a href="#" className="text-muted ms-2">Liên hệ</a>
                    </div>
                </div>

                <div className="col-lg-4 text-center d-flex align-items-center justify-content-center">
                    <small className="text-dark">Gọi chúng tôi:</small>
                    <a href="#" className="text-muted">(+84) 0973 439 239</a>
                </div>

                <div className="col-lg-4 text-center text-lg-end">
                    <div className="d-inline-flex align-items-center" style={{ height: '45px' }}>

                        <div className="dropdown">
                            <a href="#" className="dropdown-toggle text-muted me-2" data-bs-toggle="dropdown">
                                <small>VNĐ</small>
                            </a>
                            <div className="dropdown-menu rounded">
                                <a href="#" className="dropdown-item">Dolar</a>
                                <a href="#" className="dropdown-item">VNĐ</a>
                            </div>
                        </div>

                        <div className="dropdown">
                            <a href="#" className="dropdown-toggle text-muted mx-2" data-bs-toggle="dropdown">
                                <small>Tiếng Việt</small>
                            </a>
                            <div className="dropdown-menu rounded">
                                <a href="#" className="dropdown-item">English</a>
                                <a href="#" className="dropdown-item">Tiếng Việt</a>
                            </div>
                        </div>

                        <div className="dropdown">
                            <a href="#" className="dropdown-toggle text-muted ms-2" data-bs-toggle="dropdown">
                                <small>
                                    <i className="fa fa-home me-2"></i> Trang của tôi
                                </small>
                            </a>
                            <div className="dropdown-menu rounded">
                                <a href="/login" className="dropdown-item">Đăng nhập</a>
                                <a href="#" className="dropdown-item">Danh sách yêu thích</a>
                                <a href="#" className="dropdown-item">Giỏ hàng</a>
                                <a href="#" className="dropdown-item">Thông báo</a>
                                <a href="#" className="dropdown-item">Cài đặt tài khoản</a>
                                <a href="#" className="dropdown-item">Đăng xuất</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;