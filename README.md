# ECHO

ECHO is a modern and lightweight chat application designed for seamless communication in a command-line environment.
With ECHO, users can engage in real-time text-based conversations without the need for a graphical user interface,
making it perfect for those who prefer a distraction-free chatting experience.

ECHO offers a clean and intuitive Terminal User Interface (TUI) that allows users to navigate, send messages, and manage channels effortlessly.
It supports multiple channels, enabling users to create, join, and switch between different conversation channels based on their interests or preferences.

## Key Features

- **User Authentication**: Secure login ensures that only authorized users can access the chat application.
- **Persistent Login**: Enjoy seamless access to your account with persistent login functionality.
- **Multiple Channels**: Create, join, and manage channels to facilitate conversations on various topics.
- **Real-time Messaging**: Instantly send and receive messages within the application.
- **Chat History**: When entering a channel, all previous messages are loaded for a seamless conversation history.

## Contributing

Contributions are welcome to both the server-side and client-side components of ECHO.
Whether it's bug fixes, feature enhancements, or documentation improvements, all forms of contributions are appreciated.

### Getting Started

To contribute, follow these steps:

- [Fork the repo](https://github.com/uosyph/ECHO/fork).
- Clone your forked repository to your local machine.
- Create a new branch (`git checkout -b improve-feature`)
- Make the necessary changes.
- Test the changes thoroughly.
- Commit your changes (`git commit -am 'Improve feature'`).
- Push to the branch (`git push origin improve-feature`).
- [Create a Pull Request](https://github.com/uosyph/ECHO/compare).

### Client Development

For client-side development:

- **Install Dependencies**: Run `npm install` to install the necessary dependencies.
- **Start the client**: Run `npm start` to start the server or `npm watch` to watch for changes.
- **Linting**: Ensure linting is correct by running npm run lint or npm run fix-lint to fix linting problems.

### Server Development

Before starting server development, ensure you have the necessary configurations in place:

#### Clients

Ensure you have the following clients running:

- **MongoDB Client**: Ensure you have MongoDB client running.
- **Redis Client**: Ensure you have Redis client running.

#### Environment Configuration

To run this project, you need to set up your environment variables.

Create a file named `.env` in the server directory and add the following configuration:

```env
ENV="dev"
PORT=server_port
MONGO_URI=your_mongo_uri
SECRET_KEY=your_secret_key
SALT_ROUNDS=your_desired_number
```

#### Run The Server

- **Install Dependencies**: Run `npm install` to install the necessary dependencies.
- **Start the Server**: Run `npm start` to start the server or `npm watch` to watch for changes.
- **Linting**: Ensure linting is correct by running npm run lint or npm run fix-lint to fix linting problems.

## Feedback

If you find a bug or want to request a new feature:

- For bugs, [open an issue](https://github.com/uosyph/ECHO/issues/new/choose) with details about the problem.
- For feature requests, [open an issue](https://github.com/uosyph/ECHO/issues/new/choose) with your suggestions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more details.

## Author

**Yousef Saeed**:
[GitHub](https://github.com/uosyph)
[LinkedIn](https://linkedin.com/in/uosyph)
[X](https://twitter.com/uosyph)
