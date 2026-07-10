'use client';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginSchema, LoginFormValues } from '@/lib/validations';
import { login } from '@/features/auth/authSlice';
import { setAuthCookie } from '@/lib/auth-cookies';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginFormValues) {
    dispatch(login({ email: data.email }));
    setAuthCookie();
    router.push('/');
  }

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Task Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <Input {...register('email')} placeholder="Email" type="email" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Input {...register('password')} placeholder="Password" type="password" />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
}
