import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        imageUrl: ""
    });

    const [file, setFile] = useState(null);

    // 🔥 Load dữ liệu sản phẩm
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.code === 1000) {
                    setProduct(data.result);
                }
            })
            .catch(err => console.error(err));
    }, [id]);

    // 🔥 Upload Cloudinary
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Ecommerce"); // 🔥 sửa

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dag0oyszr/image/upload", // 🔥 sửa
            {
                method: "POST",
                body: formData
            }
        );

        const data = await res.json();
        return data.secure_url;
    };

    // 🔥 Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = product.imageUrl;

            // nếu chọn ảnh mới
            if (file) {
                imageUrl = await uploadImage(file);
            }

            const token = localStorage.getItem("token");

            const updatedProduct = {
                ...product,
                price: Number(product.price),
                imageUrl
            };

            await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedProduct)
            });

            alert("Cập nhật thành công!");
            navigate("/product");

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">

            <Header />

            <main className="container my-4 flex-grow-1">
                <h2>Cập nhật sản phẩm</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label>Tên sản phẩm</label>
                        <input
                            className="form-control"
                            value={product.name}
                            onChange={(e) =>
                                setProduct({ ...product, name: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label>Giá</label>
                        <input
                            type="number"
                            className="form-control"
                            value={product.price}
                            onChange={(e) =>
                                setProduct({ ...product, price: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label>Mô tả</label>
                        <textarea
                            className="form-control"
                            value={product.description || ""}
                            onChange={(e) =>
                                setProduct({ ...product, description: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label>Ảnh</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>

                    {/* 🔥 Preview ảnh */}
                    <div className="mb-3">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : product.imageUrl || "https://via.placeholder.com/200"
                            }
                            alt="preview"
                            width="200"
                        />
                    </div>

                    <button className="btn btn-primary">
                        Cập nhật
                    </button>

                </form>
            </main>

            <Footer />

        </div>
    );
}

export default UpdateProduct;