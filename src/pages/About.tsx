import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShoppingBag, Mail, Lock, CheckCircle2 } from "lucide-react";

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-fadeIn">
                {/* Header */}
                <div className="text-center mb-10">
                    <div
                        className="flex items-center justify-center gap-2 mb-2 cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => navigate("/")}
                    >
                        <ShoppingBag className="w-9 h-9 text-primary" />
                        <span className="text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">
              SwapSC
            </span>
                    </div>
                    <p className="text-muted-foreground tracking-wide">USC Student Marketplace</p>
                </div>

                {/* Card */}
                <Card className="border-2 shadow-2xl rounded-2xl backdrop-blur-sm">
                    <CardHeader className="space-y-2 pb-2">
                        <CardTitle className="text-3xl font-bold text-center tracking-tight">
                            More About Us
                        </CardTitle>
                        <CardDescription className="text-center text-base">
                            Our business story
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="space-y-5 leading-relaxed text-[15px]">
                            <p>
                                SwapSC was born from the energy and transitions of USC campus life — the move-ins that deplete
                                Target's inventory, the move-outs where perfectly good items
                                sit abandoned in dorm trash bins, and the constant shuffle of students
                                entering new chapters. Four USC students looked at this swirl of energy (and waste)
                                and wondered: what if there were a hub that turned this chaos into connection?
                            </p>

                            <p>
                                We built SwapSC to be that hub — a friendly, reliable marketplace where students can
                                exchange goods within the campus ecosystem without the hassle of long-distance
                                listings, shipping, or meeting strangers off-campus. It's designed to reduce waste,
                                encourage sustainable habits, and make student life just a little smoother. In the
                                coming months, we're dreaming bigger: expanding to other campuses, refining features,
                                and turning this simple idea into a widespread student-to-student network.
                            </p>

                            <p>
                                Have feedback, ideas, or cosmic visions for the platform? Send them our way at
                                <span className="font-medium"> swapsc@gmail.com</span>. We’d truly love to hear.
                            </p>

                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors pt-4"
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

export default About;
