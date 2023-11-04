import { BookOpen, CassetteTape, ScrollText, User2, Video } from "lucide-react";
import Link from "next/link";
import globalIcon from "../../styles/islamic-icon.module.css";
import { links } from "../../json/nav-links";

const LargeScreenNav = () => {
  return (
    <nav className="hidden md:block">
      <ul className="flex items-center justify-around text-neutral-600 lg:mx-80">
        {links.map(({ id, link, title, icon }) => (
          <li key={id}>
            <Link href={link}>
              <div className=" flex flex-col items-center justify-center">
                <div
                  className={`${`${globalIcon.islamicIcon} my-3`} hidden md:block`}
                  style={{
                    ["--icon-dim" as any]: "40px",
                    ["--icon-color" as any]: "#3D4042",
                  }}
                ></div>

                <div className="absolute top-[21px]  hidden md:block">
                  {icon}{" "}
                </div>
                <div className="text-white">{title} </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LargeScreenNav;
