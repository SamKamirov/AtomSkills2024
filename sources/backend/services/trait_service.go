package services

import (
	"context"

	"github.com/study/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type TraitService struct {
	db *mongo.Database
}

func NewTraitService(db *mongo.Database) *TraitService {
	return &TraitService{db: db}
}

func (s *TraitService) GetTraits() ([]models.Trait, error) {
	collection := s.db.Collection("traits")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	var traits []models.Trait
	if err = cursor.All(context.Background(), &traits); err != nil {
		return nil, err
	}
	return traits, nil
}

func (s *TraitService) GetTraitByID(code string) ([]models.Trait, error) {
	collection := s.db.Collection("traits")
	filter := bson.M{"code": code}
	result, err := collection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}

	if result.Err() != nil {
		return nil, result.Err()
	}

	var traits []models.Trait
	if err = result.All(context.Background(), &traits); err != nil {
		return nil, err
	}

	return traits, nil
}
