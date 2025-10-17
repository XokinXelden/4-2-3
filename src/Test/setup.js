import "@testing-library/jest-dom/vitest";

if (typeof window !== "undefined") {
  window.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
}

// global.fetch = vi.fn().mockImplementation(async (url) => {
//   console.log("Запрос:", url);

//   if (url.includes("api.hh.ru/vacancies")) {
//     const data = {
//       json: () => ({
//         items: [
//           {
//             id: "1",
//             name: "Тестовая вакансия",
//             alternate_url: "url",
//             address: { city: "Москва" },
//             salary: { from: 111, to: 122, currency: "RUR" },
//             experience: { name: "Нет опыта" },
//             employer: { name: "Тестовая компания" },
//             work_format: [{ id: "ON_SITE" }],
//           },
//         ],
//         pages: 1,
//         found: 1,
//       }),
//     };
//     return Promise.resolve(data);
//   }

//   throw new Error(`Неизвестный URL: ${url}`);
// });

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
