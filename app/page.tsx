import EmojiGrid from '../components/EmojiGrid';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Emoji Gallery</h1>
      <EmojiGrid />
    </div>
  );
}
