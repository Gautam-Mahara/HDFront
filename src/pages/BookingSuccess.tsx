import  { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function BookingSuccess() {
  const location = useLocation();
  const { bookingNumber, adventure, date, time, quantity, total } =
    location.state || {};
  const [searchQuery, setSearchQuery] = useState("");

  // const [searchResults, setSearchResults] = useState([]);
  // const [searchLoading, setSearchLoading] = useState(false);
  // const [searchError, setSearchError] = useState("");

  // // 🧭 Handle search (same as AdventureCardList logic)
  // useEffect(() => {
  //   const fetchResults = async () => {
  //     if (!searchQuery.trim()) {
  //       setSearchResults([]);
  //       return;
  //     }
  //     setSearchLoading(true);
  //     setSearchError("");
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5000/api/adventures/search?query=${encodeURIComponent(
  //           searchQuery
  //         )}`
  //       );
  //       if (!response.ok) throw new Error("Failed to fetch search results");
  //       const data = await response.json();
  //       setSearchResults(data);
  //     } catch (err) {
  //       setSearchError(err instanceof Error ? err.message : String(err));
  //     } finally {
  //       setSearchLoading(false);
  //     }
  //   };

  //   const debounce = setTimeout(fetchResults, 400);
  //   return () => clearTimeout(debounce);
  // }, [searchQuery]);

  // 🚫 Handle missing booking data
  if (!bookingNumber) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-semibold text-red-600 mb-3">
          Booking Not Found
        </h1>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Sorry, we couldn’t find your booking details. Please try again.
        </p>
        <Link
          to="/"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg shadow-md transition"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 🟡 HEADER SECTION */}
      <header className="w-full bg-white shadow-md py-4 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Adventure_icon.png"
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="text-xl font-semibold text-gray-800">
            Highway Delite
          </h1>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-10">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full border border-gray-100">
          {/* ✅ Success Icon */}
          <div className="flex flex-col items-center mb-6">
            <div className="text-6xl text-green-600 mb-3">✅</div>
            <h1 className="text-3xl font-semibold text-green-600">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 mt-2 text-center">
              Thank you for booking with{" "}
              <span className="font-semibold text-yellow-500">
                Highway Delite
              </span>
              !
            </p>
          </div>

          {/* 🧾 Booking Details */}
          <div className="bg-gray-50 border rounded-xl p-5 mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-2">
              Booking Details
            </h2>
            <div className="space-y-3 text-gray-700 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Booking Number:</span>
                <span className="font-semibold">{bookingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Experience:</span>
                <span>{adventure}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{date}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{time}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between text-base font-semibold border-t pt-3 mt-3">
                <span>Total Paid:</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          {/* 📩 Info Text */}
          <p className="text-gray-600 text-sm mb-6 text-center">
            A confirmation email has been sent. Please carry your booking number
            and ID proof at the venue.
          </p>

          {/* 🔘 Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-gray-800 hover:bg-black text-white font-medium py-2 px-6 rounded-lg shadow-md transition"
            >
              Browse More Adventures
            </Link>
            <button
              onClick={() => window.print()}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-lg shadow-md transition"
            >
              Print Ticket
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
