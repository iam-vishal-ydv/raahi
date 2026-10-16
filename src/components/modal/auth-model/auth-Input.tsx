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
      <label className="mb-2 block text-xs font-extrabold text-zinc-700">
        {label}
      </label>

      <div className="group relative">
        <div className="absolute left-3.5 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-zinc-400 transition-colors duration-200 group-focus-within:text-black">
          {icon}
        </div>

        <input
          name={name}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50/80 pl-11 text-sm font-medium text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 hover:bg-white focus:border-black focus:bg-white focus:ring-2 focus:ring-[#C8FF00]/40 ${
            isPassword ? "pr-11" : "pr-3.5"
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3.5 top-1/2 flex -translate-y-1/2 items-center justify-center text-zinc-400 transition-colors duration-200 hover:text-black"
          >
            {showPassword ? (
              <EyeOff size={17} strokeWidth={2} />
            ) : (
              <Eye size={17} strokeWidth={2} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
