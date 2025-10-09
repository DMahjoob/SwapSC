import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingBag, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5371687786277747";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    }, []);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  type FormErrors = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
 };
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateUSCEmail = (email) => {
    return email.toLowerCase().endsWith('@usc.edu');
  };

  const handleLogin = () => {
    setErrors({});
    setSuccess('');

    const newErrors = {
      email: undefined,
      password: undefined
    };
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateUSCEmail(formData.email)) {
      newErrors.email = 'Must be a valid @usc.edu email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // TODO: Replace with your API call
    setTimeout(() => {
      setLoading(false);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2 cursor-pointer" onClick={() => navigate('/')}>
            <ShoppingBag className="w-8 h-8 text-primary" />
            <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SwapSC
            </span>
          </div>
          <p className="text-muted-foreground">USC Student Marketplace</p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your SwapSC account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {success && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">USC Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="trojan@usc.edu"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="pl-10"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between text-sm">
                <button type="button" className="text-primary hover:underline">
                  Forgot password?
                </button>
              </div>

              <Button onClick={() => navigate("/home")} className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="text-center text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </div>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back to home
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;