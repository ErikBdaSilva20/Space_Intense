import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      // ✅ Adicionado aqui
      'no-unused-vars': 'warn', // avisa variáveis que você declarou mas não usa
      'no-undef': 'error', // avisa quando usa algo que não foi definido
      'no-unreachable': 'error', // código depois de return, throw etc.
      'no-unused-expressions': 'warn', // função que não foi chamada (como falamos antes)
      eqeqeq: ['warn', 'always'], // força uso de === em vez de == (evita comparação estranha)
      'no-console': 'warn', // avisa uso de console.log (útil pra limpar código antes de subir)
      'no-debugger': 'error',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
  },
])
