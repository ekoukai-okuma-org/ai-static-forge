#!/usr/bin/env bash

set -e

if [ -e package.json ]; then
  echo "package.json already exists. Empty project is required to run this setup script."
  exit 1
fi

printf '{}\n' > package.json
npm i -D vite tailwindcss @tailwindcss/vite vite-plugin-handlebars fast-glob
npm i alpinejs lucide swiper gsap

npm pkg set scripts.dev="vite"
npm pkg set scripts.build="vite build"
npm pkg set scripts.preview="vite preview"

echo ""
echo "Setup complete."
echo "Run: npm run dev"
