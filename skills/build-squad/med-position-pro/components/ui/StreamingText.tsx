'use client';

export default function StreamingText({ text, isLoading }: { text: string; isLoading: boolean }) {
  return (
    <div className="whitespace-pre-wrap">
      {text}
      {isLoading && <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-[#e2c799]" />}
    </div>
  );
}
