interface StrategyCardProps {
  canal: string;
  descricao: string;
  icone: string;
}

export default function StrategyCard({ canal, descricao, icone }: StrategyCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0fafa] text-xl">
        {icone}
      </span>
      <div>
        <h3 className="text-sm font-semibold text-gray-800">{canal}</h3>
        <p className="mt-1 text-sm leading-relaxed text-gray-500">{descricao}</p>
      </div>
    </div>
  );
}
