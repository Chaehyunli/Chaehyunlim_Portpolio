import type { Profile } from "./types";

export const profile: Profile = {
  photo: "/images/profile/portrait.jpg",
  name: "임채현",
  title: "Backend Developer",
  oneLiner: "AI를 어디까지 쓸지 판단하는 개발자",
  email: "chaehyun010104@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/Chaehyunli" },
    { label: "기술 블로그", href: "https://ch010104.tistory.com/" },
  ],
  education: [
    { period: "2021.03 ~ 2026.08", desc: "명지대학교 컴퓨터공학부 컴퓨터공학과 졸업" },
  ],
  experience: [
    { period: "2026.01 ~ 2026.02", desc: "프람트테크놀로지 · 개발팀 인턴" },
  ],
  projects: [
    { period: "2026.08 ~", desc: "모두약속 · AI 약속 일정 서비스" },
    { period: "2026.03 ~ 2026.08", desc: "Masil · AI 여행 에이전트 (Capstone 은상)" },
    { period: "2025.10 ~ 2025.12", desc: "Searchive · RAG 지식 베이스" },
    { period: "2025.08 ~ 2025.10", desc: "PETNER · 유기견 플랫폼 (VIBE CODING 장려상)" },
    { period: "2025.03 ~ 2025.10", desc: "노소공 · ML 육성 게임" },
    { period: "2025.01 ~ 2025.03", desc: "동아리모아 · 동아리 플랫폼" },
  ],
  training: [
    { period: "2025.07 ~ 2025.08", desc: "SK AI Dream Camp 중급" },
    { period: "2026 ~ 현재", desc: "SKALA 4기 이수 중" },
  ],
  certifications: ["정보처리기사", "SQLD"],
};
