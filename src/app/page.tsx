import Cards from "./../features/post/card/Card";

export default function Home() {
  return (
    <div className="container mx-auto px-1 py-8 mt-18 ">
      <h1 className="text-3xl font-bold mb-8 text-center">My Blog</h1>

      <Cards />
    </div>
  );
}
