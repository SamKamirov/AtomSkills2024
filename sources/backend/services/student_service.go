package services

import (
	"context"

	"github.com/study/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type StudentService struct {
	db *mongo.Database
}

func NewStudentService(db *mongo.Database) *StudentService {
	return &StudentService{db: db}
}

func (s *StudentService) GetUserByUsername(username string) (*models.Student, error) {
	collection := s.db.Collection("students")
	var student models.Student
	err := collection.FindOne(context.Background(), bson.M{"username": username}).Decode(&student)
	return &student, err
}

func (s *StudentService) CreateStudent(student models.Student) error {
	collection := s.db.Collection("students")
	_, err := collection.InsertOne(context.Background(), student)
	return err
}

func (s *StudentService) GetStudents() ([]models.Student, error) {
	collection := s.db.Collection("students")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	var students []models.Student
	if err = cursor.All(context.Background(), &students); err != nil {
		return nil, err
	}
	return students, nil
}

func (s *StudentService) GetStudentByID(code string) ([]models.Student, error) {
	collection := s.db.Collection("students")
	filter := bson.M{"code": code}
	result, err := collection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}

	if result.Err() != nil {
		return nil, result.Err()
	}

	var students []models.Student
	if err = result.All(context.Background(), &students); err != nil {
		return nil, err
	}

	return students, nil
}

func (s *StudentService) UpdateStudent(id string, student models.Student) error {
	collection := s.db.Collection("students")
	filter := bson.M{"_id": id}
	update := bson.M{"$set": student}
	_, err := collection.UpdateOne(context.Background(), filter, update)
	return err
}

func (s *StudentService) DeleteStudent(id string) error {
	collection := s.db.Collection("students")
	_, err := collection.DeleteOne(context.Background(), bson.M{"_id": id})
	return err
}
