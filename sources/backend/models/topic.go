package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Topic struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Code        string             `bson:"code" json:"code"`
	Title       string             `bson:"title" json:"title"`
	Lessons     []string           `bson:"lessons" json:"lessons"`
	Traits      []string           `bson:"treaits" json:"traits"`
	Description string             `bson:"description" json:"description"`
}
