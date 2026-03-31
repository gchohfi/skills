'use client';

interface StreamingTextProps {
  text: string;
  isLoading: boolean;
}

export default function StreamingText({ text, isLoading }: StreamingTextProps) {
  return (
    <div className="whitespace-pre-wrap">
      {text}
      {isLoading && (
        <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-[#4ecdc4]" />
      )}
    </div>
  );
}
