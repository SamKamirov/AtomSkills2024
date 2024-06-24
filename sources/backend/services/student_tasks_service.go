package services

import (
	"context"
	// "time"

	"github.com/study/models"
	// "github.com/study/utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type StudentTasksService struct {
	db *mongo.Database
}

func NewStudentTasksService(db *mongo.Database) *StudentTasksService {
	return &StudentTasksService{db: db}
}

func (s *StudentTasksService) CreateStudentTasks(student_tasks models.StudentTasks) error {
	collection := s.db.Collection("student_tasks")
	_, err := collection.InsertOne(context.Background(), student_tasks)
	// task := utils.GetTasks(s.db, student_tasks.Tasks[0].Code)
	// utils.CloseTaskAfterTime(collection, time.Minute * time.Duration(task.Time), task.Code)
	return err
}

func (s *StudentTasksService) GetStudentTasks() ([]models.StudentTasks, error) {
	collection := s.db.Collection("student_tasks")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	var student_tasks []models.StudentTasks
	if err = cursor.All(context.Background(), &student_tasks); err != nil {
		return nil, err
	}
	return student_tasks, nil
}

func (s *StudentTasksService) GetStudentTasksByID(code string) ([]models.StudentTasks, error) {
	collection := s.db.Collection("student_tasks")
	filter := bson.M{"code": code}
	result, err := collection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}

	if result.Err() != nil {
		return nil, result.Err()
	}

	var student_tasks []models.StudentTasks
	if err = result.All(context.Background(), &student_tasks); err != nil {
		return nil, err
	}

	return student_tasks, nil
}

func (s *StudentTasksService) UpdateStudentTasks(id string, student_tasks models.StudentTasks) error {
	collection := s.db.Collection("student_tasks")
	filter := bson.M{"_id": id}
	update := bson.M{"$set": student_tasks}
	_, err := collection.UpdateOne(context.Background(), filter, update)
	return err
}

func (s *StudentTasksService) DeleteStudentTasks(id string) error {
	collection := s.db.Collection("student_tasks")
	_, err := collection.DeleteOne(context.Background(), bson.M{"_id": id})
	return err
}
