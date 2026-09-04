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

---

# 실행 계획 (2026-09-04 확정)

**결정 반영**: 이력서 PDF 없음 → 링크/버튼 안 만듦 · `profile.projects` 삭제 · 팀 프로젝트 코드 검증은 `scope` 서술 강화만 · 인턴 내용은 노션 `HERMES/Portfolio/06. 인턴 — 프람트테크놀로지` 기반 · **추가 요청**: 각 프로젝트 카드에 기간 표시.

## Phase 1 — `content/` 데이터만 수정 (컴포넌트 无, 즉시 반영)

1. **GitHub 링크** (`content/projects.ts`)
   - `nosogong` `links` 추가: `{ label: "GitHub", href: "https://github.com/orgs/no-so-gong/repositories" }`
   - `dongari-moa` `links` 추가: `{ label: "GitHub", href: "https://github.com/Chaehyunli/TeamProject2025" }`
2. **`profile.projects` 삭제** (`content/profile.ts` + `content/types.ts` `Profile.projects`) — 참조처 없음(확인 완료), 타입까지 제거
3. **`result` 재작성**
   - `moduyaksok`: 문서 2-1 초안 적용 (지연을 "설계상 감수한 비용"으로, `n=5` 유지하되 헤드라인 아님). Vercel Analytics 붙이기 전이므로 "사용량 분석 미도입" 표현은 Phase 4에서 정리
   - `nosogong`: 문서 2-2 초안 적용 (Cold Start 판단을 앞세우고 R² 0.9964는 맥락 안으로)
   - `masil` / `searchive` / `petner` / `dongari-moa`: "성과·판단으로 열고 한계로 닫기" 기준으로 문장 순서만 점검, 필요 시 최소 수정
4. **아이콘 중복 해소**: `nosogong` `icon` `📎` → `🎮`. `dongari-moa`는 `📎` 유지 (이제 6개 모두 유일)
5. **노소공 카드 이미지 분리**: `nosogong` `cardImage.src` → `screen-activity-selection.png` (`introScreen`은 `screen-game-home.png` 유지)
6. **`scope` 서술 강화** (팀 프로젝트 4개: `masil`·`petner`·`nosogong`·`dongari-moa`) — "맡은 역할"을 파일/모듈 단위로 구체화해 코드 비공개 리스크를 서술로 보완

## Phase 2 — 소규모 컴포넌트 수정

7. **접근성 대비** (`app/globals.css`): `--color-sub` `#8b95a1` → `#6b7685`, `--color-muted` `#b0b8c1` → `#8b95a1`. 변경 후 캡션·Divider·타임라인 전 페이지 육안 확인
8. **다이어그램 `alt`** (`components/sections/ProjectDetail.tsx`의 alt 생성부): "파이프라인 다이어그램 1" → 내용 기술형 문자열. 데이터에 `diagramCaptions`가 있으면 그것을 alt로 활용
9. **프로젝트 카드 기간 표시** (`components/ui/ProjectCard.tsx`): `project.meta.split(" · ")[0]`를 제목 위 mono·`text-muted`·`text-[10px]` 라벨로 추가 (TimelineCard 기간 라벨과 동일 톤). 새 필드 추가 안 함 — `meta` 첫 세그먼트가 이미 기간
10. **SEO** (`app/layout.tsx`): `metadataBase` + `openGraph`(title/description/url/siteName/images) + `twitter` 카드 메타 추가. `app/favicon.ico` 커스텀 교체. OG 이미지 1200×630 1장 제작 → `public/og.png`

## Phase 3 — 새 콘텐츠 블록 (컴포넌트 + 콘텐츠)

