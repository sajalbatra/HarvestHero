import Image from "next/image";

interface Props {
  title: string;
  description: string;
  img: string;
}

const Card = ({ title, description, img }: Props) => {
  return (
    <div
      className="flex flex-col gap-2 p-3 py-4 border rounded-xl"
      style={{
        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.00) 100%)",
        boxShadow: "-8px -8px 24px 0px rgba(0, 0, 0, 0.25) inset, 4px 4px 24px 0px rgba(255, 255, 255, 0.20) inset",  
      }}
    >
        <Image src={img} alt={img}  />

      <p className="text-xl">{title}</p>
      <p className="text-md">{description}</p>
    </div>
  );
};

export default Card;
