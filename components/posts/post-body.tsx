import parse from "html-react-parser";
import Image from "next/image";

const PostBody = ({ body }: { body: string }) => {
  const options = {
    replace: (domNode: any) => {
      if (domNode instanceof Element && domNode.attributes) {
        if (domNode.nodeName === "img") {
          const { src, alt, width, height } = domNode as HTMLImageElement;

          return (
            <Image
              className="width-full my-3 h-auto max-h-[300px] rounded-md object-cover object-center md:max-h-[500px]  "
              src={src}
              alt={alt}
              width={width}
              height={height}
            />
          );
        }
      }
    },
  };
  const getParsedHTML = (body: string) => {
    return parse(body);
  };

  return <div className="rich-text">{getParsedHTML(body)}</div>;
};

export default PostBody;