11. **About 섹션**: `Profile`에 `about?: string[]` 추가 → `profile.ts`에 불릿 2~3개("일하는 방식" 1~2 + "백엔드에 AI를 어디에 붙이고 싶은지" 1) → 홈 Hero↔Timeline 사이 독립 카드로 렌더. "왜 백엔드인지"는 안 씀
12. **인턴 경력 카드**: `TimelineCard`에서 "경력"을 분리한 별도 카드 블록 (역할·기간 + 핵심 기여 2~3불릿 + 스택 태그). 내용 출처 — 노션 06 인턴 페이지:
    - 20만 LOC 전략물자 관리 시스템 레거시 → MSA(4개 서버 모듈) 전환 검증
    - 레거시 동작을 역추적해 테스트 기준 복원, 약 8,000개 테스트 케이스 설계·수행
    - 결함을 레거시 차이·재현 정보·발생 모듈 관점으로 정리해 공유
    - 스택: Spring Boot, Thymeleaf
    - 고객·업무상 민감 로직 제외, 역할·규모·성과 중심

## Phase 4 — 배포·외부 설정

13. **Vercel Analytics** 추가 → `moduyaksok` `result`의 "사용량 분석 미도입" 문구 삭제 (Phase 1-3과 연결)
14. **Render keep-alive**: cron-job.org 5분 간격 ping 설정(외부 작업, 안내만) 또는 API 문서 링크 라벨에 "(첫 요청 시 콜드스타트 ~30초)" 주석
15. **모바일 상세 사이드바 순서** (`ProjectDetail.tsx`): `md` 미만에서 핵심 메타(기간·역할)만 상단, 스택·링크는 본문 뒤로 (`order-*` 유틸 or `<details>`). 읽기 순서 재확인

## 제외 / 보류

- 이력서 PDF 버튼·링크 — 파일 없음, 안 만듦
- public 미러 repo — `scope` 서술 강화로 대체
- JSON-LD `Person` — 선택, 보류
- 인턴 상세 페이지급 — 오버, 카드 블록으로 확정

---

## 진행 결과 (2026-09-04 완료)

Phase 1~4 전부 적용. `npm run lint` / `tsc --noEmit` / `next build` 통과, 프로덕션 서버로 홈·모바일 상세·OG 이미지 육안 확인.

| # | 작업 | 결과 |
|---|---|---|
| 1 | GitHub 링크 | `nosogong`·`dongari-moa` `links` 추가. 4개 org + 팀 repo 전부 public 확인 완료 |
| 2 | `profile.projects` 삭제 | `Profile.projects` 타입·데이터 제거. `experience` → `career: CareerEntry[]`로 대체 |
| 3 | `result` 재작성 | `moduyaksok`·`nosogong` 초안 적용. 나머지 4개는 이미 "성과로 열림" — 무수정 |
| 4 | 아이콘 | `nosogong` 🎮. 6개 유일 |
| 5 | 노소공 카드 이미지 | `cardImage` → `screen-activity-selection.png` |
| 6 | `scope` 강화 | 6개 전부 `scope: string[]`로 전환(모듈·역할 단위 칩). 사이드바 "맡은 역할"을 서술 → 칩 |
| 6b | 사이드바 통일 | 기간·형태/맡은 역할/Tech Stack/Links 전부 가운데 정렬 + 칩 스타일(기간·역할 gray Chip, 스택 mono Tag). `meta` 중복(장려상·배포 운영 중) 제거. Highlights 섹션은 재점검에서 삭제(아래 A) |
| 7 | 접근성 대비 | `--color-sub` #6b7685, `--color-muted` #8b95a1 |
| 8 | 다이어그램 `alt` | `diagramCaptions` 라벨을 이어붙인 내용형 문자열로 |
| 9 | 카드 기간 | `ProjectCard` 제목 위 mono 라벨 (`meta.split(" · ")[0]`) |
| 10 | SEO | `layout.tsx` metadataBase+openGraph+twitter · `app/icon.svg` 모노그램 · `app/opengraph-image.tsx` (ImageResponse, 한글 폰트 fetch) |
| 11 | About 카드 | `profile.about` + `components/sections/AboutCard.tsx`, Hero 아래 |
| 12 | 인턴 경력 카드 | `content/career.ts`(`CareerEntry[]`) + `components/sections/CareerCard.tsx` — About 아래 **전체 폭 카드 1장**. 기간·역할 + 맥락 1문장 + STAR를 압축한 기여 3불릿 + 스택. 상세 페이지·그리드 카드는 만들지 않음(인턴 1개라 프로젝트급 템플릿은 무게 과함). TimelineCard는 "학력·교육·자격"만 |
| 13 | Vercel Analytics | `@vercel/analytics` 설치, `layout.tsx`에 `<Analytics />` |
| 14 | Render keep-alive | **미적용** — 아래 수동 결정 |
| 15 | 모바일 사이드바 순서 | `ProjectDetail` `order-1/2` — 모바일에서 본문(제목·정의) 먼저, 사이드바 뒤로 |

