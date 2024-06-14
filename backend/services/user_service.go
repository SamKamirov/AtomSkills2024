package services

import (
	"context"

	"github.com/study/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserService struct {
	db *mongo.Database
}

func NewUserService(db *mongo.Database) *UserService {
	return &UserService{db: db}
}

func (s *UserService) CreateUser(user models.User) error {
	collection := s.db.Collection("users")
	_, err := collection.InsertOne(context.Background(), user)
	return err
}

func (s *UserService) GetUserByUsername(username string) (*models.User, error) {
	collection := s.db.Collection("users")
	var user models.User
	err := collection.FindOne(context.Background(), bson.M{"username": username}).Decode(&user)
	return &user, err
}

func (s *UserService) UpdateUserRole(id string, role string) error {
	collection := s.db.Collection("users")
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"role": role}}
	_, err := collection.UpdateOne(context.Background(), filter, update)
	return err
}
