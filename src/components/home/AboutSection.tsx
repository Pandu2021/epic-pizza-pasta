import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/home/pasta-spag-chx-parmesan.jpg" // Ganti dengan gambar yang sesuai
              alt="Our restaurant's kitchen"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

          {/* Text Column */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our Story
            </h2>
            <p className="mt-4 text-gray-600">
              In the bustling heart of Nonthaburi, Epic Pizza & Pasta has carved a niche for those craving authentic Italian delights. This isn't just a restaurant; 
              it's a celebration of Italy's culinary heritage brought to life by a passionate family dedicated to flavor excellence. Across its tables, stories of Italy are retold with every savory bite, 
              inviting diners to partake in a shared love for delectable meals. The journey began with a vision to bring true Italian tastes to Thailand, one meticulously prepared dish at a time.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block text-red-600 font-bold hover:underline"
            >
              Learn More About Us &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
