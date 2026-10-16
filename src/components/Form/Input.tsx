"use client";

interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange: (value: string) => void;
}

export default function Input({
  label,
  name,
  placeholder,
  type = "text",
  value = "",
  onChange,
}: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-bold">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-black/10 bg-[#F8F8F5] px-4 text-sm outline-none transition placeholder:text-black/30 focus:border-black focus:bg-white focus:ring-2 focus:ring-[#C8FF00]/40"
      />
    </div>
  );
}
