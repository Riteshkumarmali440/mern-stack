import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, handleRemoveFromCart, addToCart, products } = useAppContext();

  const cartEntries = Object.entries(cartItems);

  const totalPrice = cartEntries.reduce((total, [productId, quantity]) => {
    const product = products.find((p) => p._id === productId);
    return product ? total + product.offerPrice * quantity : total;
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
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6 overflow-y-auto max-h-[70vh] pr-2">
          {cartEntries.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartEntries.map(([productId, quantity]) => {
              const product = products.find((p) => p._id === productId);
              if (!product) return null;

              return (
                <div key={productId} className="flex items-center gap-4 p-4 border rounded-xl">
                  <img  src={(product.images && product.images.length > 0) ? product.images[0] : 'fallback-image.jpg'} className="w-24 h-24 rounded" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-indigo-600 font-medium mt-1">
                      ₹{product.offerPrice}{' '}
                      <span className="line-through text-gray-400 ml-1">₹{product.price}</span>
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => handleRemoveFromCart(product._id)}
                        className="w-8 h-8 bg-red-500 text-white rounded-full"
                        disabled={quantity === 1}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-8 h-8 bg-green-500 text-white rounded-full"
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

        {/* Summary */}
        <div className="sticky top-6 bg-white p-6 border rounded-xl">
          <h2 className="text-2xl font-bold">Cart Summary</h2>
          <div className="mt-4">
            {cartEntries.map(([productId, quantity]) => {
              const product = products.find((p) => p._id === productId);
              if (!product) return null;
              return (
                <div key={productId} className="flex justify-between">
                  <span>{product.name}</span>
                  <span>
                    ₹{product.offerPrice} × {quantity}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 border-t pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span>GST (2%):</span>
              <span>₹{gstAmount}</span>
            </div>
            <div className="flex justify-between font-semibold mt-2">
              <span>Total Amount:</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>

          {/* Pincode, Address */}
          <div className="mt-4">
            <input
              type="text"
              value={pincode}
              onChange={handlePincodeChange}
              placeholder="6-digit pincode"
              maxLength={6}
              className="w-full border px-3 py-2 rounded mb-2"
            />
            {pinError && <p className="text-red-500 text-sm">{pinError}</p>}
            <input
              type="text"
              value={village}
              readOnly
              placeholder="Village"
              className="w-full border px-3 py-2 rounded bg-gray-100 mb-2"
            />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              readOnly={!isEditing}
              rows={3}
              placeholder="Enter delivery address"
              className={`w-full border px-3 py-2 rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
            />
            <button
              onClick={toggleEdit}
              className="text-indigo-600 mt-1 text-sm font-medium"
            >
              {isEditing ? 'Save Address' : 'Edit Address'}
            </button>
          </div>

          <Link to="/payment">
            <button className="w-full mt-4 bg-indigo-600 text-white py-3 rounded text-lg">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
