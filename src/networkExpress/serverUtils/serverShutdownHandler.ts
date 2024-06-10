import { Server, Socket } from 'net';

type ShutdownHandler = () => void;

export const handleServerShutdown = (server: Server): ShutdownHandler => {
    let connections: Socket[] = [];

    const handleConnection = (connection: Socket): void => {
        connections.push(connection);

        connection.on('close', () => {
            connections = connections.filter(
                (currentConnection) => currentConnection !== connection
            );
        });
    };

    server.on('connection', handleConnection);

    const shutdown = (): void => {
        console.log('Received kill signal, shutting down gracefully');

        server.close(() => {
            console.log('Closed out remaining connections');
            process.exit(0);
        });

        setTimeout(() => {
            console.error('Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 20000);

        connections.forEach((connection) => connection.end());

        setTimeout(() => {
            connections.forEach((connection) => connection.destroy());
        }, 10000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

    return shutdown;
};
