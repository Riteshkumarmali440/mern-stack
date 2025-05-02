import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, handleRemoveFromCart, addToCart, products } = useAppContext();

  const cartEntries = Object.entries(cartItems);

  const totalPrice = cartEntries.reduce((total, [productId, quantity]) => {
    const product = products.find((p) => p.id === parseInt(productId));
    if (product) {
      return total + product.offerPrice * quantity;
    }
    return total;
  }, 0);

  const gstAmount = (totalPrice * 0.02).toFixed(2);
  const shippingCost = 0;
  const grandTotal = (parseFloat(totalPrice) + parseFloat(gstAmount) + shippingCost).toFixed(2);

  const [pincode, setPincode] = useState('');
  const [village, setVillage] = useState('');
  const [pinError, setPinError] = useState('');

  const [address, setAddress] = useState('');
  const [isEditing, setIsEditing] = useState(true);

  const handlePincodeChange = async (e) => {
    const value = e.target.value;
    setPincode(value);

    if (value.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await res.json();

        if (data[0].Status === 'Success') {
          setVillage(data[0].PostOffice[0].Name);
          setPinError('');
        } else {
          setVillage('');
          setPinError('Invalid Pincode or no data found.');
        }
      } catch (err) {
        console.error(err);
        setVillage('');
        setPinError('Failed to fetch data.');
      }
    } else {
      setVillage('');
      setPinError('');
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">🛒 Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: Cart Items */}
        <div className="md:col-span-2 space-y-6 overflow-y-auto max-h-[70vh] pr-2">
          {cartEntries.length === 0 ? (
            <p className="text-lg text-gray-600">Your cart is empty.</p>
          ) : (
            cartEntries.map(([productId, quantity]) => {
              const product = products.find((p) => p.id === parseInt(productId));

              if (!product) return null;

              return (
                <div
                  key={productId}
                  className="flex items-center gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={product.images}
                    alt={product.name}
                    className="w-24 h-24 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-500 text-sm">Category: {product.category}</p>
                    <p className="text-indigo-600 font-medium text-lg mt-1">
                      ₹{product.offerPrice}{' '}
                      <span className="text-gray-400 line-through ml-1 text-sm">
                        ₹{product.price}
                      </span>
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => handleRemoveFromCart(product)}
                        className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">{quantity}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Total & Address */}
        <div className="sticky top-6 h-fit bg-white p-6 border rounded-xl shadow-lg flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Cart Summary</h2>

          <div className="flex flex-col gap-2 text-gray-600">
            {cartEntries.map(([productId, quantity]) => {
              const product = products.find((p) => p.id === parseInt(productId));
              if (!product) return null;

              return (
                <div key={productId} className="flex justify-between">
                  <span className="font-medium">{product.name}</span>
                  <span>
                    ₹{product.offerPrice} × {quantity}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t pt-4 mt-2 flex justify-between text-lg font-semibold text-gray-800">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="flex justify-between">
            <span>GST (2%):</span>
            <span>₹{gstAmount}</span>
          </div>
          <div className="border-t pt-3 mt-2 flex justify-between text-lg font-semibold text-gray-800">
            <span>Total Amount:</span>
            <span>₹{grandTotal}</span>
          </div>

          {/* Pincode Input */}
          <div>
            <label className="font-medium text-gray-700">Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={handlePincodeChange}
              className="mt-1 w-full border rounded px-3 py-2"
              placeholder="6-digit pincode"
              maxLength={6}
            />
            {pinError && <p className="text-red-500 text-sm mt-1">{pinError}</p>}
          </div>

          {/* Village */}
          <div>
            <label className="font-medium text-gray-700">Village</label>
            <input
              type="text"
              value={village}
              readOnly
              className="mt-1 w-full border rounded px-3 py-2 bg-gray-100"
              placeholder="Village name auto-fetched"
            />
          </div>

          {/* Address */}
          <div>
            <label className="font-medium text-gray-700">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              readOnly={!isEditing}
              className={`mt-1 w-full border rounded px-3 py-2 ${
                isEditing ? 'bg-white' : 'bg-gray-100'
              }`}
              placeholder="Enter delivery address"
              rows={3}
            />
            <button
              onClick={toggleEdit}
              className="mt-2 text-sm text-indigo-600 hover:underline font-medium"
            >
              {isEditing ? 'Save Address' : 'Edit Address'}
            </button>
          </div>
          <Link to="/payment">
  <div className="mt-4">
    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-medium transition">
      Proceed to Checkout
    </button>
  </div>
</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
