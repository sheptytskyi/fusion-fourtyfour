"use client";
import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export const Terminal = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm p-4 md:p-6 font-mono text-sm md:text-base text-neutral-100 shadow-2xl",
        className
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

export const TypingAnimation = ({
  children,
  delay = 0,
  duration = 100,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Extract text from children
    const getTextFromChildren = (node: React.ReactNode): string => {
      if (typeof node === "string") return node;
      if (typeof node === "number") return String(node);
      if (Array.isArray(node)) {
        return node.map(getTextFromChildren).join("");
      }
      if (React.isValidElement(node) && node.props.children) {
        return getTextFromChildren(node.props.children);
      }
      return "";
    };

    const text = getTextFromChildren(children);
    if (!text) {
      // If no text found, just render children as-is
      hasStartedRef.current = true;
      setShowCursor(false);
      return;
    }

    const startDelay = setTimeout(() => {
      hasStartedRef.current = true;
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => setShowCursor(false), 500);
        }
      }, duration);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [children, delay, duration]);

  // If children is not a string, render it directly
  if (typeof children !== "string") {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component className={className}>
      {displayedText}
      {showCursor && hasStartedRef.current && (
        <span className="animate-pulse">|</span>
      )}
    </Component>
  );
};

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={cn(
        "block transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {children}
    </span>
  );
};
