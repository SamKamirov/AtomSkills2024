package utils

import (
	"context"
	"os"

	"github.com/study/config"
	"github.com/study/models"
	datamodels "github.com/tools/internal/data_models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func UploadDataFromFolderToDB() {
	db, err := config.InitDB()

	if err != nil {
		panic(err)
	}
	err = MoveAllFiles(datamodels.DataDir, "../backend/store/resources")

	if err != nil {
		panic(err)
	}

	err = uploadTopics(db)
	if err != nil {
		panic(err)
	}

	err = uploadTraits(db)
	if err != nil {
		panic(err)
	}
}

func uploadTopics(db *mongo.Database) error {
	coll := db.Client().Database("study").Collection("topics")
	var rawTopic datamodels.RawTopicData
	files, err := os.ReadDir(datamodels.DataDir)

	if err != nil {
		panic(err)
	}

	rawTopic.Files = files
	rawTopic.LoadRawTopics()

	topics, err := rawTopic.ToJSON()

	if err != nil {
		return err
	}

	for _, topic := range topics {
		result, err := coll.InsertOne(context.TODO(), models.Topic{
			Code:        topic.Code,
			Title:       topic.Title,
			Description: topic.Description,
			Lessons:     topic.Lessons,
			Traits:      topic.Traits,
		})
		if err != nil {
			return err
		}

		err = uploadLesson(db, topic, result.InsertedID)

		if err != nil {
			return err
		}
	}

	return nil
}

func uploadLesson(db *mongo.Database, topic models.Topic, topic_id interface{}) error {
	coll := db.Client().Database("study").Collection("lessons")
	var rawLesson datamodels.RawLessonData
	files, err := os.ReadDir(datamodels.DataDir)

	if err != nil {
		panic(err)
	}

	rawLesson.Files = files
	rawLesson.LoadRawLessons()
	lessons, err := rawLesson.ToJSON()

	if err != nil {
		return err
	}


	for _, lesson := range lessons {
		
		if findCodeInArray(lesson.Code, topic.Lessons) {
			FormatMDToNormal(&lesson.Content)
			_, err := coll.InsertOne(context.TODO(), models.Lesson{
				Code:       lesson.Code,
				Supplement: modifySupplement(lesson.Supplement),
				Title:      lesson.Title,
				Content:    lesson.Content,
				Author:     lesson.Author,
				TopicId:    topic_id,
				Traits:     lesson.Traits,
				Tasks:      lesson.Tasks,
			})
			if err != nil {
				return err
			}

			err = uploadTask(db, lesson)

			if err != nil {
				return err
			}
		}

	}

	return nil
}

func uploadTask(db *mongo.Database, lesson models.Lesson) error {
	coll := db.Client().Database("study").Collection("tasks")
	var rawTask datamodels.RawTaskData
	files, err := os.ReadDir(datamodels.DataDir)

	if err != nil {
		panic(err)
	}

	rawTask.Files = files
	rawTask.LoadRawTasks()
	tasks, err := rawTask.ToJSON()

	if err != nil {
		return err
	}

	for _, task := range tasks {
		if findCodeInArray(task.Code, lesson.Tasks) {
			if !checkTaskIsExists(db, task.Code) {
				FormatMDToNormal(&task.Content)
				_, err := coll.InsertOne(context.TODO(), models.Task{
					
					Code:       task.Code,
					Supplement: modifySupplement(task.Supplement),
					Title:      task.Title,
					Content:    task.Content,
					Difficulty: task.Difficulty,
					Time:       task.Time,
				})
				if err != nil {
					return err
				}
			}
		}

	}

	return nil
}

func uploadTraits(db *mongo.Database) error {
	coll := db.Client().Database("study").Collection("traits")
	var rawTrait datamodels.RawTraitData
	files, err := os.ReadDir(datamodels.DataDir)

	if err != nil {
		panic(err)
	}

	rawTrait.Files = files
	rawTrait.LoadRawTraits()

	traits, err := rawTrait.ToJSON()

	if err != nil {
		return err
	}

	for _, trait := range traits {
		_, err := coll.InsertOne(context.TODO(), models.Trait{
			Code:        trait.Code,
			Name:        trait.Name,
			Description: trait.Description,
		})
		if err != nil {
			return err
		}
	}

	return nil
}

func checkTaskIsExists(db *mongo.Database, taskCode string) bool {
	// return true
	coll := db.Client().Database("study").Collection("tasks")
	filter := bson.M{"code": taskCode}

	var result models.Task

	err := coll.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		return false
	}

	if result.Code != "" {
		return true
	}

	return false
}


func modifySupplement(sups []models.Supplement) []models.Supplement {
	var suppls []models.Supplement
	for _, sup := range sups {
		suppls = append(suppls, struct {
			Title string "bson:\"title\" json:\"title\""
			File  string "bson:\"file\" json:\"file\""
		}{
			Title: sup.Title,
			File:  AddPathToImage(sup.File),
		})

	}
	return suppls
}