import type { StatusColor } from "@/content/types";

const COLOR_MAP: Record<StatusColor, string> = {
  blue: "bg-blue-bg text-blue",
  green: "bg-green-bg text-green",
  purple: "bg-purple-bg text-purple",
  orange: "bg-orange-bg text-orange",
  gray: "bg-gray-bg text-gray",
};

export function Chip({ children, color = "gray" }: { children: string; color?: StatusColor }) {
  return (
    <span
      className={`inline-flex items-center rounded-pill px-2.5 py-1 text-xs font-bold tracking-wide uppercase ${COLOR_MAP[color]}`}
    >
      {children}
    </span>
  );
}
