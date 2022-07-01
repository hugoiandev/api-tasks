import App from './app';

const { server } = new App();

server.listen(process.env.PORT || 3333);
