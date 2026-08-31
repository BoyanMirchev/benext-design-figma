import { Header, RecommendationPanel, Footer } from "@/components/site";
import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Регистрация | BeNeXt", description: "Създайте своя NeXT акаунт." };

export default function RegisterPage() {
  return (
    <main>
      <Header />
      <AuthForm mode="register" />
      <RecommendationPanel />
      <Footer />
    </main>
  );
}
