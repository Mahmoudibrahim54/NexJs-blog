"use client";
import { Locale } from "@/types/dictionary";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const PostsListPagination = ({
  locale,
  totalRecordsNum,
}: {
  totalRecordsNum: number;
  locale: Locale;
}) => {
  const { lang, langDir } = locale;

  const paginationButtons = Array(10).fill(0);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // const page = parseInt(pageNum);
  //   const pageSize = 10;

  const handlePageChange = (pageNumber: number | string) => {
    router.push(`${pathname}?page=${pageNumber}`);
    router.refresh();
  };

  return (
    <div className="flex w-full items-center justify-center gap-5 bg-white py-7 md:gap-10">
      {langDir === "rtl" ? (
        <Link href={"/"}>
          <KeyboardArrowRightIcon
            fontSize="large"
            sx={{ color: "var(--secondary-color)" }}
            className="hover:text-primary-color"
          />
        </Link>
      ) : (
        <Link href={"/"}>
          <KeyboardArrowLeftIcon
            fontSize="large"
            sx={{ color: "var(--secondary-color)" }}
            className="hover:text-primary-color"
          />
        </Link>
      )}
      <div className="flex gap-3">
        <div className="md:gap:10 flex gap-5">
          {paginationButtons.map((_, i) => (
            <Link
              key={i}
              href={"/"}
              className={` ${
                i > 2 && "hidden md:flex"
              }  hover:bg-link-color flex h-7 w-7 items-center justify-center rounded-full bg-secondary-color font-bold text-neutral-300 hover:text-primary-color`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
        {
          <Link href={"/"} className="font-bold text-secondary-color">
            {"..."}
          </Link>
        }
      </div>
      {langDir === "rtl" ? (
        <Link href={"/"}>
          <KeyboardArrowLeftIcon
            fontSize="large"
            sx={{ color: "var(--secondary-color)" }}
            className="hover:text-primary-color"
          />
        </Link>
      ) : (
        <Link href={"/"}>
          <KeyboardArrowRightIcon
            fontSize="large"
            sx={{ color: "var(--secondary-color)" }}
            className="hover:text-primary-color"
          />
        </Link>
      )}
    </div>
  );
};

export default PostsListPagination;
