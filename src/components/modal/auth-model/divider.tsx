export default function Divider() {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-zinc-200" />

      <span className="text-xs font-medium text-zinc-400">OR</span>

      <div className="h-px flex-1 bg-zinc-200" />
    </div>
  );
}