## 사용자 수동 확인 필요

- [ ] `app/favicon.ico` — Next 기본 그대로 남아있음. `app/icon.svg`(모던 브라우저)만 교체됨. Safari 등 대비 매칭 `.ico` 만들려면 별도 툴 필요
- [ ] `NEXT_PUBLIC_SITE_URL` 환경변수 — 미설정 시 Vercel 빌드 변수(`VERCEL_PROJECT_PRODUCTION_URL`)로 자동, 로컬은 `localhost:3000`. 커스텀 도메인 있으면 Vercel 프로젝트 env에 등록
- [ ] Vercel 대시보드에서 Analytics 활성화 (코드는 붙음, 프로젝트 설정에서 켜야 데이터 수집)
- [ ] OG 이미지 디자인 확정 — 현재 텍스트만(이름 + BACKEND DEVELOPER + 태그라인). 더 꾸미려면 `app/opengraph-image.tsx` 수정
- [ ] Render keep-alive: cron-job.org 5분 ping vs API 링크 라벨에 콜드스타트 주석 — 택1
- [x] GitHub org 링크 비로그인 접근 — 4개 org + 동아리모아 repo 전부 public 확인

---

# 재점검 (2026-09-04, 채용담당자 관점)

전체 페이지(홈·상세 6개·모바일) 육안 재점검. `lint`/`tsc`/`build` 통과.

## 축별 평가 (2026-09-03 → 현재)

| 항목 | 전 | 현재 | 근거 |
|---|---|---|---|
| 포지셔닝·차별화 | A | **A** | "AI 어디까지 쓸지 판단" 서사가 About 카드로 명시화됨. 모두약속·Masil·Searchive에서 LLM/알고리즘 경계가 일관되게 반복 |
| 프로젝트 깊이 | A | **A** | STAR 6개 일관. 판단→행동→결과 구조 유지 |
| 검증 가능성 | C | **B** | GitHub 6/6 (전부 public 확인). 팀 프로젝트는 `scope` 칩으로 담당 모듈 명시. 커밋 단위 증명은 아님. 이력서 PDF 없음 |
| 지표 신뢰도·프레이밍 | B− | **B+** | 모두약속·노소공 `result`가 판단부터 열림. 약한 숫자(16초·R² 0.99)가 헤드라인에서 빠지고 측정조건(n=5)은 정직하게 유지 |
| 사이트 완성도 | B− | **B+** | 색 대비·OG·favicon·About·Career·모바일 사이드바·카드 기간 전부 반영. 아래 신규 이슈 3건만 남음 |

## 이번 점검에서 나온 신규 이슈

### A. 사이드바 Highlights ↔ 맡은 역할 칩 중복 (개선 권장)
`scope`를 칩으로 바꾸면서 `badges`(Highlights)와 겹침:
- **PETNER**: "WebSocket/STOMP 세션 인증"이 gray(역할)·blue(Highlights) 두 번, 바로 위아래
- **동아리모아**: "Redis 세션 인증", "리소스 단위 RBAC" 두 번씩
- **Masil**: "구간별 LLM 검증" ≈ "구간별 DeepEval 검증" 부분 중복
- 해결안 1 — 사이드바 Highlights 섹션 제거. 역할 칩이 이미 커버하고, 순수 성취(은상·장려상·앱 배포)는 status·result에 이미 있음
- 해결안 2 — `badges`에서 역할과 겹치는 항목 빼고 "성취/차별점"만 남김 (예: PETNER → ["장려상"], 동아리모아 → 삭제)

