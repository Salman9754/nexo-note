import AuthGuard from "@/components/AuthGuard";
import Home from "./Home";

export default function Page() {
  return (
    <AuthGuard>
      <Home />
    </AuthGuard>
  );
}
