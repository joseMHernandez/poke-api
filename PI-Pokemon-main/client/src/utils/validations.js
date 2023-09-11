export const validateForm = (object) => {
	if (object.Type.length === 0) return 'El pokemon debe tener algun tipo.'
	const regex = /[^A-Za-z]/
	if (regex.test(object.Nombre)) return 'Verifica el nombre.'
	const numericProperties = ['Vida', 'Ataque', 'Defensa', 'Velocidad', 'Altura', 'Peso']
	for (const prop of numericProperties) {
		if ((object[prop] !== '' && isNaN(Number(object[prop]))) || object[prop].length > 3) {
			return `Verifica que ${prop} sea un valor numerico menor a 1000`
		}
	}
	return ''
}

export const validateInput = (input) => {
	if (!isNaN(parseFloat(input)) && isFinite(input)) {
		return true
	}
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
	if (uuidRegex.test(input)) {
		return true
	}

	return false
}
