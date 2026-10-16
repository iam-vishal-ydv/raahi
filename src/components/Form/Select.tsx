"use client";

interface SelectProps {
  label: string;
  name: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
}

export default function Select({
  label,
  name,
  options,
  value = "",
  onChange,
}: SelectProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-bold">
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-black/10 bg-[#F8F8F5] px-4 text-sm outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-[#C8FF00]/40"
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
