
const WAKATIME_CONFIG = {
  DEFAULT_RANGE: "last_7_days",
  RANGES: [
    { value: "last_7_days", pt: "7 dias", en: "7 days" },
    { value: "last_30_days", pt: "30 dias", en: "30 days" },
    { value: "last_6_months", pt: "6 meses", en: "6 months" },
    { value: "last_year", pt: "1 ano", en: "1 year" },
    { value: "all_time", pt: "Desde sempre", en: "All time" },
  ],
  MAX_LANGUAGES: 8,
  HIDDEN_LANGUAGES: ["Text", "Other"],
  CODING_NOW: {
    API_PATH: "/api/codando",
    TIMEZONE: "America/Sao_Paulo",
    ACTIVE_MINUTES: 10,
    BREAK_MINUTES: 15,
    REFRESH_SECONDS: 60,
  },
};

export default WAKATIME_CONFIG;
