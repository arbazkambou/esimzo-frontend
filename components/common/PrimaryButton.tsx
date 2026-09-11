import Link from "next/link";
import { type LucideIcon } from "lucide-react";

type BaseProps = {
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
};

type ButtonVariant = BaseProps & {
  variant?: "button";
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type LinkVariant = BaseProps & {
  variant: "link";
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type Props = ButtonVariant | LinkVariant;

const baseStyles =
  "group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold items-center gap-2 rounded-full border border-border hover:bg-foreground px-6 py-2.5 text-sm font-semibold text-background! transition-all hover:border-background/40 bg-primary hover:text-background! active:scale-95 disabled:pointer-events-none disabled:opacity-50";

export default function PrimaryButton({
  children,
  icon: Icon,
  className = "",
  variant = "button",
  ...rest
}: Props) {
  const content = (
    <>
      {children}
      {Icon && (
        <Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (variant === "link") {
    const { href } = rest as LinkVariant;
    return (
      <Link href={href} className={`${baseStyles} ${className}`}>
        {content}
      </Link>
    );
  }

  const { onClick, type = "button", disabled } = rest as ButtonVariant;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${className}`}
    >
      {content}
    </button>
  );
}
