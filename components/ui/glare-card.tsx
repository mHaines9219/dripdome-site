import { cn } from "@/lib/utils";

/**
 * Neobrutalist card (formerly a 3D glare/foil card).
 * Ink surface, thick paper border, hard accent offset shadow, and the house
 * translate-on-hover / press-down-on-active mechanic. No gradients, no blur.
 * The component API (children + className) is unchanged.
 */
export const GlareCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="w-full max-w-[160px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[340px] xl:max-w-[400px] [aspect-ratio:17/21] overflow-hidden border-[3px] border-[#F3EDE2] bg-[#111111] shadow-[8px_8px_0_0_#C0C0C0] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[10px_10px_0_0_#C0C0C0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
      <div className={cn("h-full w-full bg-[#111111]", className)}>
        {children}
      </div>
    </div>
  );
};
