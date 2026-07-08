'use client'

import { useState, useEffect } from 'react'

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  createdAt: string
}

interface ReviewSectionProps {
  productId: string
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews || [])
        setAverageRating(data.averageRating || 0)
        setTotal(data.total || 0)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [productId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.comment.trim()) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, productId }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit')
      }
      setSubmitted(true)
      setForm({ name: '', rating: 5, comment: '' })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#f5a623' : '#ddd', fontSize: '1.1rem' }}>
        ★
      </span>
    ))
  }

  return (
    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e0e0e0' }}>
      <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
        Customer Reviews
      </h2>

      {total > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>{averageRating.toFixed(1)}</span>
          <span>{renderStars(Math.round(averageRating))}</span>
          <span style={{ color: '#666', fontSize: '0.85rem' }}>({total} review{total !== 1 ? 's' : ''})</span>
        </div>
      )}

      {loading ? (
        <p style={{ color: '#999' }}>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>No reviews yet. Be the first to review this product!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {reviews.map((review) => (
            <div key={review.id} style={{
              padding: '1rem',
              background: '#f9f9f9',
              borderRadius: '8px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <strong style={{ fontSize: '0.9rem' }}>{review.name}</strong>
                <div>{renderStars(review.rating)}</div>
              </div>
              <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: '1.5' }}>{review.comment}</p>
              <p style={{ color: '#999', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {new Date(review.createdAt).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      )}

      {submitted ? (
        <div style={{
          padding: '1rem',
          background: '#e8f5e9',
          color: '#2e7d32',
          borderRadius: '8px',
          fontSize: '0.9rem',
        }}>
          Thank you! Your review has been submitted and is pending approval.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Write a Review</h3>

          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>
              Your Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={{
                width: '100%', padding: '0.5rem', border: '1px solid #ddd',
                borderRadius: '4px', fontSize: '0.9rem',
              }}
              placeholder="Enter your name"
            />
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>
              Rating
            </label>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm({ ...form, rating: star })}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '1.5rem', padding: '0',
                    color: star <= form.rating ? '#f5a623' : '#ddd',
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>
              Your Review
            </label>
            <textarea
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              required
              rows={3}
              style={{
                width: '100%', padding: '0.5rem', border: '1px solid #ddd',
                borderRadius: '4px', fontSize: '0.9rem', resize: 'vertical',
              }}
              placeholder="Share your experience with this product..."
            />
          </div>

          {error && (
            <p style={{ color: '#d32f2f', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary"
            style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', border: 'none' }}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  )
}
