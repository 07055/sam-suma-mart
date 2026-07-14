import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: "Learn about delivery options, timelines, and costs for orders within Kenya and international shipping from Sam's Suma Mart.",
  alternates: { canonical: "/delivery" },
};

export default function DeliveryPage() {
  return (
    <div className="container" style={{ padding: "6rem 0", maxWidth: "800px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem" }}>
        Shipping &amp; Delivery Policy
      </h1>
      <p style={{ color: "#666", marginBottom: "2.5rem" }}>
        Last updated: July 2026
      </p>

      {/* Kenya Section */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "1rem", color: "#2e7d32" }}>
          🇰🇪 Delivery Within Kenya
        </h2>

        <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
          Nairobi &amp; Major Towns
        </h3>
        <ul style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#444", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li><strong>Delivery time:</strong> 1–3 business days</li>
          <li><strong>Delivery fee:</strong> KSh 200 flat rate</li>
          <li><strong>Coverage:</strong> Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, and surrounding areas</li>
        </ul>

        <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
          Upcountry &amp; Remote Areas
        </h3>
        <ul style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#444", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li><strong>Delivery time:</strong> 3–7 business days</li>
          <li><strong>Delivery fee:</strong> KSh 200 flat rate</li>
          <li>We deliver to all 47 counties in Kenya</li>
        </ul>

        <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
          Payment Options (Kenya)
        </h3>
        <ul style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#444", paddingLeft: "1.5rem" }}>
          <li><strong>M-Pesa Paybill</strong> — Paybill: 303030, Account: 2052132897</li>
          <li><strong>Cash on Delivery (COD)</strong> — pay when your order arrives</li>
        </ul>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "2rem 0" }} />

      {/* International Section */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "1rem", color: "#1565c0" }}>
          🌍 International Orders
        </h2>

        <p style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#444", marginBottom: "1rem" }}>
          We welcome international customers! You can browse and add products to your cart as normal.
          At checkout, tap <strong>&quot;Complete Order via WhatsApp&quot;</strong> and we&apos;ll help you
          arrange payment and delivery directly.
        </p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
          How It Works
        </h3>
        <ul style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#444", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li>Browse our shop and add items to your cart</li>
          <li>At checkout, fill in your delivery details and tap <strong>&quot;Complete Order via WhatsApp&quot;</strong></li>
          <li>We&apos;ll confirm availability, shipping costs, and delivery timeframe based on your location</li>
          <li>Payment is arranged directly with you via WhatsApp</li>
        </ul>

        <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
          Important Notes
        </h3>
        <ul style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#444", paddingLeft: "1.5rem" }}>
          <li>All prices are displayed in <strong>Kenyan Shillings (KSh)</strong></li>
          <li>Shipping costs and delivery timeframes will be confirmed with you directly based on your location</li>
          <li>Customs duties, taxes, or import fees imposed by your country are the buyer&apos;s responsibility</li>
          <li>Online payment for international orders is not yet available — all orders are arranged via WhatsApp</li>
        </ul>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "2rem 0" }} />

      {/* General */}
      <section>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "1rem" }}>
          Order Tracking
        </h2>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#444", marginBottom: "1rem" }}>
          Once your order ships, you will receive tracking details via phone (Kenya) or email (international).
          You can also check your order status anytime from your{" "}
          <a href="/orders" style={{ color: "#2e7d32", fontWeight: 600 }}>My Orders</a> page.
        </p>

        <h2 style={{ fontSize: "1.4rem", fontWeight: "700", marginTop: "2rem", marginBottom: "1rem" }}>
          Questions?
        </h2>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#444" }}>
          Contact us on{" "}
          <a href="https://wa.me/254796388790" target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontWeight: 600 }}>
            WhatsApp
          </a>{" "}
          or email us for any delivery-related queries.
        </p>
      </section>
    </div>
  );
}
