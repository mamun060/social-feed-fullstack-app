import GuestGuard from "@/lib/GuestGuard";
export default function AuthLayout({ children }) {
  return (
    <GuestGuard>
      {children}
    </GuestGuard>
  );
}