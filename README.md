<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1DMeiZiUlHDZaG9GlV9Hz_tdx8fUsMtCv

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
# Tech Stack

- **Framework**: Next.js (App Router)
- **Runtime**: Node.js (serverless functions)
- **Media Processing**: FFmpeg/FFprobe (in-memory, no disk writes)
- **Language**: TypeScript (strict mode)

## Constraints

| Constraint | Value |
|------------|-------|
| Max upload size | 10 MB |
| Frame extraction interval | 5 seconds |
| Max frames | 1000 |
| Embedding dimension | 1024 |
| Max face embedding height | 448px |
