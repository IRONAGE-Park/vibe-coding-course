import type { RailItem } from "@/app/components/StepRail";

/**
 * 참가자가 지금 화면에서 보고 있는 영역.
 * 오른쪽 단계 레일(StepRail)이 스크롤을 따라 계산한 값을 여기에 올려두고,
 * 문의 창이 그 값을 읽어 "어디를 보면서 묻는지" 를 함께 보냅니다.
 * 레일이 없는 페이지(홈 · 막혔을 때)에서는 null 입니다.
 */
let current: RailItem | null = null;
const listeners = new Set<() => void>();

export function setViewing(item: RailItem | null) {
  if (current?.id === item?.id) return;
  current = item;
  listeners.forEach((listener) => listener());
}

/** useSyncExternalStore 용 구독 */
export function subscribeViewing(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function viewingSnapshot(): RailItem | null {
  return current;
}

export const viewingServerSnapshot = (): RailItem | null => null;
