interface ModuleHeaderProps {
  title: string;
  description?: string;
  icon?: string;
}

export default function ModuleHeader({ title, description, icon }: ModuleHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        {icon && (
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0fafa] text-xl">
            {icon}
          </span>
        )}
        <div>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">{title}</h1>
          {description && (
            <p className="mt-0.5 text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
