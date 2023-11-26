import { DictionarySchema } from "@/types/dictionary";
import { client } from "@/lib/directus";
import { Locale, getDictionary } from "@/lib/dictionary";
import { revalidateTag } from "next/cache";
import Image from "next/image";

export default async function CTACard({ locale = "ar" }: { locale?: Locale }) {
  const dictionary: DictionarySchema = await getDictionary(locale);

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
    .catch((error) => {
      console.log(error);
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
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${dictionary.ctaCard.image}`}
      />
      {/* Content Container */}
      <div className="relative z-20">
        <div className="font-lg font-medium">#{dictionary.ctaCard.title}</div>
        <h3 className="mt-3 text-4xl font-semibold">
          {dictionary.ctaCard.title}
        </h3>
        <p className="mt-2 max-w-sm text-lg">
          {dictionary.ctaCard.description}
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
            placeholder={dictionary.ctaCard.placeholder}
          />
          <button className="whitespace-nowrap rounded-md bg-primary-color px-3 py-2 font-semibold text-neutral-200">
            {dictionary.ctaCard.button}
          </button>
        </form>
        {/* subscribers */}
        <div className="mt-5 text-neutral-700">
          {dictionary.ctaCard.subscriberTagTextOne}{" "}
          <span className="mx-2 rounded-md bg-primary-color px-2 py-1 text-sm font-semibold text-neutral-200">
            {subscribersCount}
          </span>
          {dictionary.ctaCard.subscriberTagTextTwo}{" "}
        </div>
      </div>
    </div>
  );
}
