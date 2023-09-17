// Next imports
import { Metadata } from "next";
// React components imports
import { Icons } from "@/components/baseComponents/icons";
import { BackButton } from "@/components/baseComponents/buttons/backButton";
import { TextLink } from "@/components/baseComponents/textLinks/textLink";
import { UserSigninForm } from "@/components/modalComponents/formsModal/authModal/userSigninForm";

// Define metadata (title and description) for the page.
export const metadata: Metadata = {
  title: "Pagina di accesso",
  description: "Accesso al sito mediante le credenziali.",
};

interface SigninDataProps {
  title: string;
  description: string;
}

export default function Home() {
  const signinProps: SigninDataProps = {
    title: "Welcome to Midnight Otter",
    description: "Enter your email and password to sign in to your account.",
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <BackButton title="Homepage" destination="/" />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-80">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-10 w-10" />
          <h1 className="text-2xl font-semibold">{signinProps.title}</h1>
          <p className="text-sm text-slate-400">{signinProps.description}</p>
        </div>
        <UserSigninForm />
        <TextLink
          text="Don't have an account? Sign Up."
          destination="/signup"
        />
      </div>
    </div>
  );
}
