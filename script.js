function calcularEdad(fecha) {
    const hoy = new Date();
    const anioNacimiento = parseInt(fecha.substring(0, 2), 10);
    const mesNacimiento = parseInt(fecha.substring(2, 4), 10) - 1; // Restamos 1 porque los meses comienzan desde 0
    const diaNacimiento = parseInt(fecha.substring(4, 6), 10);
    let anioCompleto = anioNacimiento + (anioNacimiento < 50 ? 2000 : 1900); // Si es menor a 50, se considera como 2000+

    const fechaNacimiento = new Date(anioCompleto, mesNacimiento, diaNacimiento);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
}

function validar() {
    const curp = document.getElementById('curp').value.trim();
    const rfc = document.getElementById('rfc').value.trim();
    const curpError = document.getElementById('curpError');
    const rfcError = document.getElementById('rfcError');
    const resultado = document.getElementById('resultado');
    
    curpError.textContent = '';
    rfcError.textContent = '';
    resultado.innerHTML = ''; // Limpiar resultados previos

    if (curp.length !== 18) {
        curpError.textContent = curp.length < 18 ? 'La CURP debe tener exactamente 18 caracteres. Faltan ' + (18 - curp.length) + ' caracteres.' : 'La CURP debe tener exactamente 18 caracteres. Sobran ' + (curp.length - 18) + ' caracteres.';
    } else {
        const letras = /^[A-Z]{4}/;
        if (!letras.test(curp.substring(0, 4))) {
            curpError.textContent = 'Los primeros 4 caracteres de la CURP deben ser letras.';
        }

        const sexo = curp.charAt(10);
        if (sexo !== 'H' && sexo !== 'M') {
            curpError.textContent = 'El identificador del sexo en la CURP debe ser H (Hombre) o M (Mujer).';
        }

        const estadosValidos = ['AS', 'BC', 'BS', 'CC', 'CL', 'CM', 'CS', 'CH', 'DF', 'DG', 'GT', 'GR', 'HG', 'JC', 'MC', 'MN', 'MS', 'NT', 'NL', 'OC', 'PL', 'QT', 'QR', 'SP', 'SL', 'SR', 'TC', 'TS', 'TL', 'VZ', 'YN', 'ZS', 'NE'];
        const estado = curp.substring(11, 13);
        if (!estadosValidos.includes(estado)) {
            curpError.textContent = 'El identificador del estado en la CURP no es válido.';
        }

        const fecha = curp.substring(4, 10);
        const fechaRegex = /^\d{6}$/;
        if (!fechaRegex.test(fecha)) {
            curpError.textContent = 'Los dígitos de la fecha en la CURP no son válidos.';
        } else {
            const edad = calcularEdad(fecha);
            if (curpError.textContent === '') {
                resultado.innerHTML += `<p><strong>CURP:</strong> ${curp}</p>
                                        <p><strong>Edad:</strong> ${edad} años</p>`;
            }
        }
    }

    if (rfc.length !== 13) {
        rfcError.textContent = rfc.length < 13 ? 'El RFC debe tener exactamente 13 caracteres. Faltan ' + (13 - rfc.length) + ' caracteres.' : 'El RFC debe tener exactamente 13 caracteres. Sobran ' + (rfc.length - 13) + ' caracteres.';
    } else {
        const letrasRFC = /^[A-Z]{4}/;
        if (!letrasRFC.test(rfc.substring(0, 4))) {
            rfcError.textContent = 'Los primeros 4 caracteres del RFC deben ser letras.';
        }

        if (rfcError.textContent === '') {
            resultado.innerHTML += `<p><strong>RFC:</strong> ${rfc}</p>`;
        }
    }

    if (curp.length === 18 && rfc.length === 13 && curpError.textContent === '' && rfcError.textContent === '') {
        const curpPartePersona = curp.substring(0, 10); 
        const rfcPartePersona = rfc.substring(0, 10);   

        if (curpPartePersona !== rfcPartePersona) {
            alert('Error: El CURP y RFC no coinciden. Por favor, verifica los datos.');
        } else {
            alert('CURP y RFC válidos y coinciden.');
        }
    }
}
