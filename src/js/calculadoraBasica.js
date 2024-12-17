// Bandera para indicar si se muestra un resultado en el display
let isResultShown = false;

// Función para añadir valores al display
function appendValue(value) {
    const display = document.getElementById('display');
    const currentValue = display.value;

    // Definir operadores (incluyendo paréntesis)
    const operators = ['+', '-', '/', '*', '(', ')'];

    // Si se muestra un resultado y el usuario presiona un número, comenzamos una nueva operación
    if (isResultShown && !operators.includes(value) && value !== '.') {
        display.value = ''; // Borrar el display
        isResultShown = false; // Reiniciar la bandera
    }

    // Si se muestra un resultado y el usuario presiona un operador, continuar con el resultado
    if (isResultShown && operators.includes(value)) {
        isResultShown = false; // Permitir continuar con el resultado
    }

    // Verificamos si el valor a agregar es un operador
    if (operators.includes(value)) {
        // Verificamos si el último carácter es un operador
        const lastChar = currentValue.slice(-1);
        if (operators.includes(lastChar) && value !== '(' && lastChar !== ')') {
            return; // No permitir operadores seguidos, salvo paréntesis
        }
    }

    // Si el valor es un punto decimal, evitar que se repita en el mismo número
    if (value === '.') {
        const lastNumber = currentValue.split(/[\+\-\×\÷\(\)]/).pop(); // Tomar el último número
        if (lastNumber.includes('.')) {
            return; // No permitir punto decimal repetido
        }
    }

    // Reemplazar los valores para que el display muestre "÷" y "×" en lugar de "/" y "*"
    if (value === '/') {
        display.value += '÷';
    } else if (value === '*') {
        display.value += '×';
    } else {
        display.value += value;
    }
}

// Función para borrar todo
function clearDisplay() {
    document.getElementById('display').value = '';
    isResultShown = false; // Reiniciar bandera al limpiar
}

// Función para borrar el último carácter
function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
    isResultShown = false; // Reiniciar bandera al borrar
}

// Función para calcular la expresión
function calculate() {
    const display = document.getElementById('display');
    let expression = display.value;

    // Verificar si el display está vacío
    if (expression === '') {
        return; // No hacer nada si está vacío
    }

    try {
        // Reemplazamos los símbolos '÷' y '×' por '/' y '*' antes de evaluar
        expression = expression.replace(/÷/g, '/').replace(/×/g, '*');

        // Validar que no haya una división por cero en la expresión
        if (/\/0(?!\.\d*)/.test(expression)) {
            showAlert('error', 'Error', 'No se puede dividir entre cero');
            return;
        }

        // Evaluamos la expresión con Math.js
        const result = math.evaluate(expression);
        display.value = result;

        isResultShown = true; // Marcar que se mostró el resultado
    } catch (e) {
        // Si hay un error en la operación, mostramos el SweetAlert sin modificar el display
        showAlert('error', 'Error de formato', 'La operación no es válida');
    }
}

// Función genérica para mostrar SweetAlert
function showAlert(icon, title, text) {
    Swal.fire({
        icon,
        title,
        text,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#FF5733',
        background: '#2C3E50',
        iconColor: '#FF5733',
        customClass: {
            popup: 'custom-popup',
            title: 'custom-title',
            content: 'custom-content',
            confirmButton: 'custom-btn'
        },
        width: '300px'
    });
}
