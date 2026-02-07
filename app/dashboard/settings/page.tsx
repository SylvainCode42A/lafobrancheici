import SettingsView from "@/app/dashboard/components/views/SettingsView";

export const metadata = {
  title: "Settings | Neural Config",
};

export default function SettingsPage() {
  return (
    <div className="w-full bg-transparent">
       <SettingsView />
    </div>
  );
}