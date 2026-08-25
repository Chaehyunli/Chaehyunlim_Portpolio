export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-pill bg-blue-bg px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] font-semibold text-blue">
      {children}
    </span>
  );
}