### B. "단독 프로젝트" 칩이 "개인 프로젝트"와 중복 (경미)
- 모두약속·Searchive: 기간·형태에 "개인 프로젝트", 맡은 역할에 "단독 프로젝트" = 같은 말
- 해결: `scope`에서 "단독 프로젝트" 빼고 실제 담당 영역만 (모두약속 → ["기획·설계", "구현", "배포·운영"])

### C. README stale (채용담당자가 repo 볼 경우)
- "하나의 스크롤 페이지" (실제는 홈+상세 라우트), "Next.js 15" (실제 16), 폴더 구조에 없는 `lib/` 언급
- `README.md` 3줄 갱신이면 충분

## 원래 계획에서 남은 항목 (변동 없음)

- 이력서 PDF — 사용자 확인: 없음, 보류
- Vercel Analytics 대시보드 활성화 (코드만 붙음)
- `favicon.ico` 매칭 (SVG만 교체됨)
- OG 이미지 디자인 (현재 텍스트만)
- Render keep-alive 방식 택1

## 총평

채용담당자에게 보낼 수 있는 상태. 남은 3건(A/B/C)은 전부 30분 내 정리 가능한 표면 이슈고, 내용·구조·검증 가능성은 목표치(B+ 이상)에 도달. 우선순위: **A > C > B**.

---

## 재점검 후속 정리 (2026-09-04, A/B/C 완료)

| 이슈 | 처리 |
|---|---|
| A. Highlights ↔ 맡은 역할 중복 | **`badges` 필드 + 사이드바 Highlights 섹션 삭제**. 시그니처 판단은 이미 `decisions[].title`로, 성취(은상·장려상·앱 배포)는 `status`·`result`로 노출됨. 사이드바는 기간·형태 / 맡은 역할 / Tech Stack / Links 4블록으로 축소 |
| B. "단독 프로젝트" ↔ "개인 프로젝트" 중복 | 모두약속 `scope` → `["기획·설계","구현","배포·운영"]`, Searchive → `["기획·설계","태그 파이프라인 구현","검색·RAG 구현"]`. 솔로 신호는 `meta`의 "개인 프로젝트"가 담당 |
| C. README stale | "Next.js 15"→16, "하나의 스크롤 페이지"→홈+상세 라우트, 폴더 구조(`lib/` 삭제·`career.ts` 추가) 갱신 |

`CLAUDE.md`도 사이드바 스펙(하이라이트 제거, `scope: string[]`, `career.ts`) 반영. `lint`/`tsc`/`build` 통과, 상세 3개(petner·dongari-moa·moduyaksok) 사이드바 육안 확인.

---

## 채용 관점 보완 (2026-09-04)

| 항목 | 처리 |
|---|---|
| **이력서 PDF** | `app/resume/page.tsx` 신규 — 포트폴리오 데이터(`profile`·`career`·`projects`)로 조립하는 인쇄용 단일 페이지. Hero에 "이력서" 링크. `PrintButton`으로 Cmd+P → PDF. 사이트와 항상 동기화. 현재 A4 3쪽 |
| **팀 프로젝트 기여 검증** | Masil·PETNER·노소공 `links`에 "담당 PR" 추가 — `github.com/search?q=org:<org>+author:Chaehyunli+is:pr` (로그아웃 상태에서 정상, PETNER 18 PR 확인). Searchive는 개인, 동아리모아는 PR 없이 직접 커밋(→ `commits?author=` 링크 여부는 사용자 판단) |
| **`profile.skills`** | 카테고리별 기술 요약 추가 (이력서용, 홈에는 미노출) |
| Render keep-alive | 사용자: 헬스체크 있고 Render가 주기 호출 중. **단 확인 결과 첫 요청 60초+ 타임아웃 → 웜업 후 1.3초.** ping 주기가 15분 무활동 슬립보다 길거나 안 먹는 듯. 주기 점검 필요 |

## 아직 사용자 입력 필요

- [ ] 동아리모아 "담당 커밋" 링크 붙일지 (커밋에 프론트 작업 섞여 있어 scope의 백엔드 주장과 온도차 가능 — 직접 확인 권장)

---

