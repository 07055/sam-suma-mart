import { getPrisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')

  if (!productId) {
    return NextResponse.json({ error: 'productId is required' }, { status: 400 })
  }

  const prisma = getPrisma()
  const reviews = await prisma.review.findMany({
    where: { productId, approved: true },
    orderBy: { createdAt: 'desc' },
  })

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0

  return NextResponse.json({ reviews, averageRating, total: reviews.length })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { productId, name, rating, comment } = body

  if (!productId || !name || !rating || !comment) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
  }

  const prisma = getPrisma()
  const review = await prisma.review.create({
    data: {
      productId,
      name,
      rating,
      comment,
      approved: false,
    },
  })

  return NextResponse.json({ review, message: 'Review submitted and pending approval.' }, { status: 201 })
}
