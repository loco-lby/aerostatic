import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="container mx-auto px-5 flex flex-col min-h-screen">
      <Header />
      <div className="py-8 md:py-16 flex-grow">
        <p className="text-lg md:text-xl mb-8">
          To preserve the ancient art of ballooning while challenging modern perspectives on our connection with nature.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-gin mb-4">Our Mission</h2>
            <p>
              To revitalize the art of ballooning for new generations by infusing this timeless practice with fresh energy, authenticity, and rebellious spirit. The sky is the limit.            </p>
          </div>
          <div className="border p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-gin mb-4">Our Vision</h2>
            <p>
              To create a movement that celebrates the revolutionary act of slowing down, embracing surrender to natural forces, and viewing the world from perspectives that transform.
            </p>
          </div>
          <div className="border p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-gin mb-4">Our Values</h2>
            <p>
              Rebellion through slowness, rock & roll in the sky, legacy through innovation, nature's collaboration over conquest, and perspective as transformation define our approach at Aerostatic.            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