# 다음 작업 계획 v2 (2026-09-04 확정, 진행 중)

> 자소서(HERMES/취업/[2026-2] 자소서)에서 협업 경험을 뽑아, 별도 "협업" 섹션 없이 기존 STAR·About·경력에 녹인다. 이력서형 `/resume`는 폐기하고 포트폴리오 전체 PDF로 전환. 홈 상단(Hero+About)을 재구성해 Skills를 첫 화면에 올린다.

## 협업 경험 리스트 (자소서 출처)

| 경험 | 반영 방식 |
|---|---|
| **A. Masil 문서화 컨벤션** | Masil에 STAR 판단 1개 추가. S&T: 4인 팀 초반 각자 영역만 앎 / Action: 트러블슈팅·기술선정 근거를 노션에 기록하는 컨벤션 도입, 주 1회 브리핑 / Result: 팀원이 문서만으로 AI 파이프라인 마무리를 이어받음. **"손목 골절" 표현은 안 씀** |
| **B. AgentPass(SKALA) 계약 우선 병렬개발** | 새 프로젝트 X. About 협업 불릿 + SKALA training 한 줄로. **Kafka 언급 안 함**(직접 구현 X) |
| **C. 프람트 인턴 필터 파라미터 통일 제안** | `career.ts` 기여 불릿 구체화 — "모듈 간 query/response body 혼용 발견 → query 파라미터 통일 제안" |
| **D. 검증 공백 혼자 메움 (약점)** | 포폴에 안 넣음. 자소서 전용 |
| **E. PETNER OpenSearch 라이선스 비교** | 이미 반영. 추가 X |

## 작업 순서

| # | 작업 | 파일 |
|---|---|---|
| 1 | **Hero 2단 재구성** — 왼쪽 신원 / 오른쪽에 한 줄 정의 크게 + 짧은 태그라인 2~3개(`profile.focus`), PDF는 버튼화 | `HeroCard`, `content/profile.ts`, `content/types.ts` |
| 2 | **About + Skills 통합 카드** — `AboutCard`가 `profile.skills`도 렌더(카테고리 그리드). About에 협업 불릿(B) 추가 | `AboutCard`, `content/profile.ts`, `app/page.tsx` |
| 3 | **`/print` 라우트** — 프로필·About·Skills·경력·6개 프로젝트 상세 전체를 세로로 렌더. `PortfolioPrint` 컴포넌트가 기존 하위 컴포넌트 재사용. sticky바·reveal·사이드바 제거(가로 메타로 평탄화) | `app/print/`, `components/sections/PortfolioPrint.tsx` |
| 4 | **`@media print` 페이지 나눔** — `@page A4`, `print-color-adjust:exact`, 프로젝트마다 `break-before:page`, 판단·이미지+캡션·다이어그램·result에 `break-inside:avoid`, BlockHeading `break-after:avoid`, 2단→세로 스택 | `app/globals.css` |
| 5 | **`/resume` 제거** + Hero 링크를 `/print` 기반 PDF로 교체 | `app/resume/` 삭제, `HeroCard` |
| 6 | **`scripts/generate-pdf.mjs` + `npm run pdf`** — Puppeteer(devDep)로 `/print` 렌더 → `public/portfolio.pdf`. 수동 실행. 빌드타임 자동화는 안 함 | `scripts/`, `package.json`, `public/` |
| 7 | **Masil STAR 판단 추가**(A) | `content/projects.ts` |
| 8 | **`career.ts` 필터 제안 구체화**(C) + **SKALA training 한 줄 확장**(B) | `content/career.ts`, `content/profile.ts` |
| 9 | schedule.md 최종 갱신 | `schedule.md` |

## 폐기된 항목

- Render keep-alive / ping — 사용자: 안 함. API 문서 링크 콜드스타트(~60초)는 라벨 주석도 안 붙이고 그대로 둠
- 요약형 이력서(`/resume`) — 포트폴리오 전체 PDF로 대체
- 팀 프로젝트 1인칭 협업 일화 별도 수집 — 자소서에서 A~E로 확보, 별도 입력 불필요
