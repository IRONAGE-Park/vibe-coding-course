/** 테마를 저장하는 쿠키 이름. 서버(layout)와 클라이언트(ThemeToggle)가 함께 씁니다. */
export const THEME_COOKIE = "theme";

export type Theme = "light" | "dark";

/** 1년. 강의가 끝나도 다음에 왔을 때 고른 테마가 유지됩니다. */
export const THEME_MAX_AGE = 60 * 60 * 24 * 365;
