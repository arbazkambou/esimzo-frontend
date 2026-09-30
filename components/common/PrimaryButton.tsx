import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        <Icon
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      )}
    </>
  );

  if (variant === "link") {
    const { href } = rest as LinkVariant;
    return (
      <Button asChild size="lg" className={cn("group", className)}>
        <Link href={href}>{content}</Link>
      </Button>
    );
  }

  const { onClick, type = "button", disabled } = rest as ButtonVariant;
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      size="lg"
      className={cn("group", className)}
    >
      {content}
    </Button>
  );
}
