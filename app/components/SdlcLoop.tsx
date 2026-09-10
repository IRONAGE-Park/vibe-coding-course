/* AI 네이티브 SDLC — Anthropic 『The AI-Native SDLC Playbook』(2026-08)의 6단계 루프.
   단계마다 AI가 문서를 만들고 다음 단계가 그 문서를 읽습니다. 사람은 루프 위에서 시작·방향·승인을 맡습니다.
   홈과 2·3·4장이 같은 지도를 보고, 지금 어디에 있는지만 다르게 표시합니다. */
const STAGES = [
  {
    en: "Plan",
    k: "기획",
    doc: "intent.md",
    ch: "2장",
    what: "무엇을, 왜, 어떤 제약으로 만들지 — AI에게 인터뷰받으며 한 장으로",
    ours: "인터뷰 → docs/intent.md",
    human: "무엇을 왜 만들지 정하고 승인",
  },
  {
    en: "Design",
    k: "설계",
    doc: "spec.md",
    ch: "2장",
    what: "요구사항과 설계를 한 번에. 부딪히거나 불확실한 점은 따로 표시",
    ours: "docs/spec.md — 화면 · 기능 · 데이터 · 걱정되는 점 · 확인 방법",
    human: "명세가 intent와 맞는지 대조",
  },
  {
    en: "Build",
    k: "구현",
    doc: "구현 계획 → 코드",
    ch: "2·3장",
    what: "코드부터가 아니라 구현 계획부터. 계획을 승인한 뒤에 만든다",
    ours: "새 대화 · 계획 모드로 계획 확인 → 앱 초안",
    human: "계획을 읽고 승인",
  },
  {
    en: "Test",
    k: "검증",
    doc: "테스트 · 빌드 · 화면",
    ch: "3·4장",
    what: "AI가 스스로 확인하고 고친 결과만 사람에게 온다",
    ours: "/goal 완료 조건 · npm run build · 화면 확인",
    human: "‘끝났다’의 기준을 정함",
  },
  {
    en: "Deploy",
    k: "배포",
    doc: "리뷰된 변경",
    ch: "3·4장",
    what: "모든 변경에 같은 기준의 AI 리뷰, 되돌리기는 가장 익숙하게",
    ours: "/code-review → 커밋 · 푸시 → Vercel 자동 배포 · 되돌리기",
    human: "내보내도 되는지 결정",
  },
  {
    en: "Maintain",
    k: "운영",
    doc: "새 intent.md ↻",
    ch: "4장",
    what: "쓰면서 드러난 문제를 문서로 적어 다시 1단계로",
    ours: "배운 것 → docs/learning.md → intent.md 고치기",
    human: "다음에 고칠 것 하나를 고름",
  },
];

export default function SdlcLoop({ current = [] }: { current?: number[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {STAGES.map((s, i) => {
        const on = current.includes(i);
        return (
          <div
            key={s.en}
            className={`flex flex-col rounded-[16px] border p-5 ${
              on
                ? "border-[var(--s2-blue)] bg-[var(--s2-blue-soft)]"
                : "border-[var(--s2-line)] bg-[var(--s2-tint)]"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[12px] text-[var(--s2-blue)]">
                {String(i + 1).padStart(2, "0")} · {s.en} · {s.ch}
              </p>
              {on && (
                <span className="rounded-full bg-[var(--s2-blue)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--s2-on-blue)]">
                  지금 여기
                </span>
              )}
            </div>
            <p className="mt-1 text-[15.5px] font-extrabold">
              {s.k}{" "}
              <span className="font-mono text-[11.5px] font-normal text-[var(--s2-gray)]">
                {s.doc}
              </span>
            </p>
            <p className="mt-1.5 text-[13.5px] leading-[1.55] text-[var(--s2-strong)]">
              {s.what}
            </p>
            <dl className="mt-3 flex flex-col gap-2 text-[12.5px] leading-[1.55]">
              <div>
                <dt className="font-mono text-[11px] text-[var(--s2-faint)]">
                  이 강의에서
                </dt>
                <dd className="text-[var(--s2-body)]">{s.ours}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] text-[var(--s2-faint)]">
                  사람의 몫
                </dt>
                <dd className="text-[var(--s2-body)]">{s.human}</dd>
              </div>
            </dl>
          </div>
        );
      })}
    </div>
  );
}
