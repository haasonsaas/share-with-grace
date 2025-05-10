# Share with Grace Chrome Extension

A Chrome extension that helps you share content with grace and ease.

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Bun

## Installation

1. Clone this repository:
```sh
git clone https://github.com/haasonsaas/share-with-grace.git
cd share-with-grace
```

2. Install dependencies:
```sh
bun install
```

3. Build the extension:
```sh
bun run build
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked" and select the `dist` directory from this project

## Usage

Once installed, the extension will be available in your Chrome toolbar. Click the extension icon to:

- Share the current page
- Access sharing options
- View sharing history

## Development

To start development with hot-reloading:

```sh
bun run dev
```

This will watch for changes and rebuild the extension automatically.

## Building for Production

To create a production build:

```sh
bun run build
```

The built extension will be available in the `dist` directory.

## Publishing

To publish the extension:

1. Build the extension for production
2. Create a zip file of the `dist` directory
3. Submit to the Chrome Web Store through the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
