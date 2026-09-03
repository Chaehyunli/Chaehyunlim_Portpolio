# 포트폴리오 개선 작업 목록

> 2026-09-03 채용담당자 관점 전체 점검 결과 + 결정사항 정리.
> **아직 작업 안 함.** 이 문서 보고 이어서 수정한다.

## 종합 평가 요약

| 항목 | 현재 | 목표 |
|---|---|---|
| 포지셔닝·차별화 | A | 유지 |
| 프로젝트 깊이(사고 과정) | A | 유지 |
| 검증 가능성(코드·이력서·배포) | C | B |
| 지표 신뢰도·프레이밍 | B− | B+ |
| 사이트 완성도(UX·접근성·SEO) | B− | B+ |

**핵심 방향**: 정직한 톤은 유지하되, 각 프로젝트를 "성과·판단"으로 열고 "한계"로 닫는 순서를 지킨다. 지금은 `result` 줄이 종종 약한 쪽으로 열린다.

---

## 1. 프로젝트 GitHub 링크 정비

캡처한 링크 기준으로 `content/projects.ts`의 `links` 정리.

| 프로젝트 | id | 현재 상태 | 해야 할 일 |
|---|---|---|---|
| 모두약속 | `moduyaksok` | 배포·GitHub·API문서 3개 있음 | 유지 (GitHub `Chaehyunli/moduyaksok`, 배포 `moduyaksok.vercel.app`, API `moduyaksok.onrender.com/docs`) |
| Masil | `masil` | `orgs/Masil2026/repositories` 있음 | 유지 |
| Searchive | `searchive` | `orgs/Searchive-Project/repositories` 있음 | 유지 |
| PETNER | `petner` | `orgs/Dangdaengdan/repositories` 있음 | 유지 |
| 노소공 | `nosogong` | `links: []` | **추가**: `https://github.com/orgs/no-so-gong/repositories` |
| 동아리모아 | `dongari-moa` | `links: []` | **추가**: `https://github.com/Chaehyunli/TeamProject2025` |

- [ ] 노소공 `links` 추가
- [ ] 동아리모아 `links` 추가 (label은 "GitHub", 단일 repo이므로 org 표기 불필요)
- [ ] 나머지 4개 링크 실제 접근 확인 (org `repositories` 페이지가 private이면 채용담당자에겐 빈 화면)

### 남은 리스크 (선택 개선)
org `repositories` 링크는 비공개 시 검증 불가. 팀 프로젝트일수록 "내가 뭘 했는지"를 코드로 못 본다.
- 옵션 A: 담당 부분 public 미러 repo 생성
- 옵션 B: 각 상세 페이지 사이드바/본문에 "담당 커밋 범위: …" 한 줄 명시
- 옵션 C: 그대로 두고 `scope` 필드 서술을 더 구체화 (파일/모듈 단위)

---

## 2. 문구 재작성 (`result` 필드)

약한 숫자(초기 지연 16초 · n=5 · R² 0.99)를 마무리 줄 맨 앞에 두지 않는다. 판단·설계를 앞세우고 숫자는 맥락 안으로.

### 2-1. 모두약속 `result`

**현재**
```
공개 배포 · 본인·지인 사용 중(사용량 분석 미도입) · 초기 생성 지연 p50 16초 / p95 ~20초(로컬 5회) · https://moduyaksok.vercel.app
```

**수정안 (초안 — 다듬어서 적용)**
```
공개 배포 후 본인·지인이 사용 중. 일정 1건이 네이버 지역검색 21회로 팬아웃되는 구조라 초기 생성은 로컬 5회 기준 p50 16초 / p95 ~20초이며, Step 4를 사용자 선택 이후로 미뤄 호출 비용을 줄였다. 후보는 실제 검색 결과 안에서만 구성한다. https://moduyaksok.vercel.app
```

- [ ] 지연을 "느린 앱"이 아니라 "설계상 감수한 비용"으로 프레이밍
- [ ] `n=5` 표기는 유지(정직), 다만 숫자가 헤드라인이 되지 않게
- [ ] "사용량 분석 미도입" → 5번 항목에서 Vercel Analytics 붙이면 이 문구 삭제

### 2-2. 노소공 `result`

**현재**
```
합성 데이터 테스트셋 R² 0.9964 · RMSE 0.22(실사용 일반화 성능 아님) · 2025.03 ~ 2025.10 완성
```

**수정안 (초안)**
```
Cold Start를 규칙 기반 합성 데이터로 풀어 감정 예측 모델과 후속 게임 흐름을 함께 검증했다. 정의한 행동 규칙을 모델이 재현하는지 본 수치는 합성 테스트셋 R² 0.9964 / RMSE 0.22이며, 실사용 일반화 성능은 아니다. 2025.03 ~ 2025.10 완성
```

