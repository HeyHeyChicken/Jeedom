class Client {
    constructor(_main) {
        const SELF = this;

        this.Main = _main;

        // Sockets from client
        this.Main.IOServer.on("connection", function(socket){

        });

        // Sockets from server
        this.Main.IOClient.on("abc", function(_token, _autoplay){

        });
    }
}

module.exports = Client;
