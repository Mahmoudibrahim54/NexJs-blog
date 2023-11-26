import { Locale, getDictionary } from "@/lib/dictionary";
import TitleBg from "../layout/title-bg";
import styles from "@/app/[lang]/styles/islamic-icon.module.css";

const SideNav = async ({ locale }: { locale: Locale }) => {
  const dictionary = await getDictionary(locale as Locale);

  return (
    <div className="my-9 me-10 hidden h-[1000px] w-[400px] lg:block">
      <div
        className={`"text-md border-fourth-color mb-2 flex h-10  w-auto  flex-col items-start justify-center border-b-2`}
      >
        <TitleBg
          tw={{
            bg: "rounded-t-md h-10 w-auto",
            overlay: "rounded-t-md w-64 h-10 w-auto",
          }}
        >
          <div className=" flex h-10  flex-row items-center gap-5 rounded-t-md px-5 text-neutral-100">
            <div
              className={`${styles.islamicIcon}`}
              style={{
                ["--icon-dim" as any]: "15px",
                ["--icon-color" as any]: "var(--secondary-color)",
              }}
            />
            <div className="text-md font-reem-kufi font-semibold">
              {dictionary.mainPage.sideNav}
            </div>
          </div>
        </TitleBg>
      </div>
      <div className="h-[900px] rounded-b-md bg-white font-noto-kufi shadow-md"></div>
    </div>
  );
};

export default SideNav;
