type EntryProps = {
  title: string;
  description: string;
  image: string;
  link: string;
};

export default function Entry({ title, description, image, link }: EntryProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <img src={image} alt={title} />
      <a href={link}>{link}</a>
    </div>
  );
}