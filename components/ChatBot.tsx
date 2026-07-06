'use client'

import { useState } from 'react'
import styles from './ChatBot.module.css'

const faq: Record<string, string> = {
  'What products do you sell?':
    'We sell <strong>medical supplies, healthcare products, and BF Suma wellness products</strong> including skincare, joint pain relief, surgical supplies, first aid kits, and more.',
  'Do you deliver?':
    'Yes! We deliver across <strong>Nairobi and all counties in Kenya</strong>. Delivery times vary by location — typically 1–3 days within Nairobi and 3–7 days upcountry.',
  'What payment methods do you accept?':
    'We accept <strong>Paystack (card, mobile money)</strong> and <strong>Cash on Delivery (COD)</strong>. Pay securely online or pay when your order arrives.',
  'How do I track my order?':
    'Once your order is placed, you\'ll receive updates via phone. You can also check your order history in the <strong>Profile</strong> page after logging in.',
  'What is your return policy?':
    'If you receive a damaged or incorrect item, contact us within <strong>48 hours</strong> of delivery and we\'ll arrange a replacement or refund.',
  'How do I contact you?':
    'You can reach us on <strong>WhatsApp at 0796 388 790</strong> or visit our contact page. We\'re here to help!',
  'How do I place an order?':
    'Simply <strong>browse our shop</strong>, add items to your cart, proceed to checkout, fill in your delivery details, and choose your payment method. Easy!',
}

const quickQuestions = Object.keys(faq)

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (q: string) => {
    setSelected(q)
  }

  const handleToggle = () => {
    setOpen(!open)
    if (open) setSelected(null)
  }

  return (
    <div className={styles.container}>
      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <span className={styles.headerTitle}>💬 SSM Assistant</span>
            <button onClick={handleToggle} className={styles.closeBtn}>✕</button>
          </div>

          <div className={styles.messages}>
            {!selected ? (
              <div className={styles.botMsg}>
                Hi! 👋 I'm the <strong>SSM assistant</strong>. Pick a question below to learn more about our store.
              </div>
            ) : (
              <>
                <div className={styles.botMsg} style={{ background: '#e8f5e9', alignSelf: 'flex-end', borderRadius: '8px 8px 2px 8px' }}>
                  {selected}
                </div>
                <div className={styles.botMsg} dangerouslySetInnerHTML={{ __html: faq[selected] }} />
              </>
            )}
          </div>

          <div className={styles.quickReplies}>
            <div className={styles.quickLabel}>Common Questions</div>
            {quickQuestions.map(q => (
              <button
                key={q}
                className={styles.qBtn}
                onClick={() => handleSelect(q)}
                style={q === selected ? { background: '#c8e6c9', fontWeight: '600' } : {}}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <button onClick={handleToggle} className={styles.fab} aria-label="Ask a question">
        💬
      </button>
    </div>
  )
}
