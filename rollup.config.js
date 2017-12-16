import path from 'path';
import typescript from 'rollup-plugin-typescript';

export default {
  input: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    exports: 'named',
    file: path.resolve(__dirname, 'dist', 'index.js'),
    format: 'cjs',
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
  ],
  external: ['react'],
};
