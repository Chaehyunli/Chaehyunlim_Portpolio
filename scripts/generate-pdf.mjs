// 포트폴리오 전체를 PDF로 뽑는다 → public/portfolio.pdf
//
//   npm run pdf
//
// 프로덕션 서버(next build && next start)를 임시로 띄우고 /print 를 headless Chrome으로
// 렌더해 인쇄한다. 콘텐츠를 크게 바꿨을 때 다시 돌리고 public/portfolio.pdf 를 커밋한다.

import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import puppeteer from "puppeteer";

const PORT = 4399;
const URL = `http://localhost:${PORT}/print`;
const OUT = path.resolve("public/portfolio.pdf");

async function waitForServer(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* 아직 안 뜸 */
    }
    await sleep(500);
  }
  throw new Error(`서버가 ${url} 에서 응답하지 않음`);
}

const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  stdio: "ignore",
  env: process.env,
});

try {
  await waitForServer(URL);

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle0" });

  await mkdir(path.dirname(OUT), { recursive: true });
  await page.pdf({
    path: OUT,
    format: "A4",
    margin: { top: "12mm", bottom: "12mm", left: "12mm", right: "12mm" },
    printBackground: true,
  });

  await browser.close();
  console.log(`✓ ${path.relative(process.cwd(), OUT)} 생성 완료`);
} finally {
  server.kill();
}
