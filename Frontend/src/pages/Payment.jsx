import React, { useState } from "react";
import { CreditCard, Lock, Truck } from "lucide-react";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 text-gray-800">
        <div className="flex flex-col items-center">
          <div className="bg-indigo-500 text-white rounded-full w-20 h-20 flex justify-center items-center shadow-lg -mt-14">
            <CreditCard size={32} />
          </div>
          <h1 className="text-2xl font-bold mt-4 uppercase">Payment Details</h1>
        </div>

        <div className="mt-6">
          <label className="block font-semibold mb-2">Select Payment Method:</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer space-x-2">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio h-5 w-5 text-indigo-600"
              />
              <CreditCard size={24} />
            </label>

            <label className="flex items-center cursor-pointer space-x-2">
              <input
                type="radio"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio h-5 w-5 text-indigo-600"
              />
              <img
                src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                alt="PayPal"
                className="h-6"
              />
            </label>

            <label className="flex items-center cursor-pointer space-x-2">
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio h-5 w-5 text-indigo-600"
              />
              <Truck size={24} />
              <span className="text-sm">Cash on Delivery</span>
            </label>
          </div>
        </div>

        {paymentMethod !== "cod" && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block font-semibold mb-1">Name on Card</label>
              <input
                type="text"
                placeholder="John Smith"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Card Number</label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block font-semibold mb-1">Expiration Month</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  {[
                    "01 - Jan",
                    "02 - Feb",
                    "03 - Mar",
                    "04 - Apr",
                    "05 - May",
                    "06 - Jun",
                    "07 - Jul",
                    "08 - Aug",
                    "09 - Sep",
                    "10 - Oct",
                    "11 - Nov",
                    "12 - Dec",
                  ].map((month, idx) => (
                    <option key={idx}>{month}</option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block font-semibold mb-1">Expiration Year</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  {[2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-1/2">
              <label className="block font-semibold mb-1">CVV</label>
              <input
                type="text"
                placeholder="000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        <button className="mt-8 w-full bg-indigo-600 text-white flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
          <Lock size={20} />
          <span>{paymentMethod === "cod" ? "Place Order (COD)" : "Pay Now"}</span>
        </button>
      </div>
    </div>
  );
};

export default Payment;
