package utils

import (
	"fmt"
	"io"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

func MoveAllFiles(imgsDir string, destDir string) error {
	files, err := os.ReadDir(imgsDir)

	if err != nil {
		panic(err)
	}

	for _, file := range files {
		path := fmt.Sprintf("%s/%s",imgsDir, file.Name())
		if file.IsDir() {
			MoveAllFiles(path, destDir)
		} else if isFile(file) {
			srcFile, err := os.Open(path)
			if err != nil {
				return err
			}
			defer srcFile.Close()

			destFile, err := os.Create(filepath.Join(destDir, file.Name()))
			if err != nil {
				return err
			}
			defer destFile.Close()

			_, err = io.Copy(destFile, srcFile)

			if err != nil {
				return err
			}
		}
	}

	return nil
}

func isFile(file fs.DirEntry) bool {
	ext := filepath.Ext(strings.ToLower(file.Name()))
	return ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".mp4" || ext == ".webm" || ext == ".svg"
}