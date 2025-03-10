import parse, {
  HTMLReactParserOptions,
  Element as El,
} from "html-react-parser";
import Image from "next/image";

const PostBody = ({ body }: { body: string }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if ((domNode as El).attribs) {
        if ((domNode as El).name === "img") {
          const { src, alt } = (domNode as El).attribs;

          return (
            <Image
              className="width-full my-3 h-auto max-h-[300px] rounded-md object-cover object-center md:max-h-[500px]  "
              src={src}
              alt={alt}
              width={1280}
              height={620}
            />
          );
        }
      }
    },
  };

  const getParsedHTML = (body: string) => {
    return parse(body, options);
  };

  return <div className="rich-text  font-noto-kufi">{getParsedHTML(body)}</div>;
};

export default PostBody;
