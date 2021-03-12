module.exports = (server) => {
    server.get('/', (req, res) => {
        console.log('Rota Funcionando');
    });
}