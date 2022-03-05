module.exports = {
  lift: {
    output: {
      mode: 'tags-split',
      target: 'src/api/client.ts',
      schemas: 'src/model',
      client: 'react-query',
    },
    input: {
      target: './full_documentation.json',
    },
  },
};