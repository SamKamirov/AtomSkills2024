package datamodels

import (
	"encoding/json"
	"fmt"
	"io"
	
	"os"
	"strings"
	"github.com/study/models"
)





type RawTopicData struct {
	RawFileData
	RawTopics []string
}

func (RT *RawTopicData) LoadRawTopics() {
	for _, file := range RT.Files {
		if strings.Contains(file.Name(), "topic") {
			RT.RawTopics = append(RT.RawTopics, file.Name())
		}
	}
}

func (RT *RawTopicData) ToJSON() ([]models.Topic, error){
	var topics []models.Topic
	
	for _, topic := range RT.RawTopics {
		var topicPath string = fmt.Sprintf("%s/%s", DataDir, topic)
		jsonFile, err := os.Open( topicPath)

		if err != nil {
			return topics, err
		}

		jsonData, err := io.ReadAll(jsonFile)

		if err != nil {
			return topics, err
		}
		var topic models.Topic
		
		err = json.Unmarshal(jsonData, &topic)

		if err != nil {
			return topics, err
		}

		topics = append(topics, topic)

		defer jsonFile.Close()
	}
	return topics, nil
}

