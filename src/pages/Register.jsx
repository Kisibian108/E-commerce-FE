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
    backgroundColor: "#f0f2f5",
};

function Register() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const res = await authApi.register(values); // gọi API register
            handleApiResponse(res, (data) => {
                // Callback khi success, ví dụ redirect sang login
                navigate("/login");
            });
        } catch (err) {
            handleApiError(err);
        }
    };

    return (
        <div style={containerStyle}>
            <Card
                title="Đăng ký"
                style={{ width: 400, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
                <Form name="register" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ type: "email", message: "Email không hợp lệ!" }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>

                <Space style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button type="link" onClick={() => navigate("/")}>
                        Đăng nhập
                    </Button>
                </Space>
            </Card>
        </div>
    );
}

export default Register;
