import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { api } from "../data";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function Company() {
  const [, params] = useRoute("/company/:id");
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!params?.id) return;
      
      setLoading(true);
      try {
        const data = await api.getCompany(params.id);
        setCompany(data);
      } catch (error) {
        console.error("Failed to fetch company details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-12 flex items-center justify-center text-green-400 animate-pulse text-xl">
        Loading company details...
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-12 flex flex-col items-center justify-center text-green-500">
        <h1 className="text-2xl mb-4">Company not found</h1>
        <Link href="/">
          <span className="px-6 py-3 border-2 border-green-400 rounded-full hover:bg-green-50 transition-colors cursor-pointer text-green-600">
            Back to Home
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 font-sans text-green-500">
      <div className="max-w-3xl mx-auto">
        <Link href="/">
          <span className="inline-flex items-center text-green-500 hover:text-green-600 mb-8 cursor-pointer font-medium hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </span>
        </Link>

        <div className="border-2 border-green-400 rounded-3xl p-8 md:p-12 bg-white shadow-sm">
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-6 border-b-2 border-green-100 pb-6">
            {company.title || "N/A"}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm uppercase tracking-wider text-green-400 mb-1">Rating / Score</h3>
                <p className="text-lg font-medium">{company.totalScore || "N/A"}</p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider text-green-400 mb-1">Reviews Count</h3>
                <p className="text-lg font-medium">{company.reviewsCount || "N/A"}</p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider text-green-400 mb-1">Phone Number</h3>
                <p className="text-lg font-medium">{company.phone || "N/A"}</p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider text-green-400 mb-1">Categories</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {company.categories && company.categories.length > 0 ? (
                    company.categories.map((cat, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-50 border border-green-300 rounded-full text-sm">
                        {cat}
                      </span>
                    ))
                  ) : (
                    <span className="text-lg">N/A</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm uppercase tracking-wider text-green-400 mb-1">Street Address</h3>
                <p className="text-lg font-medium">{company.street || "N/A"}</p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider text-green-400 mb-1">City</h3>
                <p className="text-lg font-medium">{company.city || "N/A"}</p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider text-green-400 mb-1">State</h3>
                <p className="text-lg font-medium">{company.state || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-green-100">
            {company.website ? (
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-6 rounded-full text-center transition-colors shadow-md"
              >
                Visit Website
              </a>
            ) : (
              <button 
                disabled
                className="flex-1 bg-green-200 text-white font-medium py-4 px-6 rounded-full text-center cursor-not-allowed"
              >
                Website N/A
              </button>
            )}

            {company.mapUrl && (
              <a 
                href={company.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-none flex items-center justify-center bg-white border-2 border-green-400 text-green-600 hover:bg-green-50 font-medium py-4 px-6 rounded-full transition-colors"
              >
                View on Map <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}