use("plan-verifier");

db.quickreferences.deleteMany({});

db.quickreferences.insertMany([
  {
    key: "helicopters",
    label: "Helicopters",
    markdown: `# Choppas`,
  },
  {
    key: "military",
    label: "Military",
    markdown: `# Military`,
  },
  {
    key: "military",
    label: "Equipment suffixes",
    markdown: `# Equipment suffixes`,
  },
]);
