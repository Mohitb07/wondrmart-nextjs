"use client";

import React, { useRef, useEffect, useCallback, useId } from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  isDisabled?: boolean;
  isInvalid?: boolean;
  autoFocus?: boolean;
  onComplete?: (value: string) => void;
}

export default function OtpInput({
  value,
  onChange,
  length = 6,
  isDisabled = false,
  isInvalid = false,
  autoFocus = true,
  onComplete,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const idPrefix = useId();

  // Split the value string into array of single characters
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  // Auto focus first empty input or the first input on mount
  useEffect(() => {
    if (autoFocus && !isDisabled) {
      const firstEmptyIdx = digits.findIndex((d) => !d);
      const targetIdx = firstEmptyIdx === -1 ? 0 : firstEmptyIdx;
      inputRefs.current[targetIdx]?.focus();
    }
  }, []);

  const triggerChange = useCallback(
    (newDigits: string[]) => {
      const combined = newDigits.join("");
      onChange(combined);
      if (combined.length === length && onComplete) {
        onComplete(combined);
      }
    },
    [length, onChange, onComplete],
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const rawVal = e.target.value;
    // Extract only digits from the input
    const cleanDigits = rawVal.replace(/\D/g, "");

    if (!cleanDigits) {
      const newDigits = [...digits];
      newDigits[index] = "";
      triggerChange(newDigits);
      return;
    }

    if (cleanDigits.length === 1) {
      const newDigits = [...digits];
      newDigits[index] = cleanDigits;
      triggerChange(newDigits);

      // Auto-advance to next input
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        inputRefs.current[index + 1]?.select();
      }
    } else {
      // Multiple characters typed / autofilled
      const chars = cleanDigits.slice(0, length).split("");
      const newDigits = [...digits];
      for (let i = 0; i < length; i++) {
        if (i < chars.length) {
          newDigits[i] = chars[i];
        }
      }
      triggerChange(newDigits);
      const nextIndex = Math.min(chars.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // If current slot is empty, move back and clear previous slot
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        triggerChange(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        triggerChange(newDigits);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
      inputRefs.current[index - 1]?.select();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const cleanNumbers = pastedText.replace(/\D/g, "").slice(0, length);

    if (cleanNumbers) {
      const newDigits = Array.from({ length }, (_, i) => cleanNumbers[i] || "");
      triggerChange(newDigits);

      const focusIdx = Math.min(cleanNumbers.length, length - 1);
      inputRefs.current[focusIdx]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.select();
  };

  return (
    <div
      role="group"
      aria-label="6-digit verification code"
      className="flex items-center justify-center gap-2 sm:gap-3 my-4"
    >
      {Array.from({ length }).map((_, index) => {
        const isFilled = Boolean(digits[index]);
        const inputId = `${idPrefix}-otp-${index}`;

        return (
          <input
            key={index}
            id={inputId}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${index + 1} of ${length}`}
            disabled={isDisabled}
            value={digits[index]}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(index)}
            className={`
              w-11 h-14 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-xl
              border-2 outline-none transition-colors
              bg-transparent text-foreground
              ${
                isInvalid
                  ? "border-danger text-danger focus:border-danger"
                  : isFilled
                    ? "border-default-400 text-foreground focus:border-[#BEF264]"
                    : "border-default-200 hover:border-default-400 focus:border-[#BEF264]"
              }
              ${
                isDisabled ? "opacity-50 cursor-not-allowed bg-default-100" : ""
              }
            `}
          />
        );
      })}
    </div>
  );
}
