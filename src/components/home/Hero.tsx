import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-center text-white">
      {/* Background Image */}
      <Image
        src="/images/home/pizza-veggie.jpg" // Ganti dengan gambar hero yang sesuai
        alt="Delicious pizza on a table"
  fill
  style={{ objectFit: 'cover' }}
        quality={85}
        className="-z-10"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          The Best Pizza in Town
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
          Crafted with passion, baked to perfection. Experience a slice of heaven with our fresh, handcrafted pizzas.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-block bg-red-600 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-red-700 transition-transform hover:scale-105"
        >
          Order Now
        </Link>
      </div>
    </section>
  );
}
