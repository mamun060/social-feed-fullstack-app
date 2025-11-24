import AuthGuard from "@/lib/AuthGuard";

export default function ProtectedLayout({ children }) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}