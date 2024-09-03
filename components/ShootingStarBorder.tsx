export default function ShootingStarBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative grid overflow-hidden p-1 transition-colors duration-200 rounded-md">
      <span className="rounded-md">
        <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%] rounded-md" />
      </span>
      <span className="backdrop absolute inset-[1px] transition-colors duration-200 rounded-md" />
      {children}
    </div>
  );
}
