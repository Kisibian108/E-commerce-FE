import { toast } from "react-toastify";

/**
 * Xử lý response từ BE theo chuẩn { code, message, result }
 * @param {object} res - response axios
 * @param {function} onSuccess - callback khi code === 1000
 */
export function handleApiResponse(res, onSuccess) {
    const code = res?.data?.code;
    const message = res?.data?.message || "Có lỗi xảy ra!";

    if (code === 1000) {
        toast.success(message);
        if (onSuccess) onSuccess(res.data);
    } else {
        toast.error(message);
    }
}

/**
 * Xử lý lỗi hệ thống / network
 * @param {object} err - error axios
 */
export function handleApiError(err) {
    const msg = err.response?.data?.message || "Không thể kết nối tới server!";
    toast.error(msg);
}
