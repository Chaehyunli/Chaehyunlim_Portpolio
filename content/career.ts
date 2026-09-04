import type { CareerEntry } from "./types";

/** 경력(인턴). 홈 About 아래 전체 폭 카드 1장으로 렌더한다 — 별도 상세 페이지 없음. */
export const career: CareerEntry[] = [
  {
    period: "2026.01 ~ 2026.02",
    org: "프람트테크놀로지",
    role: "개발팀 인턴 — 레거시 → MSA 전환 품질 검증",
    context:
      "약 20만 LOC 전략물자 관리 시스템을 4개 서버 모듈(portal·permission·judgement·destination) MSA 구조로 전환하는 프로젝트에서, 레거시 동작을 검증 기준으로 복원하는 일을 맡았다.",
    contributions: [
      "문서화되지 않은 레거시 화면·조건 분기·산출물을 역추적해 상태별 테스트 기준을 세우고, 신청 시나리오와 상태 전이를 분리해 약 8,000개 단위·통합 테스트 케이스를 설계·수행했다.",
      "결함을 현상이 아니라 레거시와의 차이·재현 절차·발생 모듈 관점으로 정리해 전달했고, 필수 첨부 조건으로 막힌 로컬 제출 테스트는 업로드 경로를 조정해 검증 공백을 해소했다.",
      "\"상세 화면에서 목록으로 돌아가도 검색 조건 유지\" 요구를 받아, 각 MSA 모듈이 검색 필터를 query 파라미터와 response body에 혼용하는 것을 발견하고 query 파라미터로 통일하는 방안을 개발팀에 제안했다.",
    ],
    stack: ["Spring Boot", "Thymeleaf", "MSA"],
  },
];
