import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface SummaryCardProps {
  title: string;
  value: number | string;
}

export function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}