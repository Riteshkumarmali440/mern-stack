import React from "react";
import vegetable from "../assets/vegetable.jpg";
import fruits from "../assets/fruits.jpg";
import grocery from "../assets/grocery.jpg";
import other from "../assets/other.jpg";

const MyOrder = () => {
  // Dummy order data (replace with real order fetch later)
  const orders = [
    {
      id: "ORD123456",
      date: "2025-05-01",
      status: "Delivered",
      total: "₹1200",
      items: [
        { name: "Fresh Vegetables", quantity: 2, price: "₹400",images:vegetable },
        { name: "Juicy Fruits", quantity: 1, price: "₹400", images:fruits },
        { name: "Grocery Pack", quantity: 1, price: "₹400", images:grocery },
      ],
    },
    {
      id: "ORD789456",
      date: "2025-04-28",
      status: "Shipped",
      total: "₹800",
      items: [
        { name: "Milk & Dairy", quantity: 1, price: "₹800", images:other },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  Order #{order.id}
                </h2>
                <p className="text-sm text-gray-500">Date: {order.date}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2"
                >
                  <img src={item.images} alt={item.name} className="w-20 h-15 object-cover" />
                  <div className="text-gray-700">{item.name}</div>
                  <div className="text-gray-600">x{item.quantity}</div>
                  <div className="text-gray-800 font-medium">{item.price}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-end">
              <span className="text-lg font-semibold text-indigo-600">
                Total: {order.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
