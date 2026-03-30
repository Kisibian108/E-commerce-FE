import React from "react";
import { Form, Input, Button, Card, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { handleApiResponse, handleApiError } from "../utils/handleApiResponse";

const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", // xanh → tím
    padding: "20px",
};

function Login() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const res = await authApi.login(values);

            handleApiResponse(res, (data) => {
                if (data.result?.token) {
                    localStorage.setItem("token", data.result.token);
                }
            });
        } catch (err) {
            handleApiError(err);
        }
    };

    return (
        <div style={containerStyle}>
            <Card
                title="Đăng nhập"
                style={{ width: 400, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
                <Form name="login" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                <Space style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button type="link" onClick={() => navigate("/register")}>
                        Đăng ký
                    </Button>
                    <Button type="link" onClick={() => navigate("/forgot-password")}>
                        Quên mật khẩu?
                    </Button>
                </Space>
            </Card>
        </div>
    );
}

export default Login;
