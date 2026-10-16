"use client";

import { useEffect, useRef, useState } from "react";
import { FileCheck2, FileText, Play, Upload, X } from "lucide-react";

interface UploadCardProps {
  title: string;
  description: string;
  accept?: string;
  onFileSelect?: (file: File | null) => void;
  className?: string;
  maxSizeMB?: number;
}

export default function UploadCard({
  title,
  description,
  accept = "image/*,.pdf",
  onFileSelect,
  className = "",
  maxSizeMB = 10,
}: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!file?.type.startsWith("image/")) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    if (selected.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB} MB.`);
      e.target.value = "";
      return;
    }

    setError("");
    setFile(selected);
    onFileSelect?.(selected);
  };

  const removeFile = () => {
    setFile(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onFileSelect?.(null);
  };

  const isImage = file?.type.startsWith("image/");
  const isVideo = file?.type.startsWith("video/");
  const isPdf = file?.type === "application/pdf";

  return (
    <div
      className={`rounded-[28px] border border-dashed border-black/15 bg-[#F8F8F5] p-5 transition hover:border-black/30 ${className}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      <div className="flex items-start gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black text-[#C8FF00] ring-2 ring-black/5">
          {isImage && preview ? (
            <img
              src={preview}
              alt={`${title} preview`}
              className="h-full w-full rounded-full object-cover"
            />
          ) : isVideo ? (
            <Play size={25} fill="currentColor" />
          ) : isPdf ? (
            <FileText size={25} />
          ) : (
            <FileCheck2 size={25} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-black">{title}</p>

          <p className="mt-1 break-words text-xs leading-5 text-black/45">
            {file ? file.name : description}
          </p>

          {file && (
            <p className="mt-1 text-[11px] text-green-700">
              Selected · {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          )}

          {error && <p className="mt-2 text-xs text-red-600">{error}</p>}

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-bold text-white transition hover:bg-black/80"
            >
              <Upload size={13} />
              {file ? "Change File" : "Upload"}
            </button>

            {file && (
              <button
                type="button"
                onClick={removeFile}
                className="inline-flex items-center gap-1 rounded-full border border-black/10 px-3 py-2 text-xs font-bold text-black/60 hover:bg-black/5"
              >
                <X size={13} />
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
