# emmanueljet imager

[![Next.js Framework](https://img.shields.io/badge/Framework-NextJS?logo=next.js&label=Next.js&color=8b15ba)](https://nextjs.org)
![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)
[![Build Status](https://github.com/emmanuelJet/emmanueljet-imager/actions/workflows/github-pages.yml/badge.svg)](https://github.com/emmanuelJet/emmanueljet-imager/actions/workflows/github-pages.yml)
[![Preview](https://img.shields.io/website?down_color=red&down_message=Offiline&label=Preview&up_color=8b15ba&up_message=Online&url=https%3A%2F%2Fimager.emmanueljet.com)](https://imager.emmanueljet.com)

**emmanueljet imager** is a high-performance, privacy-focused client-side image optimization tool built with Next.js 16. It allows users to compress and convert images (AVIF, WebP, JPEG, PNG) directly in their browser without uploading files to a server.

## Features

- **Client-Side Processing**: All compression happens locally in your browser. No files are ever uploaded, ensuring 100% privacy.
- **Modern Formats**: Support for next-gen formats like **AVIF** and **WebP** for superior compression ratios.
- **Batch Processing**: Optimize multiple images simultaneously.
- **Customizable Quality**: Fine-tune quality settings to balance file size and visual fidelity.
- **Dark/Light Mode**: A beautiful, responsive UI that adapts to your system preferences.
- **PWA Ready**: Installable as a progressive web app for native-like experience.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Core Libraries**: 
  - `browser-image-compression`: For efficient client-side compression.
  - `jszip`: For bundling optimized images.

## Getting Started

### Prerequisites

- Node.js 22+ 
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/emmanuelJet/emmanueljet-imager.git
   cd emmanueljet-imager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

This project is licensed under the **GNU Affero General Public License v3.0** - see the [LICENSE](LICENSE) file for details.
