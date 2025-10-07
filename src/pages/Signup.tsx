import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingBag, Mail, Lock, User, CheckCircle2 } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  type FormErrors = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
  };

  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
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

  const handleSignup = () => {
    setErrors({});
    setSuccess('');

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateUSCEmail(formData.email)) {
      newErrors.email = 'Must be a valid @usc.edu email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // TODO: Replace with your API call
    setTimeout(() => {
      setLoading(false);
      setSuccess('Account created successfully! Redirecting...');
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
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Join the USC student marketplace
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
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Trojan"
                    className="pl-10"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

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
                <p className="text-xs text-muted-foreground">
                  Must be a valid @usc.edu email address
                </p>
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
                <p className="text-xs text-muted-foreground">At least 8 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>

              <Button onClick={handleSignup} className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
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

export default Signup;