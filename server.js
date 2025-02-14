const os = require('os');
const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post('/execute', (req, res) => {
    let command = req.body.command;

    // Validar si el comando es compatible con el sistema operativo
    if (!command) {
        return res.status(400).send('Comando no proporcionado.');
    }

    // Detectar sistema operativo y ajustar comando si es necesario
    if (os.platform() === 'win32' && command === 'ls') {
        command = 'dir';
    }

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error ejecutando comando: ${stderr}`);
            return res.status(500).send(`Error: ${stderr}`);
        }
        res.send(`Output: ${stdout}`);
    });
});

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));

