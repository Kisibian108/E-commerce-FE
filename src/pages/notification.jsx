import { notification } from "antd";
import {authApi} from "../api/authApi";

try {
    const res = await authApi.login(values);
    localStorage.setItem("token", res.data.result);
    notification.success({
        message: "Đăng nhập thành công 🎉",
        description: `Chào mừng ${values.username}`,
        placement: "topRight",
    });
} catch (err) {
    console.log("Error response:", err.response); // debug thử
    const backendMsg = err.response?.data?.message || "Có lỗi xảy ra!";
    notification.error({
        message: "Đăng nhập thất bại ❌",
        description: backendMsg,
        placement: "topRight",
    });
}
