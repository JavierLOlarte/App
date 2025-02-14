async function ejecutarComando() {
    const projectName = document.getElementById("project-name").value.trim();
    const loginChecked = document.getElementById("login-option").checked ? "login" : "none";
    const dbChecked = document.getElementById("database-option").checked ? "database" : "none";
    

    const orientationOptions = document.getElementsByName("orientation");
    let orientation = "none";
    for (let option of orientationOptions) {
        if (option.checked) {
            orientation = option.value;
            break;
        }
    }

    if (!projectName) {
        alert("Por favor, ingrese un nombre de proyecto.");
        return;
    }

    
    const comando = `yo intergrupo-builder ${projectName} f ${loginChecked} webangular13 ${dbChecked} theme1`;

    try {
        const respuesta = await fetch("http://localhost:5000/execute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ command: comando })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            alert("Comando ejecutado con éxito:\n" + datos.output);
        } else {
            alert("Error al ejecutar el comando:\n" + (datos.error || "Error desconocido"));
        }
    } catch (error) {
        alert("Error al conectar con el servidor:\n" + error.message);
    }
}


document.getElementById("btnEjecutar").addEventListener("click", ejecutarComando);
