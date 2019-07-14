export function debug(message: any) {
	console.log(message);
}

export function critical(message: any) {
	console.log(`CRITICAL_ALERT:`, message);
}
