import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPassword from "./ResetPassword"; // Giả sử bạn đặt tên file là ResetPassword.js

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Các route khác */}
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;