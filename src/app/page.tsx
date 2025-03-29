import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="container mx-auto px-5 flex flex-col min-h-screen">
      <Header />
      <div className="py-8 md:py-16 flex-grow">
        <p className="text-lg md:text-xl mb-8">
          We are a movement in pursuit of meaningful transformation through story, adventure, and radical authenticity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-gelica mb-4">Our Mission</h2>
            <p>
              To spark a global movement by creating an ecosystem of media and tools that empower individuals to break free from the conventional and pursue lives of meaning.
            </p>
          </div>
          <div className="border p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-gelica mb-4">Our Vision</h2>
            <p>
              To build a world where people live with intention rather than inertia, where authentic connection replaces shallow consumption, and where purpose guides our collective future.
            </p>
          </div>
          <div className="border p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-gelica mb-4">Our Values</h2>
            <p>
              Authenticity in our stories, courage in challenging conventions, and meaningful connections. We're committed to creating experiences that inspire positive change.
            </p>          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
