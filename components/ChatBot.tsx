'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './ChatBot.module.css'

interface SymptomMatch {
  keywords: string[]
  title: string
  suggestions: { name: string; slug: string; desc: string }[]
}

const symptomMap: SymptomMatch[] = [
  {
    keywords: ['joint', 'knee', 'arthritis', 'bone', 'cartilage', 'stiff'],
    title: 'Joint & Bone Health',
    suggestions: [
      { name: 'Arthroxtra BF Suma 60 Tablets', slug: 'arthroxtra-bf-suma-60-tablets', desc: 'Supports cartilage and reduces joint discomfort' },
      { name: 'Gluzojoint Ultra Pro 4-in-1 60 Tablets', slug: 'gluzojoint-ultra-pro-4-in-1-60-tablets', desc: 'Advanced 4-in-1 joint care formula' },
      { name: 'Gluzojoint-F 60 Capsules', slug: 'gluzojoint-f-60-capsules', desc: 'Joint flexibility and mobility support' },
      { name: 'ZaminoCal Plus Capsules 60 Capsules', slug: 'zaminocal-plus-capsules-60-capsules', desc: 'Bone density and strength supplement' },
    ],
  },
  {
    keywords: ['pain', 'ache', 'muscle', 'sore', 'inflammation', 'swell'],
    title: 'Pain & Muscle Relief',
    suggestions: [
      { name: 'BF Suma CoolRoll Oil', slug: 'bf-suma-coolroll-oil', desc: 'Cooling massage oil for muscle and joint pain' },
      { name: 'Arthroxtra BF Suma 60 Tablets', slug: 'arthroxtra-bf-suma-60-tablets', desc: 'Joint discomfort relief supplement' },
      { name: 'Gluzojoint Ultra Pro 4-in-1 60 Tablets', slug: 'gluzojoint-ultra-pro-4-in-1-60-tablets', desc: 'Anti-inflammatory joint support' },
    ],
  },
  {
    keywords: ['skin', 'acne', 'aging', 'wrinkle', 'face', 'dry skin', 'pimple', 'dark spot', 'glow'],
    title: 'Skincare & Anti-Aging',
    suggestions: [
      { name: 'Suma Grand 1 (Cleanser, Lotion, Toner)', slug: 'suma-grand-1-cleanser-lotion-toner', desc: 'Complete 3-piece anti-aging skincare system' },
      { name: 'Suma Grand 2 (Cleanser, Lotion, Toner, Facemask Cream)', slug: 'suma-grand-2-cleanser-lotion-toner-facemask-cream', desc: '4-piece system with facemask cream' },
      { name: 'Youth Essence Facial Cream', slug: 'youth-essence-facial-cream', desc: 'Deeply moisturizing anti-aging cream' },
      { name: 'Youth Essence Face Mask', slug: 'youth-essence-face-mask', desc: 'Intensive revitalizing face mask' },
      { name: 'BF Suma Anatic Herbal Essence Soap', slug: 'bf-suma-anatic-herbal-essence-soap', desc: 'Natural herbal soap for healthy skin' },
    ],
  },
  {
    keywords: ['energy', 'tired', 'fatigue', 'stamina', 'weak', 'exhaustion', 'low energy'],
    title: 'Energy & Vitality',
    suggestions: [
      { name: 'BF Suma X Power Man Capsules 30 Capsules', slug: 'bf-suma-x-power-man-capsules-30-capsules', desc: 'Men\'s vitality and stamina booster' },
      { name: 'Xpower Coffee for Men 8 Sachets', slug: 'xpower-coffee-for-men-8-sachets', desc: 'Energizing coffee for stamina' },
      { name: '4-in-1 Cordyceps Coffee 20 Sachets', slug: '4-in-1-cordyceps-coffee-20-sachets', desc: 'Stamina-boosting mushroom coffee' },
      { name: 'NMN Coffee 20 Sachets', slug: 'nmn-coffee-20-sachets', desc: 'Anti-aging coffee for cellular energy' },
    ],
  },
  {
    keywords: ['immunity', 'immune', 'cold', 'flu', 'infection', 'sick', 'defense'],
    title: 'Immune Support',
    suggestions: [
      { name: 'Quad Reishi Capsules 60 Capsules', slug: 'quad-reishi-capsules-60-capsules', desc: 'Comprehensive immune support supplement' },
      { name: 'Pure & Broken Ganoderma Oil 60 Capsules Deluxe', slug: 'pure-broken-ganoderma-oil-60-capsules-deluxe', desc: 'Antioxidant-rich immune booster' },
      { name: 'Refined Yunzhi Essence 60 Capsules', slug: 'refined-yunzhi-essence-60-capsules', desc: 'Premium Turkey Tail mushroom for immunity' },
      { name: '4-in-1 Reishi Coffee 20 Sachets', slug: '4-in-1-reishi-coffee-20-sachets', desc: 'Immune-supporting mushroom coffee' },
    ],
  },
  {
    keywords: ['digestion', 'stomach', 'bloating', 'constipation', 'gut', 'indigestion', 'digestive', 'bowel'],
    title: 'Digestive Health',
    suggestions: [
      { name: 'Probio3 BF Suma', slug: 'probio3-bf-suma', desc: 'Triple-strain probiotic for gut health' },
      { name: 'BF Suma ConstiRelax Oral Solution', slug: 'bf-suma-constirelax-oral-solution', desc: 'Gentle relief from constipation' },
      { name: 'Novel Depile Capsules BF Suma 60 Tablets', slug: 'novel-depile-capsules-bf-suma-60-tablets', desc: 'Digestive wellness and regularity support' },
      { name: 'Veggie Veggie BF Suma 15 Sachets', slug: 'veggie-veggie-bf-suma-15-sachets', desc: 'Fruit and veggie extract for daily nutrition' },
    ],
  },
  {
    keywords: ['weight', 'fat', 'obese', 'overweight', 'slim', 'diet', 'appetite', 'metabolism'],
    title: 'Weight Management',
    suggestions: [
      { name: 'BF Suma Ez Xlim Tablets 90 Tablets', slug: 'bf-suma-ez-xlim-tablets-90-tablets', desc: 'Metabolism booster and appetite control' },
      { name: 'Detoxilive Capsules 60 Capsules', slug: 'detoxilive-capsules-60-capsules', desc: 'Liver detox to support weight loss' },
      { name: 'BF GymEffect Capsules 60 Capsules', slug: 'bf-gymeffect-capsules-60-capsules', desc: 'Pre-workout fat metabolism support' },
    ],
  },
  {
    keywords: ['memory', 'brain', 'focus', 'concentration', 'mental', 'mind', 'cognition', 'forget'],
    title: 'Brain & Cognitive Health',
    suggestions: [
      { name: 'Cerebrain Tablets 60 Tablets', slug: 'cerebrain-tablets-60-tablets', desc: 'Cognitive function and memory support' },
      { name: 'NMN Share Mind 60 Capsules', slug: 'nmn-share-mind-60-capsules', desc: 'NMN brain health for mental clarity' },
      { name: 'Micro2 Cycle Tablets 100 Tablets', slug: 'micro2-cycle-tablets-100-tablets', desc: 'Brain circulation support' },
    ],
  },
  {
    keywords: ['heart', 'blood pressure', 'cholesterol', 'cardiovascular', 'circulation', 'blood flow'],
    title: 'Heart & Circulation',
    suggestions: [
      { name: 'BF Suma Relivin Tea 20 Sachets', slug: 'bf-suma-relivin-tea-20-sachets', desc: 'Herbal tea for cardiovascular health' },
      { name: 'Micro2 Cycle Tablets 100 Tablets', slug: 'micro2-cycle-tablets-100-tablets', desc: 'Circulation and heart function support' },
    ],
  },
  {
    keywords: ['sleep', 'insomnia', 'restless', 'sleepless'],
    title: 'Sleep & Relaxation',
    suggestions: [
      { name: 'Quad Reishi Capsules 60 Capsules', slug: 'quad-reishi-capsules-60-capsules', desc: 'Reishi promotes restful sleep and relaxation' },
      { name: '4-in-1 Reishi Coffee 20 Sachets', slug: '4-in-1-reishi-coffee-20-sachets', desc: 'Calming mushroom coffee' },
    ],
  },
  {
    keywords: ['prostate', 'urinary', 'urine', 'men health'],
    title: 'Men\'s Health',
    suggestions: [
      { name: 'BF Suma Prostatrelax Capsules 60\'s', slug: 'bf-suma-prostatrelax-capsules-60-s', desc: 'Prostate and urinary function support' },
      { name: 'BF Suma X Power Man Capsules 30 Capsules', slug: 'bf-suma-x-power-man-capsules-30-capsules', desc: 'Vitality and stamina for men' },
      { name: 'Xpower Coffee for Men 8 Sachets', slug: 'xpower-coffee-for-men-8-sachets', desc: 'Energizing coffee for men' },
    ],
  },
  {
    keywords: ['women', 'female', 'feminine', 'period', 'menstrual', 'menopause', 'hormonal'],
    title: 'Women\'s Health',
    suggestions: [
      { name: 'BF Suma Feminergy 60 Capsules', slug: 'bf-suma-feminergy-60-capsules', desc: 'Hormonal balance and vitality for women' },
      { name: 'BF Suma Femicare Feminine Cleanser', slug: 'bf-suma-femicare-feminine-cleanser', desc: 'Gentle feminine hygiene cleanser' },
    ],
  },
  {
    keywords: ['detox', 'liver', 'cleanse', 'toxins', 'toxin'],
    title: 'Detox & Liver Health',
    suggestions: [
      { name: 'Detoxilive Capsules 60 Capsules', slug: 'detoxilive-capsules-60-capsules', desc: 'Liver detox and cleansing support' },
      { name: 'Veggie Veggie BF Suma 15 Sachets', slug: 'veggie-veggie-bf-suma-15-sachets', desc: 'Daily nutrition boost with antioxidants' },
    ],
  },
  {
    keywords: ['children', 'child', 'kid', 'baby', 'kids'],
    title: 'Children\'s Health',
    suggestions: [
      { name: 'BF Suma Calcium & Vitamin D3 Strawberry Flavour', slug: 'bf-suma-calcium-vitamin-d3-strawberry', desc: 'Bone health for growing children' },
      { name: 'BF Suma Vitamin C 100mg Chewable Tablet', slug: 'bf-suma-vitamin-c-100mg-chewable-tablet', desc: 'Immune support chewable for kids' },
      { name: 'Sharp Vision Eye Health Chewable Tablets 90 Tablets', slug: 'sharp-vision-eye-health-chewable-tablets-90', desc: 'Eye health for reduced digital strain' },
    ],
  },
  {
    keywords: ['fitness', 'gym', 'workout', 'exercise', 'pre-workout', 'muscle', 'recovery'],
    title: 'Fitness & Gym',
    suggestions: [
      { name: 'BF GymEffect Capsules 60 Capsules', slug: 'bf-gymeffect-capsules-60-capsules', desc: 'Pre-workout energy and performance' },
      { name: 'BF Suma CoolRoll Oil', slug: 'bf-suma-coolroll-oil', desc: 'Post-workout muscle recovery oil' },
      { name: '4-in-1 Cordyceps Coffee 20 Sachets', slug: '4-in-1-cordyceps-coffee-20-sachets', desc: 'Stamina-boosting pre-workout coffee' },
    ],
  },
  {
    keywords: ['diabetes', 'sugar', 'blood sugar'],
    title: 'Blood Sugar Support',
    suggestions: [
      { name: 'Veggie Veggie BF Suma 15 Sachets', slug: 'veggie-veggie-bf-suma-15-sachets', desc: 'Nutritional support for balanced wellness' },
      { name: 'BF Suma Relivin Tea 20 Sachets', slug: 'bf-suma-relivin-tea-20-sachets', desc: 'Cardiovascular health herbal tea' },
    ],
  },
]

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

