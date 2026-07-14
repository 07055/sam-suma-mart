import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Get help with orders, payments, delivery, and product questions at Sam's Suma Mart. Contact us on WhatsApp or browse FAQs.",
  alternates: { canonical: "/help" },
};

export default function HelpPage() {
  return (
    <div className="container" style={{ padding: "6rem 0", maxWidth: "800px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem" }}>
        Help Center
      </h1>
      <p style={{ color: "#666", marginBottom: "2.5rem" }}>
        Find answers to common questions or get in touch with our team.
      </p>

      {/* Quick Links */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "1rem" }}>
          Quick Links
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          <a href="/delivery" style={{ display: "block", padding: "1.25rem", border: "1px solid #eee", borderRadius: "8px", textDecoration: "none", color: "#333", transition: "box-shadow 0.2s" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📦</div>
            <div style={{ fontWeight: "700", fontSize: "0.95rem", marginBottom: "0.25rem" }}>Shipping &amp; Delivery</div>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>Delivery times, costs, and tracking</div>
          </a>
          <a href="/returns" style={{ display: "block", padding: "1.25rem", border: "1px solid #eee", borderRadius: "8px", textDecoration: "none", color: "#333", transition: "box-shadow 0.2s" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🔄</div>
            <div style={{ fontWeight: "700", fontSize: "0.95rem", marginBottom: "0.25rem" }}>Returns &amp; Refunds</div>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>How to return items and get refunds</div>
          </a>
          <a href="/orders" style={{ display: "block", padding: "1.25rem", border: "1px solid #eee", borderRadius: "8px", textDecoration: "none", color: "#333", transition: "box-shadow 0.2s" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📋</div>
            <div style={{ fontWeight: "700", fontSize: "0.95rem", marginBottom: "0.25rem" }}>Track My Order</div>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>Check your order status</div>
          </a>
          <a href="/shop" style={{ display: "block", padding: "1.25rem", border: "1px solid #eee", borderRadius: "8px", textDecoration: "none", color: "#333", transition: "box-shadow 0.2s" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🛒</div>
            <div style={{ fontWeight: "700", fontSize: "0.95rem", marginBottom: "0.25rem" }}>Browse Shop</div>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>View all BF Suma products</div>
          </a>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "2rem 0" }} />

      {/* FAQ */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "1rem" }}>
          Frequently Asked Questions
        </h2>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem" }}>What products do you sell?</h3>
          <p style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "#444" }}>
            We sell authentic BF Suma health and wellness products including anti-aging skincare,
            NMN supplements, joint care, immune support, digestive health, and more.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem" }}>How do I place an order?</h3>
          <p style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "#444" }}>
            Browse our shop, add items to your cart, proceed to checkout, fill in your delivery details,
            and choose your payment method. It's that simple.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem" }}>What payment methods do you accept?</h3>
          <p style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "#444" }}>
            Customers in Kenya can pay via <strong>M-Pesa Paybill</strong> (Paybill: 303030, Account: 2052132897) or <strong>Cash on Delivery</strong>. International customers can complete their order via WhatsApp — we&apos;ll arrange payment and delivery directly.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem" }}>How do I track my order?</h3>
          <p style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "#444" }}>
            Once your order ships, you'll receive tracking details via phone (Kenya) or email (international).
            You can also check your order history from the{" "}
            <a href="/orders" style={{ color: "#2e7d32", fontWeight: 600 }}>My Orders</a> page.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem" }}>Do you ship internationally?</h3>
          <p style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "#444" }}>
            Yes! We welcome international customers. Add items to your cart and tap
            &quot;Complete Order via WhatsApp&quot; at checkout — we&apos;ll arrange payment and delivery
            directly. See our{" "}
            <a href="/delivery" style={{ color: "#2e7d32", fontWeight: 600 }}>Shipping &amp; Delivery</a>{" "}
            page for details.
          </p>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "2rem 0" }} />

      {/* Contact */}
      <section>
        <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "1rem" }}>
          Still Need Help?
        </h2>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#444", marginBottom: "1rem" }}>
          Our team is ready to assist you with product recommendations, order issues, and any other questions.
        </p>
        <a
          href="https://wa.me/254796388790"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "0.85rem 2rem",
            background: "#25D366",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "0.95rem",
          }}
        >
          Chat on WhatsApp
        </a>
      </section>
    </div>
  );
}
