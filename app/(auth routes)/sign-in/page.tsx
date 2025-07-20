'use client';

import css from "./SingIn.module.css"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMe, login } from '@/lib/api/clientApi';
import { LoginRequest } from "@/types/user";
import { useAuth } from "@/lib/store/authStore";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');
 const setIsAuthenticated = useAuth((state) => state.setIsAuthenticated);
const setUser = useAuth((state) => state.setUser);

  
  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues);
      if (res) {
        setIsAuthenticated(true);
        const user = await getMe();
        setUser(user);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.log('error', error);
      setError('Invalid email or password');
    }
  };

  return (
    <main className={css.mainContent}>
    <form className={css.form} action={handleSubmit}>
       <h1 className={css.formTitle}>Sign in</h1>
   
       <div className={css.formGroup}>
         <label htmlFor="email">Email</label>
         <input id="email" type="email" name="email" className={css.input} required />
       </div>
   
       <div className={css.formGroup}>
         <label htmlFor="password">Password</label>
         <input id="password" type="password" name="password" className={css.input} required />
       </div>
   
       <div className={css.actions}>
         <button type="submit" className={css.submitButton}>
           Log in
         </button>
       </div>
   
       <p className={css.error}>{error}</p>
     </form>
   </main>
   
  );
};

export default SignIn;