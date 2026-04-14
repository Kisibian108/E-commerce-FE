import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { handleApiResponse, handleApiError } from "../utils/handleApiResponse";

const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
};

function ChangePassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email; // lấy email từ ForgotPassword

    const onFinish = async (values) => {
        try {
            const res = await authApi.changePassword({ email, ...values });
            handleApiResponse(res, () => {
                // Redirect về login sau khi đổi mật khẩu thành công
                navigate("/login");
            });
        } catch (err) {
            handleApiError(err);
        }
    };

    return (
        <div style={containerStyle}>
            <Card title="Đổi mật khẩu" style={{ width: 400, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                <Form name="changePassword" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        label="OTP"
                        name="otp"
                        rules={[{ required: true, message: "Vui lòng nhập OTP!" }]}
                    >
                        <Input placeholder="Nhập OTP" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
                    >
                        <Input.Password placeholder="New Password" />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu mới"
                        name="confirmNewPassword"
                        dependencies={["newPassword"]}
                        rules={[
                            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("newPassword") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm New Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default ChangePassword;
