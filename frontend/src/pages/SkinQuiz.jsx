import { useState } from "react";
import StepCard from "../components/StepCard";
import OptionButton from "../components/OptionButton";
import ResultCard from "../components/ResultCard";
import { getRecommendations } from "../api/recommendationApi";

export default function SkinQuiz() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    skinType: "",
    concern: "",
    budget: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setResults([]);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setResults([]);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await getRecommendations(form);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-2">
          ✨ Skin Wellness Quiz
        </h1>

        <p className="text-center text-gray-600 mb-4">
          Get personalized skincare recommendations
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="mb-4 flex gap-2 flex-wrap justify-center">
          {form.skinType && (
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
              Skin: {form.skinType}
            </span>
          )}

          {form.concern && (
            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
              Concern: {form.concern}
            </span>
          )}

          {form.budget && (
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
              Budget: {form.budget}
            </span>
          )}
        </div>

        {step === 1 && (
          <StepCard title="Choose Your Skin Type">
            <div className="flex gap-3 flex-wrap">
              {["Oily", "Dry", "Sensitive"].map((type) => (
                <OptionButton
                  key={type}
                  label={type}
                  selected={form.skinType === type}
                  onClick={() =>
                    setForm({ ...form, skinType: type })
                  }
                />
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                disabled={!form.skinType}
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
              >
                Next
              </button>
            </div>
          </StepCard>
        )}

        {step === 2 && (
          <StepCard title="Select Your Concern">
            <div className="flex gap-3 flex-wrap">
              {["Acne", "Aging", "Hydration"].map((c) => (
                <OptionButton
                  key={c}
                  label={c}
                  selected={form.concern === c}
                  onClick={() =>
                    setForm({ ...form, concern: c })
                  }
                />
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
              >
                Back
              </button>

              <button
                disabled={!form.concern}
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-xl shadow"
              >
                Next
              </button>
            </div>
          </StepCard>
        )}

        {step === 3 && (
          <StepCard title="Select Budget">
            <div className="flex gap-3">
              {["$10-$50", "$50+"].map((b) => (
                <OptionButton
                  key={b}
                  label={b}
                  selected={form.budget === b}
                  onClick={() =>
                    setForm({ ...form, budget: b })
                  }
                />
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 rounded-xl"
              >
                Back
              </button>

              <button
                disabled={!form.budget}
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
              >
                Get Recommendations
              </button>
            </div>
          </StepCard>
        )}

        {/* LOADING */}
        {loading && (
          <p className="mt-4 text-center">Loading...</p>
        )}

        {/* RESULTS */}
        {results.length > 0 && (
          <div className="mt-6 space-y-3">
            <h2 className="text-xl font-bold text-center">
              Recommended Products
            </h2>

            {results.map((product) => (
              <ResultCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}