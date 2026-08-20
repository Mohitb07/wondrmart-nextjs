"use client";

import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { convertHtmlToMarkdown } from "@/lib/utils";
import {
  FiBold,
  FiItalic,
  FiList,
  FiEye,
  FiEdit3,
  FiType,
} from "react-icons/fi";

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  isDark?: boolean;
}

export default function MarkdownEditor({
  value,
  onChange,
  isDark = true,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const insertMarkdown = (prefix: string, suffix: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultText;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 0);
  };

  const handleBold = () => insertMarkdown("**", "**", "bold text");
  const handleItalic = () => insertMarkdown("*", "*", "italic text");
  const handleHeading = () => insertMarkdown("\n### ", "", "Heading");
  const handleBulletList = () => insertMarkdown("\n- ", "", "Bullet point");

  return (
    <div
      className={`rounded-lg border overflow-hidden transition-colors ${
        isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-300"
      }`}
    >
      {/* Top Toolbar */}
      <div
        className={`px-3 py-2 border-b flex flex-wrap items-center justify-between gap-2 ${
          isDark ? "bg-neutral-800/80 border-neutral-800" : "bg-neutral-100 border-neutral-200"
        }`}
      >
        {/* Formatting Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleBold}
            title="Bold (**text**)"
            className={`p-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
              isDark ? "hover:bg-neutral-700 text-neutral-300" : "hover:bg-neutral-200 text-neutral-700"
            }`}
          >
            <FiBold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleItalic}
            title="Italic (*text*)"
            className={`p-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
              isDark ? "hover:bg-neutral-700 text-neutral-300" : "hover:bg-neutral-200 text-neutral-700"
            }`}
          >
            <FiItalic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleHeading}
            title="Heading (### Heading)"
            className={`p-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
              isDark ? "hover:bg-neutral-700 text-neutral-300" : "hover:bg-neutral-200 text-neutral-700"
            }`}
          >
            <FiType className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleBulletList}
            title="Bullet List (- item)"
            className={`p-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
              isDark ? "hover:bg-neutral-700 text-amber-400" : "hover:bg-neutral-200 text-amber-600"
            }`}
          >
            <FiList className="w-3.5 h-3.5" /> Bullet List
          </button>
        </div>

        {/* Write / Preview Tab Switcher */}
        <div
          className={`flex rounded p-0.5 border ${
            isDark ? "bg-neutral-900 border-neutral-700" : "bg-neutral-200 border-neutral-300"
          }`}
        >
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            className={`px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1 transition-all ${
              activeTab === "write"
                ? "bg-amber-500 text-black shadow-sm"
                : isDark
                ? "text-neutral-400 hover:text-neutral-200"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <FiEdit3 className="w-3 h-3" /> Write
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1 transition-all ${
              activeTab === "preview"
                ? "bg-amber-500 text-black shadow-sm"
                : isDark
                ? "text-neutral-400 hover:text-neutral-200"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <FiEye className="w-3 h-3" /> Preview
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      {activeTab === "write" ? (
        <textarea
          ref={textareaRef}
          rows={10}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter product description in Markdown...

Example:
- UNIBODY DESIGN: Heat-forged aluminium enclosure
- DURABLE CERAMIC SHIELD: Front & back protection
- 30-hour battery life`}
          className={`w-full p-3.5 text-xs font-mono focus:outline-none resize-y min-h-[200px] ${
            isDark
              ? "bg-neutral-900 text-neutral-100 placeholder-neutral-500"
              : "bg-white text-neutral-900 placeholder-neutral-400"
          }`}
        />
      ) : (
        <div
          className={`p-4 min-h-[200px] max-h-[400px] overflow-y-auto text-xs prose max-w-none ${
            isDark
              ? "bg-neutral-900 text-neutral-200 prose-invert"
              : "bg-neutral-50 text-neutral-800"
          }`}
        >
          {value.trim() ? (
            <ReactMarkdown>{convertHtmlToMarkdown(value)}</ReactMarkdown>
          ) : (
            <p className="text-neutral-500 italic text-xs">Nothing to preview yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
