export function formatFileName(fileName: string, maxLength: number) {
	if (fileName.length < maxLength) {
		return fileName
	}

	return `${fileName.slice(0, 4)}...${fileName.slice(-8)}`
}

export const getCurrentYear = new Date().getFullYear()
