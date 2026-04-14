import { useState } from 'react';
import {useNavigate} from "react-router-dom";

function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();


    const token = localStorage.getItem("token");

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Ecommerce"); // 🔥 thay vào

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dag0oyszr/image/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await res.json();

        console.log("Cloudinary response:", data);

        return data.secure_url; // 🔥 URL ảnh
    };

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = "";

        if (file) {
            imageUrl = await uploadImage(file);
        }

        const product = {
            name,
            price: Number(price),
            imageUrl
        };

        await fetch('http://localhost:8080/products/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(product)
        });

        navigate("/product");
    };

    return (
        <div className="container mt-4">
            <h2>Thêm sản phẩm</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Tên sản phẩm</label>
                    <input
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Giá</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
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

                <button className="btn btn-primary">
                    Thêm sản phẩm
                </button>
            </form>
        </div>
    );
}

export default AddProduct;