import { useState } from 'react';

export function HowRankingsWork() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-blue-600 hover:text-blue-700 underline"
      >
        How do rankings work?
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">How Rankings Work</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6 text-gray-700">
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    🎯 The Challenge
                  </h3>
                  <p>
                    A professor with 5 stars from 2 reviews might actually be less reliable than
                    one with 4.7 stars from 100 reviews. We use Bayesian scoring to prevent this bias.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    📊 Our Algorithm
                  </h3>
                  <p className="mb-3">We calculate each professor's score using four components:</p>
                  <ul className="space-y-2 ml-4">
                    <li>
                      <strong>Rating Score (Base)</strong>
                      <p className="text-sm text-gray-600">
                        We blend the professor's actual rating with an assumed average of 3.5 stars.
                        More reviews = more trust in the actual rating.
                      </p>
                    </li>
                    <li>
                      <strong>Confidence Adjustment</strong>
                      <p className="text-sm text-gray-600">
                        With &lt;30 reviews, we heavily weight toward the 3.5 average. With 100+ reviews,
                        we trust the actual rating almost entirely.
                      </p>
                    </li>
                    <li>
                      <strong>Difficulty Penalty</strong>
                      <p className="text-sm text-gray-600">
                        Each point on the difficulty scale (0-5) reduces the score by 0.05. A 5.0
                        difficulty courses gets a -0.25 penalty.
                      </p>
                    </li>
                    <li>
                      <strong>Would-Take-Again Bonus</strong>
                      <p className="text-sm text-gray-600">
                        A professor with 90% "would-take-again" gets a +0.18 bonus. This rewards
                        overall satisfaction.
                      </p>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    ✅ Why This Works
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Prevents new professors from being ranked #1 due to small sample sizes</li>
                    <li>Avoids heavily penalizing legitimately difficult but excellent courses</li>
                    <li>Rewards professors students would actually take again</li>
                    <li>Fair to both highly-rated and moderately-rated professors</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    📚 Example
                  </h3>
                  <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                    <p>
                      <strong>Dr. A:</strong> 4.9★ (10 reviews, 3.0 difficulty, 85% WTA)
                    </p>
                    <p className="text-gray-600 ml-4">Raw: 4.9 → Adjusted: ~3.9 (regressed to mean)</p>
                    <p className="text-gray-600 ml-4">Final: 3.9 - 0.15 (difficulty) + 0.17 (WTA) = <strong>3.92</strong></p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-sm space-y-1 mt-2">
                    <p>
                      <strong>Dr. B:</strong> 4.6★ (120 reviews, 4.0 difficulty, 80% WTA)
                    </p>
                    <p className="text-gray-600 ml-4">Raw: 4.6 → Adjusted: ~4.54 (trusted, high confidence)</p>
                    <p className="text-gray-600 ml-4">Final: 4.54 - 0.20 (difficulty) + 0.16 (WTA) = <strong>4.50</strong></p>
                  </div>
                  <p className="mt-2 text-gray-600">
                    Result: Dr. B ranks higher despite lower raw rating, because more students have
                    confirmed the experience.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    💡 Key Insight
                  </h3>
                  <p className="bg-blue-50 p-3 rounded">
                    We show the <strong>best review</strong> (highest rated) and <strong>critical feedback</strong>{' '}
                    (lowest rated) for each professor. Always read both to get the full picture!
                  </p>
                </section>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
