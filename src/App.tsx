import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdventureDetailPage from "./pages/AdventureCardList";
import BookingPage from "./pages/bookingpage";
import CheckoutPage from "./pages/CheckoutPage"; // ✅ new import
import BookingSuccess from "./pages/BookingSuccess"; // new import

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page showing all adventures */}
        <Route path="/" element={<AdventureDetailPage />} />

        {/* Adventure details & booking */}
        <Route path="/adventure/:id" element={<BookingPage />} />

        {/* ✅ Checkout route */}
        <Route path="/checkout/:id" element={<CheckoutPage />} />
        {/* // In your App.tsx or routing file */}
<Route path="/booking-success" element={<BookingSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
