// Next imports
import Link from "next/link";

interface TextLinkDataProps {
  text: string;
  destination: string;
}

export function TextLink(textLinkProps: TextLinkDataProps) {
  return (
    <p className="px-8 text-center text-sm text-slate-400">
      <Link
        href={textLinkProps.destination}
        className="hover:text-brand underline underline-offset-4"
      >
        {textLinkProps.text}
      </Link>
    </p>
  );
}
