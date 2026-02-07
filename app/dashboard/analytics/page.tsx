import AnalyticsView from "@/app/dashboard/components/views/AnalyticsView";

export const metadata = {
  title: "Analytics | Neural System",
};

export default function AnalyticsPage() {
  return (
    <div className="bg-transparent">
      <AnalyticsView />
    </div>
  );
}