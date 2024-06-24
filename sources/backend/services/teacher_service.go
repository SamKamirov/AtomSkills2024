package services

import (
	"context"

	"github.com/study/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type TeacherService struct {
	db *mongo.Database
}

func NewTeacherService(db *mongo.Database) *TeacherService {
	return &TeacherService{db: db}
}

func (s *TeacherService) GetUserByUsername(username string) (*models.Teacher, error) {
	collection := s.db.Collection("teachers")
	var teacher models.Teacher
	err := collection.FindOne(context.Background(), bson.M{"username": username}).Decode(&teacher)
	return &teacher, err
}

func (s *TeacherService) CreateTeacher(teacher models.Teacher) error {
	collection := s.db.Collection("teachers")
	_, err := collection.InsertOne(context.Background(), teacher)
	return err
}

func (s *TeacherService) GetTeachers() ([]models.Teacher, error) {
	collection := s.db.Collection("teachers")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	var teachers []models.Teacher
	if err = cursor.All(context.Background(), &teachers); err != nil {
		return nil, err
	}
	return teachers, nil
}

func (s *TeacherService) GetTeacherByID(code string) ([]models.Teacher, error) {
	collection := s.db.Collection("teachers")
	filter := bson.M{"code": code}
	result, err := collection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}

	if result.Err() != nil {
		return nil, result.Err()
	}

	var teachers []models.Teacher
	if err = result.All(context.Background(), &teachers); err != nil {
		return nil, err
	}

	return teachers, nil
}

func (s *TeacherService) UpdateTeacher(id string, teacher models.Teacher) error {
	collection := s.db.Collection("teachers")
	filter := bson.M{"_id": id}
	update := bson.M{"$set": teacher}
	_, err := collection.UpdateOne(context.Background(), filter, update)
	return err
}

func (s *TeacherService) DeleteTeacher(id string) error {
	collection := s.db.Collection("teachers")
	_, err := collection.DeleteOne(context.Background(), bson.M{"_id": id})
	return err
}
