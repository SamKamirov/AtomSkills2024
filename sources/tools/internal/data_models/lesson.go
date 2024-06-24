package datamodels

import (
	"encoding/json"
	"fmt"
	"io"
	"io/fs"

	"os"
	"strings"

	"github.com/study/models"
)





type RawLessonData struct {
	RawFileData
	RawLessons []fs.DirEntry
}

func (RT *RawLessonData) LoadRawLessons() {
	for _, file := range RT.Files {
		if strings.Contains(file.Name(), "lsn") {
			RT.RawLessons = append(RT.RawLessons, file)
		}
	}
}

func (RT *RawLessonData) ToJSON() ([]models.Lesson, error){
	var lessons []models.Lesson
	
	for _, lesson := range RT.RawLessons {
		var topicPath string = fmt.Sprintf("%s/%s", DataDir, lesson.Name())
		if lesson.IsDir() {
			topicPath = fmt.Sprintf("%s/%s/%s.json", DataDir, lesson.Name(), lesson.Name())
		}
		
		jsonFile, err := os.Open( topicPath)

		if err != nil {
			return lessons, err
		}

		jsonData, err := io.ReadAll(jsonFile)

		if err != nil {
			return lessons, err
		}
		var lesson models.Lesson
		
		err = json.Unmarshal(jsonData, &lesson)

		if err != nil {
			return lessons, err
		}

		lessons = append(lessons, lesson)

		defer jsonFile.Close()
	}
	return lessons, nil
}

