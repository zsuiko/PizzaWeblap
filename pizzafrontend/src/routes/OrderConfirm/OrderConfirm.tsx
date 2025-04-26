import { useNavigate } from "react-router-dom";
import "./OrderConfirm.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/backend-conf";
import { Orders } from "../../utils/types";
import { sendOrderConfirmation } from "../../utils/sendEmail";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderConfirm = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestOrder, setLatestOrder] = useState<Orders | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const accesstoken = localStorage.getItem("accessToken");

        const response = await fetch(`${BASE_URL}/api/Orders/my-orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized - Please login again");
          }
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);

        // Get the most recent order (assuming orders are sorted by date)
        if (data.length > 0) {
          // Sort orders by date (newest first)
          const sortedOrders = [...data].sort(
            (a, b) =>
              new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          );
          setLatestOrder(sortedOrders[0]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Send email when latest order is available
  useEffect(() => {
    const sendEmail = async () => {
      if (latestOrder && !emailSent) {
        try {
          let userName = "Valued Customer";
          let deliveryAddressFormatted = latestOrder.deliveryAddress;
          
          // Get user name and delivery address from order
          try {
            const deliveryAddressObj = JSON.parse(latestOrder.deliveryAddress);
            if (deliveryAddressObj) {
              if (deliveryAddressObj.fullName) {
                userName = deliveryAddressObj.fullName;
              }
              
              deliveryAddressFormatted = `${deliveryAddressObj.fullName || 'Customer'}, ${deliveryAddressObj.address}, ${deliveryAddressObj.city}, ${deliveryAddressObj.zipCode}`;
            }
          } catch (error) {
            console.log("Could not parse address as JSON, using as is");
          }
          
          // Call sendOrderConfirmation - it will handle email retrieval internally
          await sendOrderConfirmation(
            "", // Empty string - the function will get email from localStorage
            latestOrder.orderItems,
            userName,
            latestOrder.id,
            latestOrder.orderDate,
            latestOrder.totalAmount,
            deliveryAddressFormatted
          );
          
          setEmailSent(true);
          toast.success("Order confirmation sent to your email!");
        } catch (error) {
          console.error("Failed to send order confirmation email:", error);
          toast.error(`Email error: ${(error as any)?.message || 'Unknown error'}`);
        }
      }
    };
    sendEmail();
  }, [latestOrder, emailSent]);

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (!latestOrder) {
    return (
      <div className="order-confirm-container">
        <div className="order-confirm-card">
          <h1>No Order Found</h1>
          <p>We couldn't find your order information.</p>
          <button
            onClick={() => navigate("/")}
            className="continue-shopping-btn"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  // Calculate order totals
  const subtotal = latestOrder.orderItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
  const total = subtotal;

  // Parse the delivery address (assuming it's stored as a JSON string)
  let deliveryAddressObj;
  let deliveryAddressFormatted = latestOrder.deliveryAddress;
  try {
    deliveryAddressObj = JSON.parse(latestOrder.deliveryAddress);
    if (deliveryAddressObj) {
      deliveryAddressFormatted = `${deliveryAddressObj.fullName}, ${deliveryAddressObj.address}, ${deliveryAddressObj.city}, ${deliveryAddressObj.zipCode}`;
    }
  } catch (error) {
    console.log("Could not parse address as JSON, using as is");
  }

  return (
    <div className="order-confirm-container">
      <div className="order-confirm-card">
        <div className="order-confirm-header">
          <svg className="order-confirm-icon" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
            />
          </svg>
          <h1>Order Confirmed!</h1>
          <p className="order-confirm-subtext">Thank you for your purchase</p>
        </div>

        <div className="order-details-section">
          <h2>Order Details</h2>
          <div className="order-meta">
            <div className="order-meta-item">
              <span>Order Number:</span>
              <strong>#{latestOrder.id}</strong>
            </div>
            <div className="order-meta-item">
              <span>Date:</span>
              <strong>
                {new Date(latestOrder.orderDate).toLocaleDateString()}
              </strong>
            </div>
          </div>

          <div className="order-items">
            {latestOrder.orderItems.map((item) => (
              <div key={item.id} className="order-item">
                <img
                  src={item.product.imageUrl || "/pizza-placeholder.jpg"}
                  alt={item.product.name}
                  className="item-image"
                  onError={(e) => {
                    // Only replace with placeholder if it's not already the placeholder
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes("pizza-placeholder.jpg")) {
                      target.src = "/pizza-placeholder.jpg";
                    }
                  }}
                />
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="item-price">{item.totalPrice} Ft</div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{subtotal} Ft</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{total} Ft</span>
            </div>
          </div>
        </div>

        <div className="delivery-info">
          <h2>Delivery Information</h2>
          <p>{deliveryAddressFormatted}</p>
          <p className="payment-method">
            <span>Payment Method:</span> Cash on Delivery
          </p>
        </div>

        <button onClick={() => navigate("/")} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};


export default OrderConfirm;

