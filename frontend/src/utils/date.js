export const formatDate = (dateString) => {
	const date = new Date(dateString);
	if (isNaN(date.getTime())) {
		return "Data Inválida";
	}

	return date.toLocaleString("pt-BR", {
		year: "numeric",
		month: "short", // "short" exibe "fev.", "long" exibe "fevereiro"
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false, // Formato 24h
	});
};
