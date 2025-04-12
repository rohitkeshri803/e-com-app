import React, { useState, useEffect } from "react"; 
import { Layout } from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsed = JSON.parse(storedCart).map((item) => ({
        ...item,
        quantity: 1,
      }));
      setCart(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalPrice = () => {
    try {
      let total = 0;
      cart.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    const newCart = cart.filter((item) => item._id !== pid);
    setCart(newCart);
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    setCart(updated);
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}
              <p className="text-center">
                {cart.length
                  ? `You Have ${cart.length} item(s) in your cart ${
                      auth?.token ? "" : "Please login to checkout!"
                    }`
                  : "Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-7">
              {cart.map((item) => (
                <div className="card mb-3 w-100 cart-item-card" key={item._id}>
                  <div className="row g-2 align-items-center">
                    <div className="col-md-3">
                      <img
                        src={`/api/v1/product/product-photo/${item._id}`}
                        alt={item.name}
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: "130px" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="cart-item-name">{item.name}</h5>
                      <p>{item.description.substring(0, 40)}...</p>
                      <p className="price">₹{item.price}</p>
                      <p className="total">Total: ₹{item.price * item.quantity}</p>
                      <div className="d-flex align-items-center mt-2 quantity-controls">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => decreaseQty(item._id)}
                        >
                          −
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => increaseQty(item._id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-3 text-end">
                      <button
                        className="btn remove-btn"
                        onClick={() => removeCartItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="col-md-5 cart-summary">
              <div className="summary-card shadow-sm">
                <h2>Cart Summary</h2>
                <p className="summary-text">Review and complete your purchase.</p>
                <hr />
                <div className="total-price">
                  <h4>Total: {totalPrice()}</h4>
                </div>

                {/* Shipping */}
                {auth?.user?.address ? (
                  <div className="mb-3">
                    <h4>Shipping to:</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn update-address-btn"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                ) : (
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/login", { state: "/cart" })}
                      >
                        Please Login to Checkout
                      </button>
                    )}
                  </div>
                )}

                {/* Payment Section */}
                <div className="mt-2">
                  {clientToken && auth?.token && cart.length > 0 && (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <button
                        className="btn btn-primary pay-btn"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing..." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
