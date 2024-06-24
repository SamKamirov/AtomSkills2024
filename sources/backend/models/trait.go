package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Trait struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Code        string             `bson:"code" json:"code"`
	Name        string             `bson:"name" json:"name"`
	Description string             `bson:"description" json:"description"`
}
