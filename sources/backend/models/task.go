package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Task struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Code       string             `bson:"code" json:"code"`
	Title      string             `bson:"title" json:"title"`
	Content    string             `bson:"content" json:"content"`
	LessonId   []interface{}      `bson:"lesson_id" json:"lesson_id,omitempty"`
	Supplement []Supplement       `bson:"supplement" json:"supplement"`
	Difficulty int                `bson:"difficulty" json:"difficulty"`
	Time       int                `bson:"time" json:"time"`
}
