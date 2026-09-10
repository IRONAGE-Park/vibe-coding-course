/* 아이템 발전 사이클 — 문제 이해 → 해결책 정의 → 작게 검증 → 크게 검증.
   2장과 4장이 같은 지도를 보고, 지금 어디에 있는지만 다르게 표시합니다.
   근거: docs/research/D-레퍼런스-창업초기.md */
const STAGES = [
  {
    ch: "2장",
    k: "문제 이해",
    q: "누가, 무엇 때문에, 얼마나 불편한가",
    how: "관찰 · 문제 인터뷰",
    done: "10명 이상 만나 첫 고객의 모습 · 꼭 필요한 문제 1개 · 지금의 대안이 잡혔다",
  },
  {
    ch: "2장",
    k: "해결책 정의",
    q: "가장 작은 해결책과 가격은 무엇인가",
    how: "소개 페이지 · 데모 · 목업 · 가격 제시",
    done: "꼭 필요한 기능 목록과 받을 가격이 나왔고, 계산이 맞는다",
  },
  {
    ch: "3·4장",
    k: "작게 검증",
    q: "아는 첫 고객이 실제로 쓰고, 돈을 내는가",
    how: "만든 앱을 직접 보여주며 관찰",
    done: "직접 고른 첫 고객 대부분(80%)이 처음부터 끝까지 막힘없이 쓴다",
  },
  {
    ch: "4장 이후",
    k: "크게 검증",
    q: "모르는 사람도 계속 쓰는가",
    how: "행동 기록 · 주별로 묶어 보기 · 실망 설문",
    done: "계속 쓰는 사람이 40% 안팎으로 유지된다",
  },
];

export default function StageCycle({ current }: { current: number[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      {STAGES.map((s, i) => {
        const on = current.includes(i);
        return (
          <div
            key={s.k}
            className={`flex flex-col rounded-[16px] border p-5 ${
              on
                ? "border-[var(--s2-blue)] bg-[var(--s2-blue-soft)]"
                : "border-[var(--s2-line)] bg-[var(--s2-tint)]"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[12px] text-[var(--s2-blue)]">
                {String(i + 1).padStart(2, "0")} · {s.ch}
              </p>
              {on && (
                <span className="rounded-full bg-[var(--s2-blue)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--s2-on-blue)]">
                  지금 여기
                </span>
              )}
            </div>
            <p className="mt-1 text-[15.5px] font-extrabold">{s.k}</p>
            <p className="mt-1.5 text-[13.5px] leading-[1.55] text-[var(--s2-strong)]">
              {s.q}
            </p>
            <dl className="mt-3 flex flex-col gap-2 text-[12.5px] leading-[1.55]">
              <div>
                <dt className="font-mono text-[11px] text-[var(--s2-faint)]">
                  데이터를 얻는 방법
                </dt>
                <dd className="text-[var(--s2-body)]">{s.how}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] text-[var(--s2-faint)]">
                  다음으로 넘어가도 되는 기준
                </dt>
                <dd className="text-[var(--s2-body)]">{s.done}</dd>
              </div>
            </dl>
          </div>
        );
      })}
    </div>
  );
}
