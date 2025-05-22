
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/UserAvatar";

type LeaderboardItem = {
  id: string;
  name: string;
  image?: string | null;
  points: number;
  rank: number;
};

interface LeaderboardCardProps {
  title: string;
  leaderboard: LeaderboardItem[];
}

export function LeaderboardCard({ title, leaderboard }: LeaderboardCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {leaderboard.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-4">
              <div className="font-medium w-4">
                {getRankIcon(item.rank)}
              </div>
              <UserAvatar user={{ name: item.name, image: item.image }} size="sm" />
              <div>
                <p className="text-sm font-medium leading-none">{item.name}</p>
              </div>
            </div>
            <div className="flex items-center bg-accent/80 text-accent-foreground px-2.5 py-0.5 rounded-full text-xs font-semibold">
              {item.points.toLocaleString()} pts
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function getRankIcon(rank: number): React.ReactNode {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return rank;
  }
}
