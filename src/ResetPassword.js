import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./ResetPassword.css"; // Import file CSS riêng

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            setMessage("Token không hợp lệ hoặc đã hết hạn.");
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            setMessage("Mật khẩu phải có ít nhất 8 ký tự.");
            return;
        }
        if (password !== confirmPassword) {
            setMessage("Mật khẩu xác nhận không khớp.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("https://lagivc.onrender.com/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage("Mật khẩu đã thay đổi thành công.");
            } else {
                setMessage(result.message || "Có lỗi xảy ra.");
            }
        } catch (error) {
            setMessage("Lỗi kết nối. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Thay đổi mật khẩu</h2>
                {message && <p className={`message ${message.includes("thành công") ? "success" : "error"}`}>{message}</p>}
                {token && (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="Mật khẩu mới"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;