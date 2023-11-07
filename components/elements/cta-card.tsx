import { client } from "@/utils/directus";
import { revalidateTag } from "next/cache";
import Image from "next/image";

export default async function CTACard() {
  const formAction = async (formData: FormData) => {
    "use server";

    try {
      const email = formData.get("email");
      await client.items("subscribers").createOne({
        email,
      });
      revalidateTag("subscribers-count");
    } catch (error) {
      console.log(error);
      throw new Error("Error singing up");
    }
  };

  const subscribersCount = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}items/subscribers?meta=total_count&access_token=${process.env.ADMIN_TOKEN}`,
    { next: { tags: ["subscribers-count"] } },
  )
    .then((res) => res.json())
    .then((res) => res.meta.total_count)
    .catch((e) => {
      console.log(e);
    });

  return (
    <div className="relative my-7 overflow-hidden rounded-md bg-slate-100 px-6 py-10">
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />
      {/* Image */}
      <Image
        className="object-cover object-center"
        alt="CTA Card Image"
        fill
        src="https://images.unsplash.com/photo-1448906654166-444d494666b3?ixid=MnwzODU2NTF8MHwxfHNlYXJjaHwyNXx8bG9uZG9ufGVufDB8fHx8MTY3MDI3MzM3Ng&ixlib=rb-4.0.3"
      />
      {/* Content Container */}
      <div className="relative z-20">
        <div className="font-lg font-medium">#اعرف_دينك</div>
        <h3 className="mt-3 text-4xl font-semibold">اعرف دينك</h3>
        <p className="mt-2 max-w-sm text-lg">
          اعرف دينك - استقبل ايميل اسبوعي من فتاوى الشيخ أسامة عبد العظيم
        </p>
        {/* form */}
        <form
          key={subscribersCount + "subscribers-form"}
          action={formAction}
          className="mt-6 flex w-full items-center gap-2 "
        >
          <input
            type="email"
            name="email"
            className="w-full rounded-md bg-white/80 px-3 py-2 text-base outline-none placeholder:text-sm focus:ring md:w-auto"
            placeholder="ادخل بريدك الالكتروني"
          />
          <button className="whitespace-nowrap rounded-md bg-neutral-900 px-3 py-2 text-neutral-200">
            سجل الآن
          </button>
        </form>
        {/* subscribers */}
        <div className="mt-5 text-neutral-700">
          عدد المشتركين :
          <span className="mx-2 rounded-md bg-neutral-700 px-2 py-1 text-sm text-neutral-100">
            {subscribersCount}
          </span>
          حتى الآن
        </div>
      </div>
    </div>
  );
}
