import styles from "@/app/[lang]/styles/islamic-icon.module.css";
import Link from "next/link";

const TitleElement = ({
  link,
  title,
  iconDim,
}: {
  link?: string;
  title: string;
  iconDim: string;
}) => {
  const Title = () => (
    <div className=" flex  h-full flex-row items-center gap-3 rounded-t-md px-3 py-1 font-reem-kufi text-neutral-100">
      <div
        className={`${styles.islamicIcon}`}
        style={{
          ["--icon-dim" as any]: iconDim,
          ["--icon-color" as any]: "var(--secondary-color)",
        }}
      />
      <div className="font-semibold">{title}</div>
    </div>
  );
  return (
    <div>
      {link && link != "" ? (
        <Link href={link}>{<Title />}</Link>
      ) : (
        <div>{<Title />}</div>
      )}
    </div>
  );
};

export default TitleElement;
