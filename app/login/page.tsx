import { Header, RecommendationPanel, Footer } from "@/components/site";
import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Вход | BeNeXt", description: "Влезте в своя NeXT акаунт." };

export default function LoginPage() {
  return (
    <main>
      <Header />
      <AuthForm mode="login" />
      <RecommendationPanel />
      <Footer />
    </main>
  );
}
