import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const existingCountry = request.cookies.get('country')?.value
  const existingOverride = request.cookies.get('country-override')?.value

  const detectedCountry =
    request.headers.get('x-vercel-ip-country') || undefined

  if (existingOverride) {
    if (existingCountry !== existingOverride) {
      response.cookies.set('country', existingOverride, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      })
    }
  } else if (!existingCountry && detectedCountry) {
    response.cookies.set('country', detectedCountry, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    })
  } else if (!existingCountry && !detectedCountry) {
    response.cookies.set('country', 'KE', {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    })
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|uploads/).*)',
  ],
}
