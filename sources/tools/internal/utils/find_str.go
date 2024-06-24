package utils

func findCodeInArray(code string, array []string) bool {
	for _, el := range array {
		if code == el {
			return true
		}
	}
	return false
}