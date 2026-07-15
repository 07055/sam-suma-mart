'use server'

import { revalidatePath } from 'next/cache'
import { getPrisma } from './prisma'
import { cookies } from 'next/headers'

export async function createOrder(formData: FormData) {
  const fullName = formData.get('fullName') as string
  const phone = formData.get('phone') as string
  const email = formData.get('email') as string
  const city = formData.get('city') as string
  const address = formData.get('address') as string
  const location = formData.get('location') as string
  const paymentMethod = formData.get('paymentMethod') as string
  const clientTotal = parseFloat(formData.get('total') as string)
  const items = JSON.parse(formData.get('items') as string)

  if (!fullName || !phone || !city || !address) {
    return { success: false, error: 'Please fill in all required fields' }
  }

  const cookieStore = await cookies()
  const userId = cookieStore.get('userId')?.value

  try {
    const prisma = getPrisma()

    // Server-side price verification: look up real prices from the database
    const productIds = items.map((item: any) => item.id).filter(Boolean)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true, name: true },
    })
    const priceMap = new Map(products.map(p => [p.id, p.price]))

    // Recalculate total from database prices
    const deliveryFee = 200
    let serverTotal = deliveryFee
    const verifiedItems = items.map((item: any) => {
      const dbPrice = priceMap.get(item.id)
      if (dbPrice === undefined) {
        throw new Error(`Product not found: ${item.id}`)
      }
      serverTotal += dbPrice * item.quantity
      return {
        name: item.name,
        price: dbPrice,
        quantity: item.quantity,
      }
    })

    // Log potential tampering if totals don't match (within rounding tolerance)
    const difference = Math.abs(clientTotal - serverTotal)
    if (difference > 0.01) {
      console.warn(
        `[CHECKOUT TAMPERING] Client total: ${clientTotal}, Server total: ${serverTotal}, Difference: ${difference}, Items: ${JSON.stringify(items)}`
      )
    }

    const order = await prisma.order.create({
      data: {
        customerName: fullName,
        customerEmail: email || null,
        customerPhone: phone,
        city,
        address,
        location: location || null,
        total: serverTotal,
        paymentMethod: paymentMethod as any,
        paymentStatus: 'PENDING',
        userId: userId || null,
        items: {
          create: verifiedItems
        }
      }
    })

    revalidatePath('/admin')
    revalidatePath('/profile')
    return { success: true, orderId: order.id }
  } catch (error: any) {
    console.error('Order creation failed:', error?.message || error)
    if (error?.message?.includes('connect')) {
      return { success: false, error: 'Database connection error. Please try again.' }
    }
    if (error?.message?.includes('undefined_column') || error?.message?.includes('does not exist')) {
      return { success: false, error: 'System error. Please contact support.' }
    }
    if (error?.message?.includes('Product not found')) {
      return { success: false, error: 'One or more items in your cart are no longer available. Please refresh and try again.' }
    }
    return { success: false, error: 'Failed to create order. Please try again.' }
  }
}

export async function getOrders() {
  const prisma = getPrisma()
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true, user: true }
  })
}