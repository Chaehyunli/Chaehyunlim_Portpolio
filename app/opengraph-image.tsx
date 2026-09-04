import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "임채현 — Backend Developer";

const NAME = "임채현";
const TAGLINE = "AI를 어디까지 쓸지 판단하는 개발자";

// satori(next/og)의 기본 폰트는 한글 글리프가 없어 CJK가 빈 네모로 나온다.
// 렌더에 쓰는 글자만 Google Fonts에서 woff로 받아 넘긴다.
async function loadKoreanFont() {
  const chars = Array.from(new Set((NAME + TAGLINE).replace(/\s/g, ""))).join("");
  const cssUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&text=${encodeURIComponent(chars)}`;
  const css = await fetch(cssUrl, {
    headers: { "User-Agent": "Mozilla/5.0" },
  }).then((r) => r.text());
  const fontUrl = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!fontUrl) return null;
  return fetch(fontUrl).then((r) => r.arrayBuffer());
}

export default async function OpengraphImage() {
  const fontData = await loadKoreanFont().catch(() => null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f2f4f6",
          padding: "96px",
          fontFamily: fontData ? "Noto Sans KR, sans-serif" : "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, color: "#3182f6", letterSpacing: 2 }}>
          BACKEND DEVELOPER
        </div>
        <div style={{ fontSize: 108, fontWeight: 800, color: "#191f28", marginTop: 12 }}>
          {NAME}
        </div>
        <div style={{ fontSize: 40, color: "#6b7685", marginTop: 24 }}>{TAGLINE}</div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Noto Sans KR", data: fontData, weight: 700, style: "normal" }]
        : undefined,
    },
  );
}
