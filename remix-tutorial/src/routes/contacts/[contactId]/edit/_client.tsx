"use client";

export function BackButton(props: JSX.IntrinsicElements["button"]) {
  return <button {...props} onClick={() => window.history.back()} />;
}
