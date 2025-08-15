# Gemini Chatbot API

A RESTful API for interacting with a Gemini-powered chatbot.

## Features

- Chatbot responses powered by Gemini AI
- RESTful endpoints for chat interaction
- Easy integration with web and mobile apps

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/odanicola/gemini-chatbot-api.git
cd gemini-chatbot-api
npm install
```

### Running the API

```bash
npm start
```

The API will be available at `http://localhost:3000`.

## Usage

Send a POST request to `/api/chat` with your message:

```json
{
    "message": "Hello, Gemini!"
}
```

Example using `curl`:

```bash
curl -X POST http://localhost:3000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message": "Hello, Gemini!"}'
```

## Configuration

Configure your Gemini API key and other settings in `.env`:

```
GEMINI_API_KEY=your-api-key
PORT=3000
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

MIT