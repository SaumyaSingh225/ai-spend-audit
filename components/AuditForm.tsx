"use client";

import { useState } from "react";

export default function AuditForm() {

  // STATES

  const [companyName, setCompanyName] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [monthlySpend, setMonthlySpend] = useState("");

  const [showResult, setShowResult] = useState(false);

  const [loading, setLoading] = useState(false);

  const [auditData, setAuditData] = useState<any>(null);

  const [error, setError] = useState("");

  const [auditHistory, setAuditHistory] = useState<any[]>([]);

  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  // AI TOOLS

  const aiTools = [
    "ChatGPT",
    "Notion AI",
    "GitHub Copilot",
    "Claude",
    "Gemini",
    "Midjourney"
  ];

  // SAVINGS

  const estimatedSavings =
    Number(monthlySpend) * 0.25;

  const annualSavings =
    estimatedSavings * 12;

  const savingsPercentage = 25;

  // TOOL SELECT FUNCTION

  const handleToolSelect = (tool: string) => {

    if (selectedTools.includes(tool)) {

      setSelectedTools(
        selectedTools.filter(
          (item) => item !== tool
        )
      );

    } else {

      setSelectedTools([
        ...selectedTools,
        tool
      ]);

    }

  };

  // AUDIT FUNCTION

  const handleAudit = async () => {

    setLoading(true);

    setShowResult(false);

    setError("");

    // VALIDATION

    if (
      !companyName ||
      !companySize ||
      !monthlySpend ||
      selectedTools.length === 0
    ) {

      setError(
        "Please fill all fields and select at least one AI tool."
      );

      setLoading(false);

      return;

    }

    try {

      const response = await fetch(
        "/api/audit",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            companyName,
            companySize,
            monthlySpend,
            selectedTools

          })

        }
      );

      const result =
        await response.json();

      console.log(result);

      setAuditData(result.data);

      setAuditHistory((prev) => [
        result.data,
        ...prev
      ]);

      setLoading(false);

      setShowResult(true);

    } catch (error) {

      console.log(error);

      setLoading(false);

      setError("Something went wrong");

    }

  };

  return (

    <div className="max-w-4xl mx-auto mt-20 bg-gray-900 border border-gray-800 rounded-3xl p-10">

      <h2 className="text-4xl font-bold mb-8 text-center">
        Start Your AI Audit
      </h2>

      <div className="flex flex-col gap-6">

        {/* ERROR */}

        {error && (

          <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl">

            {error}

          </div>

        )}

        {/* COMPANY NAME */}

        <div>

          <label className="block mb-2 text-gray-300">
            Company Name
          </label>

          <input
            type="text"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
            className="w-full px-5 py-4 rounded-xl bg-black border border-gray-700 outline-none"
          />

        </div>

        {/* COMPANY SIZE */}

        <div>

          <label className="block mb-2 text-gray-300">
            Company Size
          </label>

          <select
            value={companySize}
            onChange={(e) =>
              setCompanySize(e.target.value)
            }
            className="w-full px-5 py-4 rounded-xl bg-black border border-gray-700 outline-none"
          >

            <option value="">
              Select company size
            </option>

            <option value="1-10">
              1-10 Employees
            </option>

            <option value="11-50">
              11-50 Employees
            </option>

            <option value="51-200">
              51-200 Employees
            </option>

            <option value="200+">
              200+ Employees
            </option>

          </select>

        </div>

        {/* MONTHLY SPEND */}

        <div>

          <label className="block mb-2 text-gray-300">
            Monthly AI Spend ($)
          </label>

          <input
            type="number"
            placeholder="Enter monthly spend"
            value={monthlySpend}
            onChange={(e) =>
              setMonthlySpend(e.target.value)
            }
            className="w-full px-5 py-4 rounded-xl bg-black border border-gray-700 outline-none"
          />

        </div>

        {/* TOOLS */}

        <div>

          <label className="block mb-4 text-gray-300">
            Select AI Tools Used
          </label>

          <div className="grid grid-cols-2 gap-4">

            {aiTools.map((tool) => (

              <button
                key={tool}
                type="button"
                onClick={() =>
                  handleToolSelect(tool)
                }
                className={`p-4 rounded-xl border transition ${
                  selectedTools.includes(tool)
                    ? "bg-white text-black border-white"
                    : "bg-black border-gray-700 text-white"
                }`}
              >

                {tool}

              </button>

            ))}

          </div>

        </div>

        {/* BUTTON */}

        <button
          onClick={handleAudit}
          disabled={loading}
          className="bg-white text-black py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 hover:scale-105 transition duration-300"
        >

          {loading
            ? "Analyzing..."
            : "Generate Audit"}

        </button>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="mt-10 bg-black border border-gray-700 rounded-2xl p-10 text-center">

          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h3 className="text-3xl font-bold mt-6">
            Analyzing AI Spend...
          </h3>

          <p className="text-gray-400 mt-4">
            AI is calculating savings opportunities.
          </p>

        </div>

      )}

      {/* RESULT */}

      {showResult && auditData && (

        <div className="mt-10 bg-black border border-gray-700 rounded-2xl p-8">

          <h3 className="text-3xl font-bold mb-4">
            Audit Summary
          </h3>

          <p className="text-gray-300 mb-2">
            Company: {companyName}
          </p>

          <p className="text-gray-300 mb-2">
            Company Size: {companySize}
          </p>

          <p className="text-gray-300 mb-2">
            Monthly Spend: ${monthlySpend}
          </p>

          <p className="text-gray-300 mb-2">
            Tools Used:
            {" "}
            {selectedTools.join(", ")}
          </p>

          {/* CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

            {/* MONTHLY */}

            <div className="bg-green-500/10 border border-green-500 rounded-2xl p-6">

              <p className="text-gray-400 mb-2">
                Monthly Savings
              </p>

              <h4 className="text-3xl font-bold text-green-400">
                ${auditData?.estimatedSavings}
              </h4>

            </div>

            {/* ANNUAL */}

            <div className="bg-blue-500/10 border border-blue-500 rounded-2xl p-6">

              <p className="text-gray-400 mb-2">
                Annual Savings
              </p>

              <h4 className="text-3xl font-bold text-blue-400">
                ${auditData?.annualSavings}
              </h4>

            </div>

            {/* PERCENT */}

            <div className="bg-purple-500/10 border border-purple-500 rounded-2xl p-6">

              <p className="text-gray-400 mb-2">
                Savings Percentage
              </p>

              <h4 className="text-3xl font-bold text-purple-400">
                {savingsPercentage}%
              </h4>

            </div>

          </div>

          {/* RECOMMENDATIONS */}

          <div className="mt-8 bg-gray-900 border border-gray-700 rounded-2xl p-6">

            <h4 className="text-2xl font-bold mb-4">
              AI Recommendations
            </h4>

            <ul className="space-y-3 text-gray-300">

              {auditData?.recommendations.map(
                (
                  item: string,
                  index: number
                ) => (

                  <li key={index}>
                    • {item}
                  </li>

                )
              )}

            </ul>

          </div>

        </div>

      )}

      {/* AUDIT HISTORY */}

      {auditHistory.length > 0 && (

        <div className="mt-16">

          <h3 className="text-3xl font-bold mb-6">
            Previous Audits
          </h3>

          <div className="grid gap-6">

            {auditHistory.map(
              (audit, index) => (

                <div
                  key={index}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h4 className="text-2xl font-semibold">
                        {audit.companyName}
                      </h4>

                      <p className="text-gray-400 mt-1">
                        {audit.companySize}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-green-400 text-2xl font-bold">
                        ${audit.estimatedSavings}
                      </p>

                      <p className="text-gray-400">
                        Monthly Savings
                      </p>

                    </div>

                  </div>

                  <div className="mt-4">

                    <p className="text-gray-300">
                      Tools Used:
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">

                      {audit.selectedTools.map(
                        (
                          tool: string,
                          i: number
                        ) => (

                          <span
                            key={i}
                            className="bg-black border border-gray-700 px-3 py-1 rounded-full text-sm"
                          >

                            {tool}

                          </span>

                        )
                      )}

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}

    </div>

  );

}