package utils

import (
	"regexp"
	"strings"
)

func FormatMDToNormal(text *string) {
	*text = strings.ReplaceAll(*text, "<br>", "\n")
	replacePathInFiles(text)
}	

func replacePathInFiles(text *string) {
	imgLinks := findAllImagesInMD(*text)
	for _, link := range imgLinks {
		var buf strings.Builder
		buf.WriteString("http://localhost:8082/resources/")
		buf.WriteString(link)
		*text = strings.ReplaceAll(*text, link,  buf.String())
	}

	vidLinks := findAllVideosInMD(*text)
	for _, link := range vidLinks {
		var buf strings.Builder
		buf.WriteString("http://localhost:8082/resources/")
		buf.WriteString(link)
		*text = strings.ReplaceAll(*text, link,  buf.String())
	}


}

func findAllImagesInMD(text string) []string {
	re := regexp.MustCompile(`!\[(.*?)\]\((.*?)\.(jpg|png|jpeg)\)`)
	var imageLinks []string
	matches := re.FindAllStringSubmatch(text, -1)
    for _, match := range matches {
        imageLinks = append(imageLinks, match[2]) 
    }

	return imageLinks
}


func findAllVideosInMD(text string) []string {
	re := regexp.MustCompile(`!\[(.*?)\]\((.*?)\.(mp4)\)`)
	var videoLinks []string
	matches := re.FindAllStringSubmatch(text, -1)
    for _, match := range matches {
        videoLinks = append(videoLinks, match[2]) 
    }

	return videoLinks
}

func AddPathToImage(src string) string {
	var buf strings.Builder
	
	buf.WriteString("images/")

	buf.WriteString(src)

	return buf.String()
}