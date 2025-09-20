'use server';

import { headers } from 'next/headers';
import { auth } from '../auth';
import {
  loginSchema,
  serverLoginSchema,
  TLoginSchema,
  TUserSchema,
  userSchema,
} from '../schemas';
import z from 'zod';

export async function signUp(userDetails: TUserSchema) {
  try {
    const validatedFields = userSchema.safeParse(userDetails);

    if (!validatedFields.success) {
      return {
        success: false,
        message: 'Please Enter correct values',
        error: z.flattenError(validatedFields.error),
        data: null,
      };
    }

    const response = await auth.api.signUpEmail({
      body: { ...validatedFields.data, callbackURL: '/dashboard' },
    });

    return {
      success: true,
      data: response,
      error: null,
      message: 'Registration successful',
    };
  } catch (err: any) {
    let message =
      err?.body?.error ?? err?.message ?? 'An unexpected error occurred';

    const status = err?.statusCode ?? 500;

    if (status === 500) message = 'An unexpected error occurred';

    return {
      success: false,
      error: message,
      data: null,
      message: 'Something went wrong',
    };
  }
}
export async function signIn(userDetails: TLoginSchema) {
  try {
    const validatedFields = serverLoginSchema.safeParse(userDetails);

    if (!validatedFields.success) {
      //   console.log(z.flattenError(validatedFields.error));
      return {
        success: false,
        message: 'Email or password is wrong.',
        error: 'Invalid email or password',
        data: null,
      };
    }

    const response = await auth.api.signInEmail({
      body: { ...validatedFields.data, rememberMe: true },
    });

    return {
      success: true,
      data: response,
      message: 'Login successful',
      error: null,
    };
  } catch (err: any) {
    let message =
      err?.body?.error ?? err?.message ?? 'An unexpected error occurred';

    const status = err?.statusCode ?? 500;

    if (status === 500) message = 'An unexpected error occurred';

    return {
      success: false,
      error: message,
      message: 'An error occurred',
      data: null,
    };
  }
}

export async function signOut() {
  try {
    const res = await auth.api.signOut({
      headers: await headers(),
    });
    return res;
  } catch {
    return { success: false };
  }
}

export async function signInSocial(provider: 'github' | 'google') {
  try {
    const res = await auth.api.signInSocial({
      body: { provider, callbackURL: '/dashboard' },
    });
    return { success: true, res };
  } catch (error) {
    return { success: false, res: null };
  }
}

// export async function signInSocial(provider: 'github' | 'google') {
//   let res;

//   try {
//     res = await auth.api.signInSocial({
//       body: { provider, callbackURL: '/dashboard' },
//     });
//   } catch (error) {
//     console.log(error);
//     return { success: false, message: 'something went wrong.' };
//   }

//   if (res.redirect && res.url) {
//     redirect(res.url);
//   }
// }

// export async function loginWithGoogle() {
//   const res = await auth.api.signInSocial({
//     body: { provider: 'github', callbackURL: '/dashboard' },
//   });

//   if (res.redirect && res.url) {
//     redirect(res.url);
//   }
// }
