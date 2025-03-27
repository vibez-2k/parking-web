import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useTranslations } from "next-intl";

const ContinueToDashboardButton = ({ dark }: { dark?: boolean }) => {
     const t = useTranslations('heroDetails');
 
    return (
    <Link href="/dashboard">
      <button
        type="button"
        className={clsx(
          "flex items-center justify-center min-w-[205px] mt-3 px-6 h-14 rounded-full w-full sm:w-fit transition-all",
          {
            "text-white bg-foreground hover:bg-opacity-80": dark,
            "text-foreground bg-white hover:bg-gray-100": !dark,
          }
        )}
      >
        <span className="font-semibold text-lg">{t('button1')}</span>
        <HiOutlineArrowRight className="ml-2 w-6 h-6" />
      </button>
    </Link>
  );
};

export default ContinueToDashboardButton;
