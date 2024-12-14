"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import CustomSignInButton from "./sign-in-button";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="fixed top-0 right-0 p-4 z-50">
            <div className="flex items-center space-x-4">
                <SignedOut>
                    <CustomSignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton 
                        appearance={{
                            elements: {
                                avatarBox: "w-14 h-14",
                                userButtonAvatarBox: "w-14 h-14",
                                userButtonTrigger: "focus:shadow-none focus:outline-none"
                            }
                        }}
                    />
                </SignedIn>
            </div>
        </div>
    );
}