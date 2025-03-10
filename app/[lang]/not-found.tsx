import styles from "@/app/[lang]/styles/islamic-icon.module.css";

const NotFound = () => {
  return (
    <div className="w-screen">
      <div className="absolute inset-0 z-10 w-screen bg-gradient-to-br from-black/100 via-black/50 to-black/0" />
      <div className="relative z-20 h-full">
        <div className="flex h-96 flex-col items-center justify-center">
          <div className="z-20 flex h-40 w-full items-center justify-center gap-8">
            <div
              className={`${styles.islamicIcon} z-30`}
              style={{
                ["--icon-dim" as any]: "30px",
              }}
            />
            <h3 className="z-30 w-full text-center text-2xl md:max-w-none md:text-4xl">
              حدث خطأ ما، الرجاء المحاولة لاحقا
            </h3>
            <div
              className={`${styles.islamicIcon} z-30 `}
              style={{
                ["--icon-dim" as any]: "30px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