- [ ] "R² 0.9964"를 헤드라인에서 빼고 판단(Cold Start 해결법)을 앞세운다
- [ ] 순환 검증(규칙→합성데이터→모델이 규칙 재현)이라는 점이 캐비어트로 살아있는지 확인 — 현재 decision `outcome`엔 이미 있음, `result`에도 반영

### 2-3. (확인) 각 프로젝트 `result`가 "성과로 열고 한계로 닫는" 순서인지 전체 재검토
- [ ] Masil / Searchive / PETNER / 동아리모아 `result`도 같은 기준으로 훑기

---

## 3. About 섹션 추가 + 인턴 항목

### 3-1. About (일하는 방식 / 다음 관심사)

- 넣을 내용: **어떻게 일하는지**, **다음에 뭘 하고 싶은지**
- 관심사 = "백엔드에 AI를 같이 붙이는 것". **"왜 백엔드인지"는 안 씀** (불필요)
- 배치 아이디어:
  - 옵션 A: `HeroCard`의 `oneLiner` 아래에 2~3문장 문단 추가 (가장 가벼움)
  - 옵션 B: 홈 Hero ↔ Timeline 사이에 별도 "About" 카드 1장
  - 옵션 C: `content/profile.ts`에 `about: string[]` 필드 추가하고 카드로 렌더 (데이터/뷰 분리, 기존 패턴과 일관)
- 추천: **옵션 C** — `profile.about` 불릿 2~3개. "일하는 방식" 1~2개 + "AI를 어디에 붙이고 싶은지" 1개.
- [ ] `Profile` 타입에 `about` 추가
- [ ] `profile.ts` 내용 작성
- [ ] 홈에 렌더 (Hero 카드 안 or 독립 카드)

### 3-2. 인턴 항목 (프람트테크놀로지, 2026.01~02, 2개월)

현재: `experience: [{ period, desc: "프람트테크놀로지 · 개발팀 인턴" }]` — 설명 0. 채용담당자가 "2개월 동안 뭐 했지?" 궁금해함.

**아이디어만 (결정은 나중)**:
- 아이디어 1 — **한 줄 임팩트**: `desc`를 "프람트테크놀로지 · 개발팀 인턴 — {무엇을 만졌고 / 무엇을 개선·배포했는지} 한 문장". `TimelineCard`가 `desc` 한 줄만 렌더하므로 코드 수정 0, 가장 저비용.
- 아이디어 2 — **가벼운 경력 카드 블록**: `TimelineCard`에서 "경력"만 분리해 별도 카드로. 역할·기간 + 핵심 기여 2~3불릿 + 사용 스택 태그. 프로젝트 카드와 톤 통일. 2개월이어도 "무엇을 만졌나" 2불릿이면 충분.
- 아이디어 3 — **프로젝트 상세처럼**: 인턴을 상세 페이지급으로. → 2개월이라 과할 수 있고 NDA/공개 범위 확인 필요. 비추.
- 현재 기운 방향: **아이디어 2** (가벼운 경력 카드). 상세 페이지까지는 오버.
- [ ] 인턴 기간 실제 기여 내용 메모 (공개 가능 범위 확인)
- [ ] 카드 블록 vs 한 줄 결정

---

## 4. `profile.projects` + 아이콘 정리

### 4-1. `profile.projects` (미사용 중복 데이터)

`content/profile.ts`에 6개 프로젝트가 `{period, desc}`로 정의돼 있으나 **어디에도 렌더 안 됨** (`TimelineCard`는 학력·경력·교육·자격만). 프로젝트 정보는 `content/projects.ts` 카드가 다 보여줌.

- 옵션 A: 삭제 → 데이터 소스를 `projects.ts` 하나로 단일화 (가장 깔끔)
- 옵션 B: 홈에 "프로젝트 타임라인" 미니 섹션으로 렌더 (연도별 흐름 한눈에, 카드 그리드 위/아래)
- 옵션 C: `TimelineCard`에 "프로젝트" 그룹 추가 (학력·경력·교육·프로젝트·자격)
- 추천: **옵션 A 삭제** + 필요하면 `ProjectCard` 또는 그리드 헤더에 기간 노출 강화. 카드 `meta`에 이미 기간 있음.
- [ ] `profile.ts`에서 `projects` 필드 + `Profile` 타입에서 제거 (옵션 A 선택 시)
- [ ] `TimelineCard`가 `profile.projects` 참조 안 하는 것 재확인 (현재 안 함)

### 4-2. 아이콘 중복

현재: 🤝 모두약속 / 🧭 Masil / 🔎 Searchive / 🐾 PETNER / 📎 노소공 / 📎 동아리모아 → **📎 두 번**

- [ ] 노소공 아이콘 변경: 🎮 (ML 육성 게임) 추천. 🐾는 PETNER가 이미 사용 중이라 불가
- [ ] 동아리모아는 📎 유지 or 🎓/👥 중 택1
- 6개 전부 서로 다른 이모지가 되도록만 맞추면 됨

### 4-3. 노소공 이미지 부족 (`cardImage` == `introScreen` 동일 파일)

