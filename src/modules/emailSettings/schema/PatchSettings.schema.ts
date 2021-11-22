export const PatchSettingsSchema = {
  type: 'object',
  anyOf: [{ required: ['promotions'] }, { required: ['social'] }],
  properties: {
    promotions: {
      type: 'boolean',
    },
    social: {
      type: 'boolean',
    },
  },
};
