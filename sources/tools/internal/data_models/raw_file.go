package datamodels

import (
	"fmt"
	"io/fs"
	"log"
	"os"

	"github.com/joho/godotenv"
)

type RawFileData struct {
	Files []fs.DirEntry
}




var DataDir string = "test_data"

func init() {
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}

	prod, exists := os.LookupEnv("PRODUCTION")
	fmt.Println(prod, exists)
	if exists && prod=="true" {
		DataDir = "data"
	}
}

