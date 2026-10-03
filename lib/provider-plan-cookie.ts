/** Client-only cookie for plans → provider page handoff. Never read via next/headers. */

export const CLICKED_PLAN_COOKIE = "esimzo_clicked_plan";
export const CLICKED_PLAN_MAX_AGE_SEC = 60 * 10; // 10 minutes

export type ClickedPlanCookie = {
  planId: string;
  providerSlug: string;
  destinationSlug: string;
};

function isClickedPlanCookie(value: unknown): value is ClickedPlanCookie {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.planId === "string" &&
    typeof v.providerSlug === "string" &&
    typeof v.destinationSlug === "string"
  );
}

export function setClickedPlanCookie(data: ClickedPlanCookie): void {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(data));
  document.cookie = `${CLICKED_PLAN_COOKIE}=${value}; path=/; max-age=${CLICKED_PLAN_MAX_AGE_SEC}; SameSite=Lax`;
}

export function readClickedPlanCookie(): ClickedPlanCookie | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CLICKED_PLAN_COOKIE}=`));
  if (!match) return null;

  try {
    const raw = decodeURIComponent(match.slice(CLICKED_PLAN_COOKIE.length + 1));
    const parsed: unknown = JSON.parse(raw);
    return isClickedPlanCookie(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function clearClickedPlanCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${CLICKED_PLAN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
