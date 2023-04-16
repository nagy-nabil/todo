/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./packages/renderer/index.html', './packages/renderer/src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // dracula
                primary: '#ff79c6',
                secondary: '#bd93f9',
                accent: '#ffb86c',
                neutral: '#414558',
                'base-100': '#282a36',
                'base-content': '#f8f8f2',
                info: '#8be9fd',
                success: '#50fa7b',
                warning: '#f1fa8c',
                error: '#ff5555',
            },
        },
    },
    plugins: [],
};
