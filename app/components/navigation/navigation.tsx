import Link from "next/link";
import { PaddingContainer } from "../layout/padding-container";
import { Video, ScrollText, BookOpen } from "lucide-react";

const Navigation = () => {
  return (
    <div className="border-b sticky top-0 left-0 right-0 bg-blue-950 backdrop-blur-md w-screen">
      <PaddingContainer>
        <div className="py-5 flex-col text-white">
          <h1>موقع الشيخ</h1>
          <Link href="/" className="text-lg font-bold text-white">
            اسامة عبد العظيم
          </Link>
        </div>
      </PaddingContainer>

      <div className="py-3 border-t  bg-white">
        <nav>
          <ul className="flex items-center justify-between text-neutral-600 px-8">
            <li>
              <Link href="/cities">
                <div className="flex flex-col items-center justify-center">
                  <div className=" bg-white shadow-md rounded-full mx-7 my-3 px-2">
                    {" "}
                    <Video size="35" />
                  </div>

                  <div>فتاوى مرئية ومسموعة</div>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/experiences">
                {" "}
                <div className="flex flex-col items-center justify-center">
                  <div className=" bg-white shadow-md rounded-full px-2 my-3">
                    {" "}
                    <ScrollText size="35" />{" "}
                  </div>
                  <div>الفتاوى والمقالات</div>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/experiences">
                {" "}
                <div className="flex-col flex items-center justify-center">
                  <div className=" bg-white shadow-md rounded-full  my-3 px-2 mr-5">
                    {" "}
                    <BookOpen size="30" />{" "}
                  </div>
                  <div className="pr-5 w-20 flex items-center justify-center">
                    الكتب
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
