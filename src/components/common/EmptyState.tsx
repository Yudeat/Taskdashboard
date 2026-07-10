import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ 
  icon: Icon, title, description, action 
}: EmptyStateProps) 
{
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-4">
        <Icon className="h-6 w-6 text-zinc-400" />
      </div>
      <p className="font-medium text-zinc-700 dark:text-zinc-300">{title}</p>
      {description && <p className="text-sm text-zinc-500 max-w-xs">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
