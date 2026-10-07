import { ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  icon: ReactNode;
  label: string;
  placeholder: string;
  type?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthInput({
  icon,
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-zinc-700">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
          {icon}
        </div>

        <input
          name={name}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-10 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-10 text-sm outline-none transition placeholder:text-zinc-400 focus:border-[#6D28D9] focus:bg-white focus:ring-2 focus:ring-violet-100 ${
            isPassword ? "pr-10" : "pr-3"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>
    </div>
  );
}
