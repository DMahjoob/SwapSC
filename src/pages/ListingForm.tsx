// src/pages/ListingForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // if you have it; else use <textarea>
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import {API_URL} from "@/config/api.ts";

const ListingForm = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    title: "",
    price: "",
    condition: "Used",
    location: "",
    imageUrl: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    // Basic validation
    if (!form.title.trim() || !form.price.trim()) {
      alert("Please fill in at least a title and price.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          price: Number(form.price),
          condition: form.condition,
          location: form.location,
          description: form.description,
          imageUrl: form.imageUrl || "",
        }),
      });
      if (!response.ok) throw new Error("Failed to save product!");
      setSuccess("Listing created! Redirecting to home...");
      setForm({
        title: "",
        price: "",
        condition: "Used",
        location: "",
        imageUrl: "",
        description: "",
      });
      setTimeout(() => navigate("/home"), 1200);
    } catch (err) {
      console.error(err);
      alert("Error creating listing!");
    } finally {
      setSaving(false);
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2 cursor-pointer" onClick={() => navigate("/home")}>
            <ShoppingBag className="w-8 h-8 text-primary" />
            <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SwapSC
            </span>
          </div>
          <p className="text-muted-foreground">Create a new listing</p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">New Listing</CardTitle>
            <CardDescription className="text-center">Share your item with fellow Trojans</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {success && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Mini fridge" value={form.title} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input id="price" name="price" placeholder="80" value={form.price} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label>Condition</Label>
                <Select value={form.condition} onValueChange={(v) => setForm({ ...form, condition: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Lightly Used">Lightly Used</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Pickup Location</Label>
                <Input id="location" name="location" placeholder="Leavey Library, Village, etc." value={form.location} onChange={handleChange} />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input id="imageUrl" name="imageUrl" placeholder="https://…" value={form.imageUrl} onChange={handleChange} />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Add details, dimensions, timing…" value={form.description} onChange={handleChange} />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Create Listing"}
              </Button>
              <Button variant="outline" onClick={() => navigate("/home")}>
                Cancel
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Safety tip: Meet in public campus spots. Never share passwords or codes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ListingForm;

