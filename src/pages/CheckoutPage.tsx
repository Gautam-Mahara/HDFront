import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

type PromoResponse = {
  success: boolean;
  promo: {
    code: string;
    type: "percentage" | "amount";
    value: number;
    validTill: string;
  };
};

// type BookingResponse = {
//   success: boolean;
//   bookingNumber: string;
//   message?: string;
// };

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const { date, time } = (location.state || {}) as { date: string; time: string };

  const [adventure, setAdventure] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [promoDetails, setPromoDetails] = useState<PromoResponse["promo"] | null>(null);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAdventure = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/adventures/${id}`);
        const data = await res.json();
        setAdventure(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load adventure details");
      } finally {
        setLoading(false);
      }
    };
    fetchAdventure();
  }, [id]);

  const handleBooking = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    if (!agreeToTerms) {
      setError("Please agree to the terms and safety policy");
      return;
    }

    setBookingLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/payment/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adventureId: id,
          date,
          time,
          seatsRequested: quantity,
          email: email.trim(),
          name: name.trim(),
          promoCode: promoDetails ? promoDetails.code : null,
        }),
      });

      const data = await res.json();
      console.log("Booking response:", data);

      if (!res.ok) throw new Error(data.message || "Booking failed");

      if (data.bookingNumber) {
        navigate(`/booking-success`, {
          state: {
            bookingNumber: data.bookingNumber,
            adventure: adventure.title,
            date,
            time,
            quantity,
            total,
          },
        });
      } else {
        throw new Error(data.message || "Booking failed - no booking number received");
      }
    } catch (err) {
      console.error("Booking error:", err);
        setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBookingLoading(false);
    }
  };

  const applyPromo = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/payment/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promoCode }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPromoDetails(null);
        setError(data.message || "Invalid promo code");
        return;
      }

      setPromoDetails(data.promo);
      setError("");
    } catch (err) {
      console.error(err);
      setError("An error occurred while applying the promo code");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!adventure) return <div className="text-center mt-10">Adventure not found</div>;

  const subtotal = adventure.price * quantity;
  const taxes = 59;
  let discount = 0;

  if (promoDetails) {
    discount =
      promoDetails.type === "percentage"
        ? (subtotal * promoDetails.value) / 100
        : promoDetails.value;
  }

  const total = subtotal + taxes - discount;

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 py-4 shadow-sm bg-white sticky top-0 z-10 gap-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Adventure_icon.svg/512px-Adventure_icon.svg.png"
            alt="logo"
            className="w-8 h-8"
          />
          <h1 className="text-lg font-semibold text-gray-800">
            highway <span className="font-bold text-yellow-500">delite</span>
          </h1>
        </div>

        {/* Right: Search Bar */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-72 border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="bg-yellow-400 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition">
            Search
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
        {/* LEFT - Customer Form */}
        <div className="flex-1">
          <button
            onClick={() => window.history.back()}
            className="text-gray-600 mb-4 hover:underline"
          >
            ← Checkout
          </button>

          <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-gray-700">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-lg p-2"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Promo code */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 border rounded-lg p-3"
              />
              <button
                onClick={applyPromo}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Apply
              </button>
            </div>

            {error && (
              <div
                className={`p-3 rounded-lg ${
                  error.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {error}
              </div>
            )}

            {promoDetails && (
              <p className="text-green-600 text-sm">
                ✅ Promo <b>{promoDetails.code}</b> applied (
                {promoDetails.type === "percentage"
                  ? `${promoDetails.value}% off`
                  : `₹${promoDetails.value} off`}
                )
              </p>
            )}

            <label className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span className="text-gray-700 text-sm">
                I agree to the terms and safety policy *
              </span>
            </label>
          </div>
        </div>

        {/* RIGHT - Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border">
            <h2 className="text-lg font-semibold mb-3">Booking Summary</h2>

            <div className="space-y-2 text-gray-700 text-sm mb-3">
              <div className="flex justify-between">
                <span>Experience</span>
                <span>{adventure.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Date</span>
                <span>{date}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span>{time}</span>
              </div>
              <div className="flex justify-between">
                <span>Qty</span>
                <span>{quantity}</span>
              </div>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            {promoDetails && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({promoDetails.code})</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              className={`w-full mt-4 ${
                bookingLoading ? "bg-gray-400" : "bg-yellow-400 hover:bg-yellow-500"
              } text-black font-medium py-2 rounded-lg transition-colors`}
              onClick={handleBooking}
              disabled={bookingLoading}
            >
              {bookingLoading ? "Processing..." : "Pay and Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
