import { resolve } from 'path';

const entries: string[] = [
  'src/entrypoint/catalog/list.ts',
  'src/entrypoint/news/list.ts',
  'src/entrypoint/news/detail.ts',
  'src/entrypoint/feedback/form.ts',
];

const output: { [key: string]: string } = {};
entries.forEach((entry: string) => {
  output[entry] = resolve(__dirname, `./${entry}`);
});

export default output;
