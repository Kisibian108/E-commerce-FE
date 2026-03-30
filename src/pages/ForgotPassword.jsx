import React from "react";
import { Form, Input, Button, Card } from "antd";
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

function ForgotPassword() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const res = await authApi.forgotPassword(values);
            handleApiResponse(res, () => {
                // OTP đã gửi thành công → redirect sang ChangePassword
                navigate("/change-password", { state: { email: values.email } });
            });
        } catch (err) {
            handleApiError(err);
        }
    };

    return (
        <div style={containerStyle}>
            <Card title="Quên mật khẩu" style={{ width: 400, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                <Form name="forgotPassword" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Gửi OTP
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default ForgotPassword;
