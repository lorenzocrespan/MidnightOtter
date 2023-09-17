// Next imports
import { Metadata } from "next";
// React components imports
import { Icons } from "@/components/baseComponents/icons";
import { BackButton } from "@/components/baseComponents/buttons/backButton";
import { TextLink } from "@/components/baseComponents/textLinks/textLink";
import { UserSignupForm } from "@/components/modalComponents/formsModal/authModal/userSignupForm";

// Update the metadata for the page.
export const metadata: Metadata = {
  title: "Pagina di registrazione",
  description: "Registrazione al sito mediante le credenziali.",
};

interface SignupDataProps {
  title: string;
  description: string;
}

export default function SignupScreen() {
  const signupProps: SignupDataProps = {
    title: "Welcome to Midnight Otter",
    description: "Enter your email to create an account.",
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <BackButton title="Homepage" destination="/" />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-80">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-10 w-10" />
          <h1 className="text-2xl font-semibold">{signupProps.title}</h1>
          <p className="text-sm text-slate-400">{signupProps.description}</p>
        </div>
        <UserSignupForm />
        <TextLink
          text="Already have an account? Sign In."
          destination="/signin"
        />
      </div>
    </div>
  );
}
