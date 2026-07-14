import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Refund Policy",
  description: "Learn about our return and refund policy for orders placed on Sam's Suma Mart. Easy returns within 15 days for defective or incorrect items.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <div className="container" style={{ padding: "6rem 0", maxWidth: "800px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem" }}>
        Returns &amp; Refund Policy
      </h1>
      <p style={{ color: "#666", marginBottom: "2.5rem" }}>
        Last updated: July 2026
      </p>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "1rem" }}>
          Return Eligibility
        </h2>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#444", marginBottom: "1rem" }}>
          We want you to be completely satisfied with your purchase. You may return items under the following conditions:
        </p>
        <ul style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#444", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li><strong>Damaged or defective items:</strong> Contact us within <strong>48 hours</strong> of delivery with photos of the damage.</li>
          <li><strong>Incorrect items:</strong> If you received the wrong product, contact us within <strong>48 hours</strong> of delivery.</li>
          <li><strong>Unopened products:</strong> Unopened, unused items may be returned within <strong>15 days</strong> of delivery for a full refund.</li>
        </ul>

        <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginTop: "2rem", marginBottom: "1rem" }}>
          Non-Returnable Items
        </h2>
        <ul style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#444", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li>Opened or used products (unless defective)</li>
          <li>Products without original packaging</li>
          <li>Items returned after the 15-day window</li>
        </ul>

        <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginTop: "2rem", marginBottom: "1rem" }}>
          How to Initiate a Return
        </h2>
        <ol style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#444", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li>Contact us via{" "}
            <a href="https://wa.me/254796388790" target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontWeight: 600 }}>
              WhatsApp
            </a>{" "}
            or email with your order ID and reason for return.
          </li>
          <li>Our team will review your request and provide return instructions.</li>
          <li>Ship the item back to us (return shipping costs may apply for non-defective returns).</li>
          <li>Once we receive and inspect the item, we will process your refund or replacement.</li>
        </ol>

        <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginTop: "2rem", marginBottom: "1rem" }}>
          Refunds
        </h2>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#444" }}>
          Refunds are processed within <strong>5–7 business days</strong> of receiving the returned item.
          Refunds are issued to the original payment method. For M-Pesa and Cash on Delivery payments,
          refunds will be made via M-Pesa or bank transfer.
        </p>
      </section>
    </div>
  );
}
