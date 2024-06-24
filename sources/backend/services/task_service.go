package services

import (
	"context"

	"github.com/study/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type TaskService struct {
	db *mongo.Database
}

func NewTaskService(db *mongo.Database) *TaskService {
	return &TaskService{db: db}
}

func (s *TaskService) GetTasks() ([]models.Task, error) {
	collection := s.db.Collection("tasks")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	var tasks []models.Task
	if err = cursor.All(context.Background(), &tasks); err != nil {
		return nil, err
	}
	return tasks, nil
}

func (s *TaskService) GetTaskByID(code string) ([]models.Task, error) {
	collection := s.db.Collection("tasks")
	filter := bson.M{"code": code}
	result, err := collection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}

	if result.Err() != nil {
		return nil, result.Err()
	}

	var tasks []models.Task
	if err = result.All(context.Background(), &tasks); err != nil {
		return nil, err
	}

	return tasks, nil
}
