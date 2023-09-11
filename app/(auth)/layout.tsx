import { ToasterProvider } from "@/providers/toast-provider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <ToasterProvider />
      {children}
    </div>
  );
}