interface ChatMessage {
  sender: 'user' | 'bot'
  text: string
  html?: string
  products?: { name: string; slug: string; desc: string }[]
}

function matchSymptoms(input: string): SymptomMatch[] {
  const lower = input.toLowerCase()
  return symptomMap.filter(group =>
    group.keywords.some(kw => lower.includes(kw))
  )
}

export default function ChatBot() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [chat, setChat] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat])

  const handleToggle = () => {
    setOpen(!open)
    if (open) setChat([])
  }

  const addBot = (text: string, products?: { name: string; slug: string; desc: string }[]) => {
    setChat(prev => [...prev, { sender: 'bot', text, products }])
  }

  const addUser = (text: string) => {
    setChat(prev => [...prev, { sender: 'user', text }])
  }

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    addUser(text)
    setInput('')

    const matches = matchSymptoms(text)
    if (matches.length > 0) {
      const seen = new Set<string>()
      const all: { name: string; slug: string; desc: string }[] = []
      for (const m of matches) {
        for (const p of m.suggestions) {
          if (!seen.has(p.slug)) { seen.add(p.slug); all.push(p) }
        }
      }
      const cats = [...new Set(matches.map(m => m.title))].join(', ')
      addBot(`Based on your symptoms, here are products that may help (${cats}):`, all)
    } else {
      addBot("I'm not sure which product matches that. Try different words like 'joint pain', 'skin', 'energy', 'digestion', or pick a FAQ question below.")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend()
  }

  const handleFaq = (q: string) => {
    addUser(q)
    setTimeout(() => {
      setChat(prev => [...prev, { sender: 'bot', text: '', html: faq[q] }])
    }, 100)
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
            {chat.length === 0 && (
              <div className={styles.botMsg}>
                Hi! 👋 I'm the <strong>SSM assistant</strong>. Tell me your symptoms or what you need — I'll recommend the right products for you.
              </div>
            )}
            {chat.map((msg, i) => (
              <div key={i}>
                {msg.sender === 'user' ? (
                  <div className={styles.userMsg}>{msg.text}</div>
                ) : (
                  <div className={styles.botMsg}>
                    {msg.text && <div style={{ marginBottom: msg.products ? '0.5rem' : 0 }}>{msg.text}</div>}
                    {msg.html && <div dangerouslySetInnerHTML={{ __html: msg.html }} />}
                    {msg.products && (
                      <div className={styles.productList}>
                        {msg.products.map(p => (
                          <button key={p.slug} className={styles.prodBtn} onClick={() => router.push(`/products/${p.slug}`)}>
                            <strong>{p.name}</strong>
                            <span>{p.desc}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              className={styles.input}
              placeholder="Describe your symptoms..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className={styles.sendBtn} onClick={handleSend}>Send</button>
          </div>

          <div className={styles.quickReplies}>
            <div className={styles.quickLabel}>Quick FAQ</div>
            {quickQuestions.slice(0, 4).map(q => (
              <button key={q} className={styles.qBtn} onClick={() => handleFaq(q)}>{q}</button>
            ))}
          </div>
        </div>
      )}

      <button onClick={handleToggle} className={styles.fab} aria-label="Ask a question">💬</button>
    </div>
  )
}
