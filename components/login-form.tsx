'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import loginIllustration from '@/public/assets/loginillustartion.jpg';
import Image from 'next/image';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/providers/AuthProvider';

const loginScema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[a-zA-Z]/, { message: 'Password must include at least one letter' })
    .regex(/[0-9]/, { message: 'Password must include at least one number' }),
});

type LoginFormInputs = z.infer<typeof loginScema>;

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { loginLoading, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginScema),
  });

  const onSubmit = (value: LoginFormInputs) => {
    login(value);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">Login to your Acme Inc account</p>
              </div>
              <div className="grid gap-3">
                <Input
                  label={'Email'}
                  id="email"
                  type="email"
                  placeholder="Enter Your Email"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </div>
              <div className="grid gap-3">
                <Input
                  label={'Password'}
                  {...register('password')}
                  id="password"
                  type="password"
                  error={errors.password?.message}
                />
              </div>
              <Button type="submit" className="w-full">
                {loginLoading ? 'Logging in...' : 'Login'}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <a href="#" className="underline underline-offset-4">
                  Contact Us
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={loginIllustration}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
