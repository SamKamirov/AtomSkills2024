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





type RawTaskData struct {
	RawFileData
	RawTasks []fs.DirEntry
}

func (RT *RawTaskData) LoadRawTasks() {
	for _, file := range RT.Files {
		if strings.Contains(file.Name(), "tsk") {
			RT.RawTasks = append(RT.RawTasks, file)
		}
	}
}

func (RT *RawTaskData) ToJSON() ([]models.Task, error){
	var tasks []models.Task
	
	for _, task := range RT.RawTasks {
		var topicPath string = fmt.Sprintf("%s/%s", DataDir, task.Name())
		if task.IsDir() {
			topicPath = fmt.Sprintf("%s/%s/%s.json", DataDir, task.Name(), task.Name())
		}
		
		jsonFile, err := os.Open( topicPath)

		if err != nil {
			return tasks, err
		}

		jsonData, err := io.ReadAll(jsonFile)

		if err != nil {
			return tasks, err
		}
		var task models.Task
		
		err = json.Unmarshal(jsonData, &task)

		if err != nil {
			return tasks, err
		}

		tasks = append(tasks, task)

		defer jsonFile.Close()
	}
	return tasks, nil
}

