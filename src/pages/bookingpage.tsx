import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Adventure } from "../types/adventure";

export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAdventure = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/adventures/${id}`);
        const data = await res.json();
        setAdventure(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdventure();
  }, [id]);

  const checkAvailability = async () => {
    if (!selectedDate || !selectedTime) return;
    setChecking(true);
    try {
      const res = await fetch("http://localhost:5000/api/payment/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adventureId: id,
          date: selectedDate,
          time: selectedTime,
        }),
      });
      const data = await res.json();
      setAvailable(data.available);
    } catch (err) {
      console.error(err);
    } finally {
      setChecking(false);
    }
  };

  const handleContinue = () => {
    if (available && selectedDate && selectedTime) {
      navigate(`/checkout/${id}`, {
        state: {
          date: selectedDate,
          time: selectedTime,
          quantity,
        },
      });
    }
  };

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!adventure) return <div className="text-center mt-10">Adventure not found</div>;

  const availableDates = Array.from(
    new Set(
      adventure.slots
        .filter((slot) => slot.availableSeats > 0)
        .map((slot) => slot.date)
    )
  ).sort();

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const availableTimes = selectedDate
    ? adventure.slots
        .filter((slot) => slot.date === selectedDate && slot.availableSeats > 0)
        .sort((a, b) => a.time.localeCompare(b.time))
    : [];

  const subtotal = adventure.price * quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  return (
    <div className="min-h-screen bg-white">
      {/* ✅ Header Section (Logo + Search) */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div
            className="text-2xl font-bold text-yellow-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            AdventureBook
          </div>

          {/* Search Bar */}
          <div className="flex items-center w-full max-w-md bg-gray-100 rounded-full px-4 py-2 ml-4">
            <input
              type="text"
              placeholder="Search adventures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-700"
            />
            <button
              className="text-gray-500 hover:text-black ml-2"
              onClick={() => console.log("Search:", searchQuery)}
            >
              🔍
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 mb-8 hover:text-gray-900 transition-colors"
        >
          <span className="mr-2">←</span>
          Details
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Adventure Info */}
          <div className="flex-1">
            <div className="mb-8">
              <img
                src={adventure.image}
                alt={adventure.title}
                className="w-full h-64 lg:h-80 object-cover rounded-2xl"
              />
            </div>

            <h1 className="text-3xl font-bold mb-4">{adventure.title}</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {adventure.description}
            </p>

            {/* Date Selection */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4">Choose date</h3>
              <div className="flex gap-3 flex-wrap">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime(null);
                      setAvailable(null);
                    }}
                    className={`px-5 py-3 rounded-lg border-2 transition-all ${
                      selectedDate === date
                        ? "bg-yellow-400 border-yellow-400 text-black font-medium"
                        : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {formatDateForDisplay(date)}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">Choose time</h3>
                {availableTimes.length > 0 ? (
                  <>
                    <div className="flex gap-3 flex-wrap mb-3">
                      {availableTimes.map((slot) => (
                        <button
                          key={`${slot.date}-${slot.time}`}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`px-5 py-3 rounded-lg border-2 transition-all ${
                            selectedTime === slot.time
                              ? "bg-yellow-400 border-yellow-400 text-black font-medium"
                              : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                          }`}
                        >
                          {slot.displayTime} ({slot.availableSeats} left)
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      All times are in IET (SMT + S-SD)
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500">No available times for this date</p>
                )}
              </div>
            )}

            {/* About */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-3">About</h3>
              <p className="text-gray-600">
                Secrets routes, trained guides, and safety briefing. Minimum age 10.
              </p>
            </div>

            {/* Check Availability */}
            {selectedDate && selectedTime && (
              <>
                <button
                  onClick={checkAvailability}
                  disabled={checking}
                  className={`w-full max-w-xs px-6 py-3 rounded-lg font-medium transition-all ${
                    checking
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {checking ? "Checking..." : "Check Availability"}
                </button>

                {available === false && (
                  <p className="text-red-600 mt-4 font-medium">
                    Selected slot is no longer available.
                  </p>
                )}
                {available === true && (
                  <p className="text-green-600 mt-4 font-medium">
                    Slot is available! You can continue.
                  </p>
                )}
              </>
            )}
          </div>

          {/* Right Column - Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-8">
              <h2 className="text-xl font-bold mb-6">Booking Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price per person</span>
                  <span className="text-lg font-semibold">₹{adventure.price}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDecrease}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="font-medium min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-3">
                  <span>Taxes</span>
                  <span>₹{taxes}</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={!available}
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  available
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
