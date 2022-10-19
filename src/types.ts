export type LoadingState = "pristine" | "loading" | "loaded" | "error";

export type ShiftDirection = "left" | "right";

export interface Option {
  value: string | number;
  label: string;
}
