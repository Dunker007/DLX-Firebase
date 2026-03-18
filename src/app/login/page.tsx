'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useAuth, useUser } from '@/firebase';
import { initiateAnonymousSignIn, initiateEmailSignIn, initiateGoogleSignIn } from '@/firebase/non-blocking-login';

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user && !isUserLoading) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !auth) return;
    setIsSigningIn(true);
    setErrorMsg(null);
    try {
      await initiateEmailSignIn(auth, email, password);
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed.');
      setIsSigningIn(false);
    }
  };

  const handleAnonymousLogin = async () => {
    if(!auth) return;
    setIsSigningIn(true);
    setErrorMsg(null);
    try {
      await initiateAnonymousSignIn(auth);
    } catch (err: any) {
      setErrorMsg(err.message || 'Anonymous login failed.');
      setIsSigningIn(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    if(!auth) return;
    setIsSigningIn(true);
    setErrorMsg(null);
    try {
      await initiateGoogleSignIn(auth);
    } catch (err: any) {
      // We specifically ignore the "popup-closed-by-user" error because 
      // the user might just have changed their mind, but we need to reset the loading state.
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setErrorMsg(err.message || 'Google login failed.');
      }
      setIsSigningIn(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1),transparent_50%)] p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center neon-glow">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-headline text-4xl font-black tracking-tighter uppercase">DLX AI Studios</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-[10px]">Neural Authorization Portal</p>
        </div>

        <Card className="border-white/5 bg-[#0a0a0c]/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
          <CardHeader className="space-y-1 pb-8">
            <CardTitle className="text-xl font-bold uppercase tracking-tight">Identity Sync</CardTitle>
            <CardDescription className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">Enter credentials to establish neural link</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-black/40 border-white/5 rounded-xl focus-visible:ring-primary text-xs font-bold"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Encryption Key"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-black/40 border-white/5 rounded-xl focus-visible:ring-primary text-xs font-bold"
                />
              </div>
              
              {errorMsg && (
                <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                  {errorMsg}
                </div>
              )}

              <Button type="submit" disabled={isSigningIn} className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl font-black uppercase tracking-widest text-xs">
                {isSigningIn ? <Loader2 className="w-4 h-4 animate-spin" /> : "Initiate Link"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center text-[8px] font-black uppercase tracking-widest">
                <span className="bg-[#0a0a0c] px-4 text-muted-foreground/40">Alternative Traces</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleGoogleLogin} disabled={isSigningIn} variant="outline" className="h-12 border-white/5 bg-white/5 rounded-xl text-[10px] font-black uppercase hover:bg-white/10">
                <Bot className="w-4 h-4 mr-2" /> Google
              </Button>
              <Button onClick={handleAnonymousLogin} disabled={isSigningIn} variant="outline" className="h-12 border-white/5 bg-white/5 rounded-xl text-[10px] font-black uppercase hover:bg-white/10">
                Anonymous
              </Button>
            </div>
          </CardContent>
          <CardFooter className="bg-white/5 p-6 text-center">
            <p className="text-[9px] text-muted-foreground/60 font-black uppercase tracking-widest mx-auto leading-relaxed">
              By syncing, you agree to the <span className="text-primary cursor-pointer hover:underline">DLX Studio Terms</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
