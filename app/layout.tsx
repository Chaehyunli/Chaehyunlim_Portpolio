import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "임채현 — Backend Developer",
  description: "문제를 정확하게 정의하고, 설계로 풀어내는 백엔드 개발자 포트폴리오",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
