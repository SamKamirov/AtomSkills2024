package services

import (
	"context"

	"github.com/study/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type TopicService struct {
	db *mongo.Database
}

func NewTopicService(db *mongo.Database) *TopicService {
	return &TopicService{db: db}
}

func (s *TopicService) GetTopics() ([]models.Topic, error) {
	collection := s.db.Collection("topics")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	var topics []models.Topic
	if err = cursor.All(context.Background(), &topics); err != nil {
		return nil, err
	}
	return topics, nil
}

func (s *TopicService) GetTopicByID(code string) ([]models.Topic, error) {
	collection := s.db.Collection("topics")
	filter := bson.M{"code": code}
	result, err := collection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}

	if result.Err() != nil {
		return nil, result.Err()
	}

	var topics []models.Topic
	if err = result.All(context.Background(), &topics); err != nil {
		return nil, err
	}

	return topics, nil
}
