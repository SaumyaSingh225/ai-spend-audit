import AuditForm from "@/components/AuditForm";

export default function Home() {

  return (

    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10">

      <div className="max-w-6xl mx-auto">

        {/* HERO SECTION */}

        <div className="text-center mt-10">

          <h1 className="text-6xl font-bold">
            AI Spend Audit
          </h1>

          <p className="text-gray-400 mt-6 text-xl max-w-2xl mx-auto">
            Analyze your AI software spending and discover opportunities to reduce unnecessary costs.
          </p>

        </div>

        {/* FORM */}

        <AuditForm />

        {/* FOOTER */}

        <footer className="text-center text-gray-500 py-10 mt-20 border-t border-gray-800">

          Built with Next.js, TypeScript & Tailwind CSS

        </footer>

      </div>

    </main>

  );

}