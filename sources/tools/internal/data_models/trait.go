package datamodels

import (
	"encoding/json"
	"fmt"
	"io"
	
	"os"
	"strings"
	"github.com/study/models"
)

type RawTraitData struct {
	RawFileData
	RawTraits []string
}

func (RT *RawTraitData) LoadRawTraits() {
	for _, file := range RT.Files {
		if strings.Contains(file.Name(), "traits") {
			RT.RawTraits = append(RT.RawTraits, file.Name())
		}
	}
}

func (RT *RawTraitData) ToJSON() ([]models.Trait, error){
	var traits []models.Trait
	
	for _, trait := range RT.RawTraits {
		var traitPath string = fmt.Sprintf("%s/%s", DataDir, trait)
		jsonFile, err := os.Open(traitPath)

		if err != nil {
			return traits, err
		}

		jsonData, err := io.ReadAll(jsonFile)

		if err != nil {
			return traits, err
		}
		err = json.Unmarshal(jsonData, &traits)

		if err != nil {
			return traits, err
		}


		defer jsonFile.Close()
	}
	return traits, nil
}