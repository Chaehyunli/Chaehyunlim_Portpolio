import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "moduyaksok",
    icon: "🤝",
    title: "모두약속",
    oneLiner:
      "목적·시간·지역·예산·선호를 입력하면 실제 장소 검색 결과로 약속 일정을 만들어주는 AI 서비스",
    meta: "2026.08 ~ · 개인 프로젝트 · 배포 운영 중",
    scope: "기획·설계·구현·배포 전 과정 단독",
    status: { label: "배포 운영 중", color: "green" },
    badges: ["배포 운영 중", "zero-knowledge BYOK", "LLM·알고리즘 경계 설계"],
    links: [
      { label: "배포", href: "https://moduyaksok.vercel.app" },
      { label: "GitHub", href: "https://github.com/Chaehyunli/moduyaksok" },
      { label: "API 문서", href: "https://moduyaksok.onrender.com/docs" },
    ],
    stack: [
      "FastAPI", "SQLModel", "PostgreSQL", "Redis", "Alembic",
      "Vue 3", "TypeScript", "Pinia", "Tailwind CSS", "Web Crypto API",
      "DeepEval", "Vercel", "Render",
    ],
    why: [
      {
        label: "반복되는 장소·동선 조율",
        detail: "약속마다 매번 새로 고르고 맞춰야 하는 번거로움",
      },
      {
        label: "일반적인 AI 추천의 한계",
        detail: "존재하지 않는 장소를 생성, 실제 이동거리 미고려",
      },
      {
        label: "실제 검색 결과 기반 설계",
        detail: "검증된 장소 안에서만 일정 구성 + 실제 경로로 동선 검증",
      },
    ],
    diagramSrc: "/images/projects/modu-yaksok/diagram-pipeline.svg",
    diagramCaptions: [
      {
        label: "네이버 지역검색 결과만 후보로 사용",
        detail: "LLM이 존재하지 않는 장소를 만드는 걸 구조적으로 차단",
      },
      {
        label: "관점 3개 병렬 생성",
        detail: "하나의 정답이 아니라 서로 다른 기준의 선택지 제공",
      },
      {
        label: "Step 4를 사용자 선택 후로 미룸",
        detail: "선택된 후보에만 호출해 API 비용 절약",
      },
      {
        label: "Vue 3 + Web Crypto API",
        detail: "브라우저 내장 암호화로 키 암호화를 클라이언트에서 처리",
      },
    ],
    introScreen: {
      src: "/images/projects/modu-yaksok/mockup-landing-page.png",
      caption: "실제 배포된 랜딩 페이지 — 낙서하듯 적으면 일정이 나온다",
    },
    heroScreen: {
      src: "/images/projects/modu-yaksok/mockup-schedule-candidates.png",
      caption: "일정 후보 3개 제시",
    },
    decisions: [
      {
        title: "서버가 사용자 키를 복호화할 수 있다는 것 자체가 문제였다",
        problem:
          "LLM 호출 비용을 운영자가 부담하지 않도록 사용자가 직접 API 키를 등록하는 BYOK 구조를 선택했고, 그 대가로 남의 비밀키를 서버에 안전하게 보관할 책임을 떠안았다. 처음엔 Fernet 대칭키로 암호화해 DB에 저장했는데, 마스터키를 가진 서버는 모든 사용자의 키를 복호화할 수 있어 DB 유출은 물론 운영자의 직접 열람도 구조적으로 막을 수 없었다.",
        considerations: [
          "클라이언트가 provider를 직접 호출 — CORS·provider별 SDK를 프론트에 이식하는 비용이 큼",
          "요청마다 프론트가 키를 전달(무저장) — 저장은 안 해도 처리 중엔 서버가 평문을 봄",
          "localStorage 저장 — 해결이 아니라 리스크 이전, XSS 하나로 전 사용자 키 유출",
        ],
        solution: [
          {
            label: "신뢰 경계부터 고정",
            detail:
              "\"서버는 평문 키를 절대 볼 수 없다\"를 깨지지 않는 제약으로 먼저 못박고, 보안·편의성·zero-knowledge 사이의 조합을 거기에 맞춰 선택했다.",
          },
          {
            label: "패스프레이즈로 유도한 키, 브라우저에서 암호화",
            detail:
              "PBKDF2-SHA256 60만 회로 키를 유도하고 AES-GCM 256bit으로 클라이언트에서 암호화해, 서버로는 암호문·salt·iv만 보낸다.",
          },
          {
            label: "Argon2 대신 crypto.subtle PBKDF2",
            detail:
              "반복 600,000회는 OWASP Password Storage Cheat Sheet(2023) 권장치를 그대로 채택했다. Argon2가 더 강하지만 WASM 의존성이 붙어, 브라우저 내장 crypto.subtle만으로 끝나는 PBKDF2를 택하고 kdf_iterations를 암호문과 함께 저장해 이후 상향도 가능하게 했다.",
          },
          {
            label: "평문은 호출 순간에만, 즉시 폐기",
            detail:
              "클라이언트가 로컬 복호화한 평문을 provider 호출 요청 1건에만 싣고 서버는 쓰는 즉시 버린다. 유도 키도 sessionStorage에만 저장해 탭을 닫으면 사라진다.",
          },
        ],
        outcome:
          "Fernet 대칭키 저장에서, 서버가 어떤 시점에도 사용자 키 평문에 접근할 수 없는 구조로 전환했다. 패스프레이즈 분실 시 복구 불가는 서버 신뢰를 설계에서 배제하기 위한 의도된 트레이드오프다.",
        image: {
          src: "/images/projects/modu-yaksok/mockup-api-key-passphrase.png",
          caption: "패스프레이즈 입력 — 서버에는 저장되지 않는다",
        },
      },
      {
        title: "LLM이 할 일과 코드가 할 일을 나눴다",
        problem:
          "프롬프트에 \"같은 태그는 후보당 최대 1곳\", \"점심·저녁 시간대면 식사 장소를 넣어라\"를 명시해도 지켜지지 않았다. 직접 써보며 \"와플\" 같은 강한 선호 태그에 디저트·카페만으로 하루가 채워져 식사가 빠진 일정, 여러 지역을 입력하면 멀리 떨어진 지역이 한 코스로 섞이는 일정이 반복됐다. 프롬프트를 고쳐도 빈도만 줄 뿐 사라지지 않았다.",
        considerations: [
          "시간 겹침·예산·이동거리·식사 슬롯·태그 중복은 좌표와 시각만으로 코드가 확정 가능 — 프롬프트로 부탁할 대상이 아님",
          "\"해산물 태그와 이자카야 카테고리가 의미적으로 겹치는가\" 같은 판단만 규칙으로 못 잡음 — 이것만 LLM에 남김",
        ],
        solution: [
          {
            label: "계산 가능한 조건은 코드로 분리",
            detail:
              "시간 겹침·예산·이동거리·식사 슬롯·태그 중복은 좌표와 시각만 있으면 코드가 확정한다. 프롬프트로 부탁할 대상이 아니라고 보고 Step 3 앞단에 규칙 하드 필터를 설계해 넣었다.",
          },
          {
            label: "규칙으로 못 잡는 판단만 LLM에",
            detail:
              "\"해산물 태그와 이자카야가 의미적으로 겹치는가\" 같은 판단만 LLM에 남기고, 규칙을 통과한 후보에만 1회 호출하도록 구성했다.",
          },
          {
            label: "후보 생성 알고리즘 버전을 따로 구현",
            detail:
              "순차 생성하면 지역 최적점에 갇혀, beam width 80으로 완성 조합을 계획당 12개씩 만든 뒤 세 후보를 한 세트로 공동 평가한다(장소·카테고리 Jaccard, 태그 충족).",
          },
          {
            label: "경계를 옮길 때마다 수치로 검증",
            detail:
              "LLM이 남은 Step1·Step3는 골든셋 11·4케이스(GEval 임계값 0.70, judge 고정)로, 코드가 맡은 하드조건은 결정론적 회귀 fixture로 본다. 프롬프트·모델을 바꾸면 같은 세트로 다시 돌린다.",
          },
        ],
        outcome:
          "하드 조건은 완성 후 검사가 아니라 beam search가 후보를 넓히는 도중부터 불변조건으로 강제된다 — 결정론적 회귀 fixture(합성 데이터)에서 세 후보 모두 위반 0건이 재현된다. Step1·Step3 골든셋은 GEval 0.70 임계값을 통과한다.",
        image: {
          src: "/images/projects/modu-yaksok/mockup-preference-conflict.png",
          caption: "조건 입력 — 겹치는 선호는 생성 전에 짚어준다",
        },
      },
      {
        title: "외부 API 호출량을 제어하되 서비스는 멈추지 않게",
        problem:
          "네이버 지역검색은 초당 10건·일 25,000건, ODsay는 일 1,000건 한도가 있다. 장소 풀을 모으려면 카테고리 16종 × 태그만큼 팬아웃해야 해서, 한 번의 일정 생성이 네이버를 21회 호출한다(경기 수원 조건 실측, 고유 장소 92곳).",
        considerations: [
          "재시도(backoff)만으로는 호출 폭주 자체를 못 막음 — 속도를 사전에 제한해야 함",
          "순수 FIFO 토큰버킷은 한 생성 요청이 큐를 독점해 다른 사용자를 굶김",
          "리미터를 in-memory로 두면 멀티 워커에서 각자 한도를 세 전역 상한이 깨짐",
        ],
        image: {
          src: "/images/projects/modu-yaksok/mockup-route-map.png",
          caption: "지도·경로 상세 — 700m 이내 구간은 호출 없이 처리한다",
        },
        solution: [
          {
            label: "초당은 세션 단위 라운드로빈, 일일은 Redis",
            detail:
              "초당 상한은 세션 단위 라운드로빈 토큰버킷 — 세션 N개면 세션당 처리량이 자연히 rate/N로 수렴한다. 일일 한도는 Redis 카운터 + 자정 TTL로 여러 워커에서도 전역 집계가 하나로 유지된다.",
          },
          {
            label: "부족하면 막지 않고 줄인다",
            detail:
              "예산이 모자라면 요청을 차단하는 대신 확보 가능한 만큼만 검색하고, 카테고리 쿼리를 우선 생존시켜 결과 품질을 지킨다.",
          },
          {
            label: "부를 필요 없는 호출은 생략",
            detail: "ODsay는 700m 이내 도보 구간을 사전에 걸러 호출 자체를 건너뛴다.",
          },
        ],
        outcome:
          "하이브리드 전환으로 생성 1건당 네이버 검색이 36회에서 21회로 줄었고, 라운드로빈 덕에 세션이 몰려도 서로 굶기지 않는다. 초당 리미터가 아직 in-process라 멀티 워커 스케일 시 전역 상한이 어긋나는 건 다음 과제로 남겼다.",
      },
    ],
    screens: [],
    result:
      "공개 배포 · 본인·지인 사용 중(사용량 분석 미도입) · 초기 생성 지연 p50 16초 / p95 ~20초(로컬 5회) · https://moduyaksok.vercel.app",
  },
  {
    id: "masil",
    icon: "🧭",
    title: "Masil",
    oneLiner: "대화로 일정을 짜고 예약까지 이어지는 AI agent 여행 플래너",
    meta: "2026.03 ~ 2026.08 · 4인 팀",
    scope: "AI 파이프라인 설계 단독 · AI 서버 구현 80% / 백엔드 API 전체 설계 · 일정 도메인 구현",
    status: { label: "앱 배포 완료", color: "green" },
    badges: ["Capstone 은상", "Android 앱 배포", "구간별 LLM 검증"],
    links: [{ label: "GitHub", href: "https://github.com/orgs/Masil2026/repositories" }],
    stack: [
      "React Native", "Expo", "Spring WebFlux", "FastAPI", "PydanticAI",
      "PostgreSQL", "Redis", "SSE", "Docker Compose",
    ],
    why: [
      {
        label: "기존 ML 기반 여행 추천의 한계",
        detail: "학습된 여행지·일정 범위 안에서만 결과 생성",
      },
      {
        label: "실시간 정보 미반영",
        detail: "학습 데이터에 없는 지역·실시간 변경 정보 반영 불가",
      },
      {
        label: "AI agent 기반 재설계",
        detail: "실시간 정보 직접 조회해 일정 구성 + 예약까지 수행",
      },
    ],
    diagramSrc: "/images/projects/masil/diagram-pipeline.svg",
    diagramCaptions: [
      {
        label: "Spring WebFlux",
        detail: "AI 요청은 응답까지 오래 걸린다 — 요청 단위로 스레드를 점유하지 않기 위해",
      },
      {
        label: "Pydantic AI",
        detail: "단계마다 출력 형태가 흔들린다 — 각 step 입출력을 스키마로 고정하기 위해",
      },
      {
        label: "구간별 DeepEval 검증",
        detail: "LLM 파이프라인은 틀려도 어느 단계인지 모른다 — step마다 골든셋 테스트로 구간 특정",
      },
    ],
    heroScreen: {
      src: "/images/projects/masil/screen-chat-itinerary.png",
      caption: "AI 일정·예약 후보 제안",
      narrow: true,
    },
    decisions: [
      {
        title: "되돌릴 수 없는 동작은 파이프라인에 들어가기 전에 확정했다",
        problem:
          "요청이 애매할 때 파이프라인이 그대로 진행되면 엉뚱한 동작이 실행됐다. \"그거 취소해줘\" 한마디가 일정을 새로 만들라는 건지, 예약을 취소하라는 건지 구분되지 않은 채 흘러가면 되돌릴 수 없는 예약·취소가 잘못 실행된다.",
        considerations: [
          "분류를 파이프라인 안에서 하면 이미 실행이 시작된 뒤라 되돌리기 어렵다 — 진입 전에 판단해야 한다",
          "되돌릴 수 없는 동작(예약·취소)은 확정 전에 한 번 더 물어야 한다",
        ],
        solution: [
          {
            label: "5종 분류를 파이프라인 진입 전에 설계해 넣었다",
            detail:
              "classification_agent가 대화 요약·선호·현재 일정·예약 정보를 함께 보고 chat·itinerary·reservation·change·cancel 중 하나로 타입을 확정한다.",
          },
          {
            label: "미확정이면 실행하지 않고 확인 단계로 분기",
            detail:
              "예약 취소는 대상을 명확히 안 골랐으면 후보를 먼저 제시하고 확인받도록 흐름을 바꿨다.",
          },
          {
            label: "각 step에 DeepEval 골든 데이터셋 테스트",
            detail:
              "결과가 엉뚱할 때 응답 생성이 아니라 요청 해석 단계의 문제임을 특정할 수 있게 만들었다.",
          },
        ],
        outcome:
          "모호한 취소·수정 요청이 후보 확인 없이 실행되는 경우가 사라졌다. 파이프라인을 통째로 고치지 않고 구간 단위로 수정할 수 있어, 요청 해석이 틀렸을 때 그 step만 손본다.",
        image: {
          src: "/images/projects/masil/screen-reservation-status.png",
          caption: "예약 상태 — 잘못 취소되면 되돌릴 수 없는 화면",
          narrow: true,
        },
      },
      {
        title: "WebFlux 위에서 DB 접근만 블로킹으로 남아있던 문제를 없앴다",
        problem:
          "WebFlux로 비동기 요청 처리를 구성했는데 데이터 접근 계층이 블로킹 JPA라, 그 구간에서 비동기 흐름이 끊기고 AI 응답을 기다리는 동안 요청 스레드가 다시 묶였다.",
        considerations: [
          "WebFlux + 블로킹 JPA는 구조적 모순 — 비동기의 이점이 DB 구간에서 전부 사라진다",
          "R2DBC는 라이브러리 교체가 아니라 계층 전환 — 직렬화·지연 평가·Redis 접근이 함께 바뀌어야 반쪽이 안 된다",
        ],
        solution: [
          {
            label: "R2DBC로 데이터 접근 계층까지 완전 비동기화",
            detail: "요청 처리 전 구간의 논블로킹 흐름을 맞췄다.",
          },
          {
            label: "라이브러리 교체로 끝내지 않고 주변까지 보완",
            detail:
              "Reactive Redis·JSON 변환기·테스트를 함께 정비하고, 전환 중 만난 lazy evaluation 오류를 수정해 비동기 체인 실행 시점을 안정화했다.",
          },
        ],
        outcome:
          "요청 처리 전 구간이 논블로킹으로 이어져, AI 응답을 기다리는 동안 요청 스레드가 묶이지 않는다. 전환을 직렬화·지연 평가·테스트까지 검증하고 마무리했다.",
        image: {
          src: "/images/projects/masil/screen-day-detail.png",
          caption: "Day별 일정 상세 — 비동기 파이프라인이 만들어 내려보내는 결과",
          narrow: true,
        },
      },
      {
        title: "LLM API 호출 폭주로 대화 흐름이 끊기는 문제를 막았다",
        problem:
          "LLM API가 429를 반환하면 진행 중이던 대화 응답이 그대로 끊겼다. 사용자가 몰리거나 한 대화에서 agent가 여러 번 호출하면 순간 호출량이 한도를 넘겼다.",
        considerations: [
          "재시도(backoff)만으로는 이미 폭주한 호출을 늦출 뿐, 폭주 자체를 못 막는다 — 속도를 사전에 제한해야 한다",
          "고정 간격 재시도는 여러 요청이 같은 타이밍에 몰려 다시 429를 부른다",
        ],
        solution: [
          {
            label: "Token Bucket으로 호출 속도를 사전에 완화",
            detail: "한도를 넘기 전에 호출 간격을 벌린다.",
          },
          {
            label: "429 발생 시 exponential backoff + jitter 재시도",
            detail:
              "지수적으로 간격을 늘리고 무작위 지연을 섞어 재요청이 서로 겹치지 않게 했다.",
          },
        ],
        outcome:
          "순간 호출량이 한도를 넘기 전에 눌리고, 그래도 429가 나면 대화가 끊기지 않고 재개된다. 재시도 로직은 테스트로 검증했다.",
        image: {
          src: "/images/projects/masil/screen-day-progress.png",
          caption: "당일 진행 — SSE 스트림으로 실시간 갱신되는 화면",
          narrow: true,
        },
      },
    ],
    cardImage: {
      src: "/images/projects/masil/card-hero.png",
      caption: "AI 채팅부터 예약·일정 관리까지",
    },
    screens: [],
    result: "Android 앱 배포 · 명지대학교 Capstone 디자인 전시회 은상",
  },
  {
    id: "searchive",
    icon: "🔎",
    title: "Searchive",
    oneLiner: "문서를 업로드하면 자동 태깅·검색·RAG 질의응답으로 이어지는 개인 지식 베이스",
    meta: "2025.10 ~ 2025.12 · 개인 프로젝트",
    scope: "기획·설계·구현 전 과정 단독",
    status: { label: "완성", color: "gray" },
    badges: ["개인 프로젝트", "벡터 기반 태그 재사용", "Elasticsearch 배치 검색"],
    links: [
      { label: "GitHub", href: "https://github.com/orgs/Searchive-Project/repositories" },
    ],
    stack: [
      "FastAPI", "PostgreSQL", "Elasticsearch", "pgvector", "Redis",
      "MinIO", "KeyBERT", "React", "TypeScript", "Docker Compose",
    ],
    why: [
      {
        label: "폴더에 쌓아두면 못 찾는 문서",
        detail: "나중에 어디에 뭐가 있는지 찾기 어려움",
      },
      {
        label: "외부 서비스 의존 없이 자동 분류",
        detail: "자동 태깅 → 검색 → 질의응답으로 이어지는 구조 필요",
      },
      {
        label: "업로드→태깅→검색→RAG 단일 파이프라인",
        detail: "직접 만든 개인 지식 베이스",
      },
    ],
    introScreen: {
      src: "/images/projects/searchive/mockup-landing.png",
      caption: "랜딩 페이지 — 업로드·정리·질의응답을 하나의 흐름으로 안내",
    },
    showcaseScreen: {
      src: "/images/projects/searchive/mockup-rag-qna.png",
      caption: "RAG 질의응답 — 검색 결과를 근거로 답변을 구성한다",
    },
    showcasePoints: [
      {
        label: "문서 업로드와 색인",
        detail: "PDF·텍스트에서 내용을 추출해 검색 가능한 문서로 색인한다.",
      },
      {
        label: "자동 태깅과 대표 태그 재사용",
        detail: "후보를 정제하고 기존 태그와 연결해 검색 필터를 일관되게 유지한다.",
      },
      {
        label: "검색 결과를 근거로 답변 생성",
        detail: "찾아낸 문서 정보를 바탕으로 RAG 응답을 구성한다.",
      },
    ],
    decisions: [
      {
        order: 2,
        title: "계산과 통신이 함께 N배로 늘어나는 구조를 배치 검색으로 풀었다",
        problem:
          "문서에서 추출한 태그 후보마다 기존 대표 태그를 찾으려고 Elasticsearch KNN 검색을 개별 요청으로 보냈다. 후보가 늘어날수록 같은 검색 단계에서 KNN 연산과 HTTP 왕복이 함께 N배로 늘어났고, 태그 품질과 무관한 요청 대기 시간이 업로드 흐름의 병목이 됐다.",
        considerations: [
          "후보를 하나씩 순차 처리하면 각 검색 결과를 독립적으로 확인하기는 쉽지만, 네트워크 왕복과 검색 실행을 후보 수만큼 반복한다",
          "캐시만 추가하면 이미 존재하는 동일 요청은 줄일 수 있지만, 처음 들어온 서로 다른 후보들의 검색 팬아웃은 해결하지 못한다",
          "후보를 하나의 쿼리로 합치면 후보별 유사도 결과가 섞일 수 있어, 검색 단위는 유지하면서 전송만 묶어야 했다",
        ],
        solution: [
          {
            label: "병목을 검색 계산과 요청 왕복으로 나눠 추적",
            detail:
              "순차 처리와 배치 처리의 검색 구간을 따로 측정해, 태그 추출기가 아니라 후보별 KNN 요청과 네트워크 왕복이 지연을 만든다는 점을 확인했다.",
          },
          {
            label: "후보별 KNN 쿼리는 유지하고 _msearch로 전송만 묶음",
            detail:
              "각 후보가 독립된 유사도 결과를 받아야 하는 검색 의미는 바꾸지 않고, Elasticsearch _msearch에 N개의 KNN 쿼리를 한 요청으로 실어 보냈다.",
          },
          {
            label: "배치 결과를 후보 순서대로 다시 연결",
            detail:
              "응답 배열을 원래 후보 순서에 맞춰 복원해, 이후의 완전 일치·벡터 유사도 판단이 개별 요청 방식과 같은 입력을 받도록 구성했다.",
          },
        ],
        outcome:
          "키워드 후보 5개 기준 측정에서 Elasticsearch 요청은 5회에서 1회로, 해당 검색 구간은 250ms에서 10ms로 줄었다. 후보별 검색 의미를 유지한 채 통신 대기와 반복 실행을 함께 줄여, 문서 업로드 뒤 태그 정제 단계가 병목이 되지 않게 했다.",
        diagram: { src: "/images/projects/searchive/diagram-retrieval.svg" },
      },
      {
        order: 1,
        title: "AI가 뽑은 후보를 그대로 저장하지 않고 과추출+필터+대표 태그 수렴으로 정제했다",
        problem:
          "KeyBERT가 문서에서 뽑은 키워드에는 불용어·숫자·한 글자 토큰이 섞였고, 같은 의미라도 표기가 조금 다르면 별도의 태그로 저장됐다. 후보를 그대로 저장하면 검색 필터가 잡음으로 늘어나고, 시간이 지날수록 하나의 개념이 여러 태그로 흩어졌다.",
        considerations: [
          "추출 개수를 목표 태그 수만큼만 제한하면 필터링 뒤 남는 후보가 부족해, 품질 기준을 적용할 여지가 사라진다",
          "문자열 완전 일치만 쓰면 표기 차이를 흡수하지 못하고, 반대로 유사도만 쓰면 다른 의미를 같은 태그로 합칠 위험이 있다",
          "매번 새 태그를 생성하면 구현은 단순하지만, 태그 사전이 누적될수록 검색·필터의 일관성이 무너진다",
        ],
        solution: [
          {
            label: "목표 개수의 3배를 먼저 뽑고 품질 기준으로 거르기",
            detail:
              "초기 후보를 넉넉히 확보한 뒤 불용어·숫자·한 글자 토큰을 제거하고 표기를 정규화했다. 중복을 걷어낸 결과에서 상위 3개만 선택해, 추출 단계의 잡음이 저장 단계까지 이어지지 않게 했다.",
          },
          {
            label: "완전 일치 다음에 벡터 유사도 0.8 이상으로 대표 태그 찾기",
            detail:
              "정규화한 이름이 기존 태그와 정확히 같으면 즉시 재사용하고, 없을 때만 벡터 유사도 0.8 이상인 대표 태그에 수렴시켰다. 두 기준을 모두 통과하지 못한 후보만 신규 태그로 만들었다.",
          },
        ],
        outcome:
          "태그 저장은 추출기의 출력을 그대로 쌓는 방식에서, 품질 필터와 기존 태그 재사용을 거친 뒤 새 태그를 만드는 방식으로 바뀌었다. 같은 개념의 표기 차이가 검색 필터를 분산시키는 일을 줄이고, 사용자가 화면에서 보는 태그를 더 일관되게 유지했다.",
        diagram: { src: "/images/projects/searchive/diagram-tagging.svg" },
        image: {
          src: "/images/projects/searchive/screen-tagging-result.png",
          caption: "문서 업로드 뒤 정제된 자동 태깅 결과",
          prominent: true,
        },
      },
    ],
    screens: [],
    result: "개인 지식 베이스 서비스 완성 · 2025.12",
  },
  {
    id: "petner",
    icon: "🐾",
    title: "PETNER",
    oneLiner: "유기견 탐색·입양 신청·커뮤니티·보호소 실시간 채팅을 연결한 팀 백엔드 서비스",
    meta: "2025.08 ~ 2025.10 · 팀 프로젝트 · 장려상",
    scope: "채팅·유기견·입양 신청·즐겨찾기 도메인 백엔드",
    status: { label: "장려상", color: "orange" },
    badges: ["WebSocket/STOMP 세션 인증", "Soft Delete 설계", "장려상"],
    links: [
      { label: "GitHub", href: "https://github.com/orgs/Dangdaengdan/repositories" },
    ],
    stack: [
      "Java 17", "Spring Boot", "Spring Security", "JPA", "PostgreSQL",
      "Redis", "OpenSearch", "WebSocket/STOMP", "Flyway", "Docker Compose",
    ],
    why: [
      {
        label: "탐색 뒤에 끊기는 입양 경험",
        detail: "유기견 정보를 찾은 뒤 보호소에 문의하고 입양 절차를 밟는 흐름을 한 서비스 안에서 이어야 했다.",
      },
      {
        label: "실시간 문의의 신뢰 경계",
        detail: "HTTP 로그인 상태를 WebSocket과 STOMP 메시지 처리까지 안전하게 이어야 했다.",
      },
    ],
    cardImage: {
      src: "/images/projects/petner/hero-realtime-chat.png",
      caption: "유기견 탐색부터 보호소 실시간 문의까지 연결한 PETNER",
    },
    introScreen: {
      src: "/images/projects/petner/screen-dog-detail-adoption.png",
      caption: "유기견 상세에서 입양 신청과 보호소 채팅으로 이어지는 화면",
    },
    showcaseScreen: {
      src: "/images/projects/petner/screen-adoption-status-management.png",
      caption: "보호소가 등록한 유기견의 입양 절차 상태를 확인·변경하는 화면",
    },
    showcaseEyebrow: "담당 구현",
    showcaseTitle: "탐색 이후의 입양 흐름을 백엔드로 연결했다",
    showcasePoints: [
      {
        label: "유기견 정보와 입양 신청을 연결",
        detail: "상세 화면에서 선택한 유기견을 기준으로 신청이 생성되고, 보호소가 해당 요청을 이어서 처리할 수 있게 도메인을 구성했다.",
      },
      {
        label: "보호소 기준의 상태 관리",
        detail: "보호소가 자신이 등록한 유기견과 현재 입양 절차 상태를 한 화면에서 확인하고 변경할 수 있도록 API를 구현했다.",
      },
      {
        label: "문의가 필요한 순간에는 채팅으로 전환",
        detail: "유기견 상세에서 보호소와의 실시간 상담으로 진입하도록 입양 신청 흐름과 채팅 도메인을 연결했다.",
      },
    ],
    decisions: [
      {
        title: "로그인된 사용자라는 사실을 WebSocket 경계에서도 잃지 않아야 했다",
        problem:
          "REST 요청은 HTTP 세션으로 로그인 사용자를 식별하지만, WebSocket은 연결 이후 STOMP 메시지를 별도로 처리한다. 연결만 허용하고 메시지 단계의 사용자 식별을 놓치면 채팅방 권한과 발신자를 신뢰할 수 없었다.",
        considerations: [
          "연결 직후의 인증 정보만 믿으면 이후 구독·발행 단계에서 동일 사용자인지 보장할 수 없음",
          "메시지 본문에 사용자 식별자를 맡기면 클라이언트 값 위변조를 막을 수 없음",
        ],
        diagram: {
          src: "/images/projects/petner/diagram-websocket-auth.svg",
        },
        solution: [
          {
            label: "핸드셰이크에서 Redis 세션을 직접 조회",
            detail: "HTTP 세션에 있는 로그인 사용자 정보를 확인한 뒤, 검증된 식별자만 WebSocket 세션 속성에 주입했다.",
          },
          {
            label: "STOMP 처리 전 구간에 같은 컨텍스트를 사용",
            detail: "연결·구독·발행이 모두 세션 속성의 사용자 정보를 기준으로 동작하게 하고, 단일 HTML 테스트 페이지로 각 단계를 재현했다.",
          },
        ],
        outcome:
          "HTTP 로그인 사용자와 STOMP 메시지 발신자를 같은 세션 컨텍스트로 연결했다. 채팅방의 권한 확인과 발신자 식별을 클라이언트 입력이 아닌 서버가 검증한 세션 정보에 맡겼다.",
      },
      {
        title: "채팅방에서 나가도 대화 이력까지 사라지면 안 됐다",
        problem:
          "채팅방 나가기를 Hard Delete로 처리하면 메시지와의 FK 제약이 깨지고, 다시 입장했을 때 이전 입양 상담 이력을 이어 볼 수 없었다. 화면에서 사라지는 것과 데이터를 없애는 일은 다른 문제였다.",
        considerations: [
          "참여 레코드를 물리 삭제하면 연관 메시지의 무결성과 상담 이력을 함께 잃음",
          "채팅방 목록에서 숨겨도 재입장 시 과거 메시지를 조회할 수 있어야 함",
        ],
        solution: [
          {
            label: "삭제를 참여 상태의 비활성화로 재정의",
            detail: "채팅방을 나간 사용자의 참여 레코드를 지우지 않고 Soft Delete 상태로 전환해, 메시지 관계는 그대로 보존했다.",
          },
          {
            label: "목록과 이력을 서로 다른 기준으로 조회",
            detail: "채팅방 목록은 활성 참여자만 보이도록 필터링하고, 재입장 시에는 보존된 메시지를 페이징 조회하도록 분리했다.",
          },
        ],
        outcome:
          "사용자는 채팅방을 떠난 것처럼 보이지만, 입양 상담 이력과 FK 무결성은 유지된다. 재입장 뒤에도 이전 메시지를 자연스럽게 이어 볼 수 있는 구조가 됐다.",
        image: {
          src: "/images/projects/petner/screen-adoption-requests.png",
          caption: "진행 상태와 함께 유지되는 사용자·보호소의 입양 신청 내역",
        },
      },
    ],
    screens: [],
    result: "명지대학교 VIBE CODING 실전활용 경진대회 장려상",
  },
  {
    id: "dongari-moa",
    icon: "📎",
    title: "동아리모아",
    oneLiner: "동아리 탐색·지원·운영·권한 위임을 한 서비스에서 다룬 팀 백엔드 프로젝트",
    meta: "2025.01 ~ 2025.03 · 팀 프로젝트",
    scope: "핵심 도메인 설계 · 인증 방식 선택 · 동아리별 RBAC · 지원·승인 흐름 구현",
    status: { label: "완성", color: "gray" },
    badges: ["Redis 세션 인증", "리소스 단위 RBAC"],
    links: [],
    stack: ["Java", "Spring Boot", "Spring Security", "JPA", "MySQL", "Redis", "JWT"],
    why: [],
    decisions: [
      {
        title: "JWT 대신 Redis 세션을 선택한 이유",
        problem:
          "동아리 강제 탈퇴·계정 정지처럼 즉시 통제가 필요한 시나리오에서 JWT는 만료 전까지 토큰이 유효하다는 한계가 있었다.",
        solution: [
          {
            label: "Redis 세션 채택",
            detail: "서버에서 즉시 무효화 가능, 운영 요구사항에 맞는 인증 방식",
          },
        ],
      },
      {
        title: "전역 RBAC가 아닌 동아리 리소스 단위 권한 설계",
        problem:
          "단순 ADMIN/USER 역할로는 \"특정 동아리의 회장만 권한을 위임할 수 있다\"는 요구사항을 표현할 수 없었다.",
        solution: [
          {
            label: "리소스 단위 RBAC 설계",
            detail: "사용자·동아리·역할을 묶어 동아리별 독립 권한 체계 구현",
          },
        ],
      },
    ],
    screens: [],
    result: "2025.01 ~ 2025.03 완성",
  },
  {
    id: "nosogong",
    icon: "📎",
    title: "노소공",
    oneLiner:
      "행동 데이터로 펫 감정을 예측하고 미니게임 보상·성장 흐름을 연결한 ML 기반 동물 육성 게임",
    meta: "2025.03 ~ 2025.10 · 팀 프로젝트",
    scope: "백엔드 도메인 ERD · 감정 예측 모델 · 게임 결과 검증 흐름",
    status: { label: "완성", color: "purple" },
    badges: ["XGBoost 감정 예측", "합성 데이터 Cold Start"],
    links: [],
    stack: ["Python", "FastAPI", "XGBoost", "React", "PostgreSQL", "Docker"],
    why: [],
    decisions: [
      {
        title: "Cold Start: 실 데이터 없이 감정 예측 모델을 시작해야 했다",
        problem: "서비스 초기에는 실제 사용자 행동 로그가 없어 모델 학습이 불가능했다.",
        solution: [
          {
            label: "합성 데이터 10,000건 생성",
            detail: "행동 패턴 규칙 정의 후 XGBoost 모델 학습",
          },
          {
            label: "R² 0.9964 · RMSE 0.22",
            detail: "테스트셋 기준, 합성 데이터 기준 수치임을 명시",
          },
        ],
      },
      {
        title: "Pygame 코드를 React 웹 환경으로 전환한 전략",
        problem: "초기 미니게임을 Pygame으로 구현했지만 웹 서비스와의 통합이 불가능했다.",
        solution: [
          {
            label: "Pygame → React 재구현",
            detail: "게임 로직·상태·이벤트를 컴포넌트 구조로 전환",
          },
        ],
      },
    ],
    screens: [],
    result: "2025.03 ~ 2025.10 완성",
  },
];
