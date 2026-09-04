"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden rounded-pill bg-blue px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
    >
      PDF로 저장 / 인쇄
    </button>
  );
}
