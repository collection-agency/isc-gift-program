module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: {
    enabled: false,
    layers: ["components", "utilities"],
    content: [
      "./snippets/*.liquid",
      "./sections/*.liquid",
      "./templates/*.liquid",
      "./layout/*.liquid",
    ],
  },
  theme: {
    fontFamily: {
      'basic': ['ROM', 'sans-serif'],
      'heading': ['ROM Condensed', 'sans-serif'],
    },
    extend: {
      colors: {
        green: {
          pale: '#EEF4EC',
        },
        brown: {
          pale: '#E2D7BF',
        },
      },
      borderRadius: {
        xl: '1.5rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
