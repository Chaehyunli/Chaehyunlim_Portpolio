import type { Profile } from "./types";

export const profile: Profile = {
  photo: "/images/profile/portrait.jpg",
  name: "임채현",
  title: "Backend Developer",
  oneLiner: "AI를 어디까지 쓸지 판단하는 개발자",
  focus: ["LLM·알고리즘 경계 설계", "인증·신뢰 경계 설계", "검색·파이프라인 최적화"],
  about: [
    "문제를 먼저 정의하고, LLM에 맡길 부분과 코드로 확정할 부분의 경계를 나눈 뒤 구현한다.",
    "판단마다 기각한 대안과 트레이드오프를 기록으로 남기고, 성능·프롬프트 변경은 골든셋·회귀 fixture로 검증한다.",
    "팀 작업에서는 트러블슈팅과 응답 계약을 먼저 문서로 고정해, 서로의 구현을 기다리지 않고 병렬로 진행하고 필요하면 이어받을 수 있게 한다.",
    "다음으로는 백엔드 파이프라인에 AI Agent를 붙이는 작업 — 요청 분류·구간별 검증·호출량 제어까지 포함한 설계 — 를 더 깊게 다루고 싶다.",
  ],
  skills: [
    { category: "Languages", items: ["Java", "Python", "TypeScript", "SQL"] },
    {
      category: "Backend",
      items: [
        "Spring Boot",
        "Spring Security",
        "Spring WebFlux / R2DBC",
        "FastAPI",
        "JPA / SQLModel",
        "WebSocket·STOMP",
        "SSE",
      ],
    },
    {
      category: "Data · Search",
      items: ["PostgreSQL", "MySQL", "Redis", "Elasticsearch / OpenSearch", "pgvector", "Alembic / Flyway"],
    },
    {
      category: "AI 파이프라인",
      items: ["PydanticAI", "DeepEval 골든셋·회귀 fixture", "RAG", "KeyBERT", "XGBoost"],
    },
    { category: "Infra", items: ["Docker Compose", "Vercel", "Render", "Git"] },
  ],
  email: "chaehyun010104@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/Chaehyunli" },
    { label: "기술 블로그", href: "https://ch010104.tistory.com/" },
  ],
  education: [
    { period: "2021.03 ~ 2026.08", desc: "명지대학교 컴퓨터공학부 컴퓨터공학과 졸업" },
  ],
  training: [
    { period: "2025.07 ~ 2025.08", desc: "SK AI Dream Camp 중급" },
    {
      period: "2026 ~ 현재",
      desc: "SKALA 4기 — Agile/Scrum·MSA 팀 실습(SM), 응답 계약 기반 병렬 개발",
    },
  ],
  certifications: ["정보처리기사", "SQLD"],
};
