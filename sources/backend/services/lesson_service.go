package services

import (
	"context"

	"github.com/study/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type LessonService struct {
	db *mongo.Database
}

func NewLessonService(db *mongo.Database) *LessonService {
	return &LessonService{db: db}
}

func (s *LessonService) GetLessons() ([]models.Lesson, error) {
	collection := s.db.Collection("lessons")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	var lessons []models.Lesson
	if err = cursor.All(context.Background(), &lessons); err != nil {
		return nil, err
	}
	return lessons, nil
}

func (s *LessonService) GetLessonByID(code string) ([]models.Lesson, error) {
	collection := s.db.Collection("lessons")
	filter := bson.M{"code": code}
	result, err := collection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}

	if result.Err() != nil {
		return nil, result.Err()
	}

	var lessons []models.Lesson
	if err = result.All(context.Background(), &lessons); err != nil {
		return nil, err
	}

	return lessons, nil
}
