'use client';

interface StreamingTextProps {
  text: string;
  isLoading: boolean;
}

export default function StreamingText({ text, isLoading }: StreamingTextProps) {
  return (
    <span className="whitespace-pre-wrap">
      {text}
      {isLoading && (
        <span className="inline-block w-0.5 h-4 bg-gray-700 ml-0.5 align-text-bottom animate-pulse" />
      )}
    </span>
  );
}
