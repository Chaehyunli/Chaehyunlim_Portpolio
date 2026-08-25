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
      src: "/images/projects/modu-yaksok/screen-landing.png",
      caption: "실제 배포된 랜딩 페이지 — 낙서하듯 적으면 일정이 나온다",
    },
    heroScreen: {
      src: "/images/projects/modu-yaksok/screen-schedule-candidates.png",
      caption: "일정 후보 3개 제시",
    },
    decisions: [
      {
        title: "내 서버가 사용자 키를 볼 수 있다는 것 자체가 문제였다",
        problem:
          "LLM 호출 비용을 운영자가 부담하지 않게 하려고 사용자가 직접 API 키를 등록하는 BYOK 구조를 선택했다. 처음엔 Fernet 대칭키로 암호화해 DB에 저장했는데, 마스터키를 가진 서버는 모든 사용자의 키를 복호화할 수 있어 DB 유출뿐 아니라 운영자가 직접 열람하는 것도 막을 수 없는 구조였다.",
        solution: [
          {
            label: "PBKDF2-SHA256 600,000회 반복 · AES-GCM 256bit 클라이언트 암호화",
            detail: "서버에는 암호문·salt·iv만 전송",
          },
          {
            label: "provider 호출 시점에만 평문 사용",
            detail: "DB·캐시 어디에도 평문 미저장",
          },
          {
            label: "패스프레이즈 분실 시 복구 불가",
            detail: "서버가 대신 복호화할 방법 없음 — 의도된 트레이드오프",
          },
        ],
        image: {
          src: "/images/projects/modu-yaksok/screen-api-key-passphrase.png",
          caption: "패스프레이즈 입력 — 서버에는 저장되지 않는다",
        },
      },
      {
        title: "LLM이 해야 할 일과 코드가 해야 할 일을 나눴다",
        problem:
          "프롬프트에 \"같은 태그는 후보당 최대 1곳\", \"점심·저녁 시간대면 식사 장소를 넣어라\" 같은 지시를 명시해도 지켜지지 않았다. \"와플\" 같은 강한 선호 태그를 넣으면 디저트·카페만으로 하루가 채워져 식사가 아예 없는 일정, 여러 지역을 입력했을 때 서로 멀리 떨어진 지역끼리 섞이는 일정이 반복됐다.",
        solution: [
          {
            label: "결정론적 조건(시간·예산·거리·식사슬롯·태그중복)",
            detail: "규칙 기반 하드 필터로 코드 처리",
          },
          {
            label: "의미적 판단만 LLM에 위임",
            detail: "살아남은 후보에 1회 호출",
          },
          {
            label: "Step별 DeepEval 골든 데이터셋 회귀 테스트",
            detail: "프롬프트·모델 변경 시 품질 저하 수치로 확인",
          },
        ],
      },
      {
        title: "외부 API 호출량을 제어하되 서비스는 멈추지 않게",
        problem:
          "네이버 지역검색과 ODsay는 초당·일일 호출 한도가 있다. 장소 풀을 모으려면 카테고리 16종 × 태그만큼 팬아웃해야 해서, 한 번의 일정 생성이 수십 번의 호출로 번진다.",
        solution: [
          {
            label: "토큰버킷(초당) + Redis 카운터·자정 TTL(일일)",
            detail: "여러 워커에서도 전역 집계 일치",
          },
          {
            label: "예산 부족 시 요청 차단 대신 부분 검색",
            detail: "카테고리 쿼리 우선 생존",
          },
          {
            label: "ODsay 700m 이내 구간 사전 필터링",
            detail: "호출 자체를 생략",
          },
        ],
      },
    ],
    screens: [
      {
        src: "/images/projects/modu-yaksok/screen-preference-conflict.png",
        caption: "조건 입력 — 선호 충돌은 미리 짚어준다",
      },
      {
        src: "/images/projects/modu-yaksok/screen-route-map.png",
        caption: "지도·경로 상세 — 실제 이동 경로로 동선을 검증한다",
      },
    ],
    result: "배포 운영 중 · https://moduyaksok.vercel.app",
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
    decisions: [
      {
        title: "요청 분류 단계를 파이프라인 진입 전에 설계해 넣었다",
        problem:
          "사용자 요청이 애매할 때 의도와 다른 동작으로 흘러 엉뚱한 예약·수정이 실행되는 문제가 있었다.",
        solution: [
          {
            label: "chat·itinerary·reservation·change·cancel 5종 분류",
            detail: "파이프라인 진입 전 요청 타입부터 확정",
          },
          {
            label: "분류 미확정 시 확인 단계로 분기",
            detail: "확정 전에는 실행하지 않음",
          },
          {
            label: "구간별 골든 데이터셋 테스트",
            detail: "결과가 엉뚱할 때 요청 해석 단계 문제로 특정 가능",
          },
        ],
      },
    ],
    cardImage: {
      src: "/images/projects/masil/card-hero.png",
      caption: "AI 채팅부터 예약·일정 관리까지",
    },
    screens: [
      {
        src: "/images/projects/masil/screen-chat-itinerary.png",
        caption: "AI 일정·예약 후보 제안",
      },
      {
        src: "/images/projects/masil/screen-reservation-status.png",
        caption: "예약 상태",
      },
      {
        src: "/images/projects/masil/screen-day-detail.png",
        caption: "Day별 일정 상세",
      },
      {
        src: "/images/projects/masil/screen-day-progress.png",
        caption: "당일 진행",
      },
    ],
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
    diagramSrc: "/images/projects/searchive/diagram-pipeline.svg",
    decisions: [
      {
        title: "계산과 통신이 함께 N배로 늘어나는 구조를 배치 검색으로 풀었다",
        problem:
          "태그 후보 N개를 Elasticsearch에 개별 요청하면 각 요청이 KNN 연산을 수행해 연산과 통신이 동시에 N배로 늘었다.",
        solution: [
          {
            label: "Elasticsearch _msearch 배치 요청",
            detail: "N개 KNN 벡터 쿼리를 요청 1회로 묶음",
          },
          {
            label: "순차·배치 처리 구간 분리 측정",
            detail: "병목 원인을 구간별로 특정 가능",
          },
          {
            label: "키워드 5개 기준 5회→1회, 250ms→10ms",
            detail: "네트워크 왕복·지연 동시 감소",
          },
        ],
      },
      {
        title: "AI가 뽑은 후보를 그대로 저장하지 않고 과추출+필터+대표 태그 수렴으로 정제했다",
        problem:
          "추출기가 넘긴 키워드에 불용어·숫자·한 글자짜리가 섞이고, 표기가 다른 같은 의미의 태그가 별개로 생성됐다.",
        solution: [
          {
            label: "목표 개수의 3배 과추출",
            detail: "품질 필터+표기 정규화·중복 제거 후 상위 3개 선택",
          },
          {
            label: "이름 완전 일치 → 벡터 유사도 0.8 이상 순 매칭",
            detail: "기존 태그 우선 재사용, 없을 때만 신규 생성",
          },
        ],
      },
    ],
    screens: [
      {
        src: "/images/projects/searchive/screen-tagging-result.png",
        caption: "문서 업로드·자동 태깅 결과",
      },
      {
        src: "/images/projects/searchive/screen-rag-qna.png",
        caption: "RAG 질의응답",
      },
    ],
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
        label: "탐색부터 입양까지 단절된 플랫폼",
        detail: "보호소 실시간 문의까지 한 서비스로 연결 필요",
      },
      {
        label: "채팅·도메인 핵심 로직 담당",
        detail: "실시간 프로토콜과 데이터 생명주기 설계 직접 수행",
      },
    ],
    decisions: [
      {
        title: "HTTP 세션을 WebSocket 경계 너머까지 이어야 했다",
        problem:
          "REST와 WebSocket은 프로토콜 경계가 달라, HTTP 세션으로 관리되는 로그인 사용자를 WebSocket 핸드셰이크와 STOMP 메시지 처리 단계까지 일관되게 식별해야 했다.",
        solution: [
          {
            label: "핸드셰이크 시점 Redis 세션 조회",
            detail: "WebSocket 세션 속성에 주입해 연결부터 메시지 처리까지 동일 컨텍스트 유지",
          },
          {
            label: "단일 HTML 테스트 페이지로 검증",
            detail: "연결·구독·발행을 단계별로 직접 재현",
          },
        ],
      },
      {
        title: "\"나가기\"는 화면에서 사라지는 것과 데이터를 없애는 것을 분리해야 했다",
        problem:
          "Hard Delete로 채팅방 나가기를 처리하면 연관 메시지와의 FK 제약 오류와 이력 유실이 발생했다.",
        solution: [
          {
            label: "Soft Delete 전환",
            detail: "삭제를 사용자 관점의 비활성화로 재정의, 조회 시 활성 상태 기준 필터링",
          },
          {
            label: "FK 무결성 + 채팅 이력 보존",
            detail: "재입장 시 이전 메시지 페이징 조회도 자연스럽게 이어짐",
          },
        ],
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
