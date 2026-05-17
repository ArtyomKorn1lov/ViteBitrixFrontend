import { resolve } from 'path';
import EntrypointList from './entrypoint-list.json';

const output: { [key: string]: string } = {};

EntrypointList.forEach((entry: string) => {
  output[entry] = resolve(__dirname, `./${entry}`);
});

export default output;
