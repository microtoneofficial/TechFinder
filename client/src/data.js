import companiesData from './companies.json';

// Ensure all items have a unique ID
export const MOCK_COMPANIES = companiesData.map((company, index) => ({
  ...company,
  id: String(index + 1)
}));

export const api = {

  // ✅ NEW: Get companies by city (FAST)
  getCompaniesByCity: async (city) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = MOCK_COMPANIES.filter((c) =>
          c.city?.toLowerCase().includes(city.toLowerCase())
        );

        resolve(results.slice(0, 100)); // limit for performance
      }, 300);
    });
  },

  // 🔍 Search inside selected city
  searchCompanies: async (query, city) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const q = query.toLowerCase();

        const results = MOCK_COMPANIES.filter((c) => {
          const matchCity = c.city?.toLowerCase().includes(city.toLowerCase());
          const matchTitle = c.title?.toLowerCase().includes(q);
          const matchCategory = c.categories?.some((cat) =>
            cat.toLowerCase().includes(q)
          );

          return matchCity && (matchTitle || matchCategory);
        });

        resolve(results.slice(0, 100));
      }, 300);
    });
  },

  // Get single company
  getCompany: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_COMPANIES.find((c) => c.id === id));
      }, 300);
    });
  }
};