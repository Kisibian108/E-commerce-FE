import { useEffect, useState } from "react";
import {
    Card,
    Button,
    Row,
    Col,
    Pagination,
    Skeleton,
    message,
    Modal
} from "antd";
import {
    ShoppingCartOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined
} from "@ant-design/icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { isAdmin } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { confirm } = Modal;

function ProductList() {
    const [modal, contextHolder] = Modal.useModal();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const admin = isAdmin();
    const navigate = useNavigate();

    // 🔥 Fetch data
    const fetchProducts = () => {
        setLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}/products/getAll?page=${page}&size=6`)

            .then(res => res.json())
            .then(data => {
                if (data.code === 1000) {
                    const total = data.result.totalPages;

                    // fix page lệch
                    if (page >= total && page > 0) {
                        setPage(total - 1);
                        return;
                    }

                    setProducts(data.result.content);
                    setTotalPages(total);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, [page]);

    const handleDelete = (id) => {
        const token = localStorage.getItem("token");

        modal.confirm({
            title: "Xóa sản phẩm?",
            content: "Bạn chắc chắn muốn xóa sản phẩm này?",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk: async () => {
                console.log("DELETE RUN");

                const res = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    message.error("Xóa thất bại!");
                    return;
                }

                message.success("Xóa thành công!");

                if (products.length === 1 && page > 0) {
                    setPage(page - 1);
                } else {
                    fetchProducts();
                }
            }
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

            <Header />
            {contextHolder}
            <div style={{ padding: "24px", flex: 1 }}>

                {/* 🔥 Header actions */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20
                }}>
                    <h2>Danh sách sản phẩm</h2>

                    {admin && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => navigate("/add-product")}
                        >
                            Thêm sản phẩm
                        </Button>
                    )}
                </div>

                {/* 🔥 Loading skeleton */}
                {loading ? (
                    <Row gutter={[16, 16]}>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Col xs={24} sm={12} md={8} key={i}>
                                <Skeleton active />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <>
                        <Row gutter={[16, 16]}>
                            {products.map((p) => (
                                <Col xs={24} sm={12} md={8} key={p.id}>
                                    <Card
                                        hoverable
                                        style={{ borderRadius: 12 }}
                                        cover={
                                            <img
                                                alt={p.name}
                                                src={p.imageUrl || "https://via.placeholder.com/300"}
                                                style={{
                                                    height: 300,
                                                    objectFit: "cover",
                                                    borderTopLeftRadius: 12,
                                                    borderTopRightRadius: 12
                                                }}
                                            />
                                        }
                                    >
                                        <Meta title={p.name} />

                                        <p style={{
                                            color: "#ff4d4f",
                                            fontWeight: "bold",
                                            fontSize: 16,
                                            marginTop: 10
                                        }}>
                                            {p.price?.toLocaleString()} VNĐ
                                        </p>

                                        {/* USER */}
                                        <Button
                                            type="primary"
                                            icon={<ShoppingCartOutlined />}
                                            style={{ marginRight: 8 }}
                                        >
                                            Thêm vào giỏ
                                        </Button>

                                        {/* ADMIN */}
                                        {admin && (
                                            <>
                                                <Button
                                                    icon={<EditOutlined />}
                                                    style={{ marginRight: 8 }}
                                                    onClick={() => navigate(`/edit-product/${p.id}`)}
                                                >
                                                    Sửa
                                                </Button>

                                                <Button
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={() => handleDelete(p.id)}
                                                >
                                                    Xóa
                                                </Button>
                                            </>
                                        )}
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {/* 🔥 Pagination bên phải */}
                        <div style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: 30
                        }}>
                            <Pagination
                                current={page + 1}
                                total={totalPages * 6}
                                pageSize={6}
                                onChange={(p) => setPage(p - 1)}
                            />
                        </div>
                    </>
                )}
            </div>

            <Footer />

        </div>
    );
}

export default ProductList;