import { Award, Smile, Users, LucideIcon } from "lucide-react";

export interface StatItem {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

export const statsConfig: StatItem[] = [
  {
    icon: Award,
    value: 2,
    suffix: "+",
    label: "Years of Experience",
    color: "#f9f871",
  },
  {
    icon: Smile,
    value: 1200,
    suffix: "+",
    label: "Happy Community Members",
    color: "#f9f871",
  },
  {
    icon: Users,
    value: 90,
    suffix: "+",
    label: "Team Members",
    color: "#f9f871",
  },
];
