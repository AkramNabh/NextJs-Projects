'use server'

import { auth, db } from '@/Firebase/admin'

import { cookies } from 'next/headers'

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params
    try {
        const userRecord = await db.collection('users').doc(uid).get()
        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists',
            }
        } else {
            await db.collection('users').doc(uid).set({
                name,
                email,
            })
            return {
                success: true,
                message: 'Account created successfully',
            }
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error('error creating a user', e.message)
        } else {
            console.error('error creating a user', e)
        }

        if (typeof e === 'object' && e !== null && 'code' in e) {
            const errorCode = (e as { code: string }).code
            if (errorCode === 'auth/email-already-exists') {
                return {
                    success: false,
                    message: 'this email is already in use',
                }
            }
        }

        return {
            success: false,
            message: 'failed to create an account',
        }
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params
    await setSessionCookie(idToken)
    try {
        const userRecord = await auth.getUserByEmail(email)
        if (!userRecord) {
            return {
                success: false,
                message: 'User doesnt exist',
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'failed to log into account',
        }
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies()
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: 60 * 60 * 24 * 7 * 1000,
    })

    cookieStore.set('session', sessionCookie, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    })
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')?.value
    if (!sessionCookie) {
        console.log('no session cookies')
        return null
    } else {
        try {
            const decodedClaims = await auth.verifySessionCookie(
                sessionCookie,
                true
            )
            const userRecords = await db
                .collection('users')
                .doc(decodedClaims.uid)
                .get()
            if (!userRecords.exists) {
                return null
            } else {
                return {
                    ...userRecords.data(),
                    id: userRecords.id,
                } as User
            }
        } catch (error) {
            console.log('error occured!', error)
            return null
        }
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser()
    console.log('use authenticated')
    return !!user
}
