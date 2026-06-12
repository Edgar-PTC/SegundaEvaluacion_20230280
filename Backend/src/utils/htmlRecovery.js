const htmlRecovery = (email, code) => {
    return(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="background-color: #751c1c; display: flex; justify-content: center; align-items: center; padding: 10px;">
        <div style="background-color: #dac9c9; display: flex; justify-content: center; align-items: center; padding: 10px;">
            <h1>Tranquilo, ${email}. Ahorita cmabiamos tu contraseña. Porfavor ingresa este codigo, donde se te indica. ${code}</h1>
        </div>
    </div>
</body>
</html>`)
}

export default htmlRecovery;