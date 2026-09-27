import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-[#18191e] bg-[#0a0a0c] text-gray-500 py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-[10px] sm:flex-row sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="FitLog home"
          className="flex items-center gap-1.5 font-bold tracking-wide text-gray-300 transition-colors hover:text-white"
        >
          <Image
            src="/assets/logo.png"
            alt=""
            width={12}
            height={12}
            className="object-contain"
          />
          <span>FITLOG</span>
        </Link>
        <p className="text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