원인: 캡처한 화면이 적어 `screen-game-home.png`를 카드 썸네일·개요 첫 이미지에 중복 사용.

- 해결: `public/images/projects/nosogong/`에 이미 **`screen-activity-selection.png`** 있음.
  - `cardImage` → `screen-activity-selection.png` (활동 선택)
  - `introScreen` → `screen-game-home.png` (게임 홈) 유지
  - → 추가 캡처 없이 중복 해소
- [ ] `nosogong` `cardImage` src 교체
- [ ] 그래도 상세가 허전하면 화면 1~2장 추가 캡처 (`screens[]` 또는 `showcaseScreen`)

---

## 5. 사이트 자체 (UX · 접근성 · SEO · 배포)

### 5-1. 접근성 (실제 결함)

`app/globals.css` `@theme`:
- `--color-sub` (#8b95a1): 흰 배경 대비 **약 3:1** → WCAG AA(4.5:1) 미달. one-liner·캡션·타임라인 설명 다수가 이 색
- `--color-muted` (#b0b8c1): **약 2:1** → 전부 미달. 푸터·캡션·기간 라벨
- [ ] `--color-sub` → #6b7685 정도로 한 단계 진하게
- [ ] `--color-muted` → #8b95a1 정도로 한 단계 진하게 (톤 유지, 대비만 확보)
- [ ] 색 토큰 바꾸면 전 페이지 시각 확인 (특히 캡션·Divider)
- [ ] 다이어그램 `<img alt>` — 현재 "파이프라인 다이어그램 1" → 내용 기술형으로 ("모두약속 일정 생성 파이프라인: 네이버 검색 → 관점 3개 병렬 생성 → …")

### 5-2. SEO / 링크 공유

`app/layout.tsx` `metadata` — 현재 `title` + `description`만.
- [ ] `metadataBase` + `openGraph`(title/description/url/siteName/images) 추가
- [ ] `twitter` 카드 메타 추가
- [ ] OG 이미지 1장 제작 (1200×630, 이름 + "Backend Developer" + 한 줄 소개) → `public/`에 두고 참조
- [ ] favicon 커스텀 (현재 Next.js 기본 `app/favicon.ico`)
- [ ] (선택) JSON-LD `Person` 스크립트

### 5-3. 배포

- [ ] 모두약속 API 문서(`moduyaksok.onrender.com/docs`) — Render 무료 티어 콜드스타트 ~30~50초. 대응:
  - cron-job.org 등으로 5분 간격 ping (keep-alive), **또는**
  - 링크 라벨에 "(첫 요청 시 콜드스타트 ~30초)" 주석
- [ ] Vercel Analytics 추가 → 모두약속 `result`의 "사용량 분석 미도입" 문구 삭제 가능 (2번 항목과 연결)

### 5-4. 모바일

- [ ] `ProjectDetail` 상세 페이지: `md` 미만에서 사이드바(기간·역할·스택·링크)가 본문 위에 풀폭으로 쌓여 실제 콘텐츠("배경/왜 만들었나")가 한참 밀림
  - 사이드바를 모바일에서 `<details>`로 접거나
  - 핵심 메타(기간·역할)만 상단 압축 + 스택·링크는 본문 뒤로
  - 읽기 순서 재확인

---

## 우선순위

| 순위 | 작업 | 항목 | 비용 | 효과 |
|---|---|---|---|---|
| 1 | 노소공·동아리모아 GitHub 링크 추가 + 이력서 PDF 링크 | 1 | 소 | 검증 가능성 C→B |
| 2 | 모두약속·노소공 `result` 재작성 (전체 `result` 재검토) | 2 | 소 | 첫인상 방어 |
| 3 | `--color-sub` / `--color-muted` 대비 상향 | 5-1 | 소 | 접근성 결함 제거 |
| 4 | OG 태그 + OG 이미지 + favicon | 5-2 | 소 | 링크 공유 카드 |
| 5 | About 섹션(`profile.about`) + 인턴 항목 | 3 | 중 | 서사 공백 |
| 6 | Vercel Analytics + Render keep-alive | 5-3 | 소 | 캐비어트 정리 |
| 7 | `profile.projects` 삭제, 아이콘 중복 해소, 노소공 cardImage 분리 | 4 | 소 | 디테일 |
| 8 | 모바일 상세 페이지 사이드바 순서 | 5-4 | 중 | 모바일 가독성 |

## 미결정 (정하고 진행)

- [ ] 이력서 PDF: 제작 후 어디에 링크? (Hero 카드 버튼 / 사이드바)
- [ ] 인턴: 한 줄 vs 경력 카드 블록 (현재 경력 카드 쪽으로 기움)
- [ ] `profile.projects`: 삭제(추천) vs 타임라인 렌더
- [ ] 동아리모아 아이콘: 📎 유지 vs 교체
- [ ] 팀 프로젝트 코드 검증: 미러 repo vs 커밋 범위 명시 vs `scope` 서술 강화
