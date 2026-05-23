import AuditForm from "@/components/AuditForm";

export default function Home() {

  return (

    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10">

      <div className="max-w-6xl mx-auto">

        <nav className="flex justify-between items-center py-6 border-b border-gray-800">

          <h2 className="text-2xl font-bold">
            Credex AI Audit
          </h2>

          <button className="bg-white text-black px-5 py-2 rounded-xl font-semibold">
            Get Started
          </button>

        </nav>

        <div className="text-center mt-16">

          <h1 className="text-6xl font-bold">
            AI Spend Audit Platform
          </h1>

          <p className="text-gray-400 mt-6 text-xl max-w-2xl mx-auto">
            Analyze and optimize your company AI software spending.
          </p>

        </div>

        <AuditForm />

        <section className="mt-24">

          <h2 className="text-4xl font-bold text-center mb-12">
            Platform Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">

              <h3 className="text-2xl font-semibold mb-4">
                AI Spend Analysis
              </h3>

              <p className="text-gray-400">
                Analyze company AI software spending patterns.
              </p>

            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">

              <h3 className="text-2xl font-semibold mb-4">
                Smart Recommendations
              </h3>

              <p className="text-gray-400">
                Get recommendations to reduce unnecessary costs.
              </p>

            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">

              <h3 className="text-2xl font-semibold mb-4">
                Savings Dashboard
              </h3>

              <p className="text-gray-400">
                View estimated monthly and annual savings instantly.
              </p>

            </div>

          </div>

        </section>

        <footer className="text-center text-gray-500 py-10 mt-20 border-t border-gray-800">

          Built with Next.js, TypeScript & Tailwind CSS

        </footer>

      </div>

    </main>

  );

}