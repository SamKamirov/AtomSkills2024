package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Supplement struct {
	Title string `bson:"title" json:"title"`
	File  string `bson:"file" json:"file"`
}

type Lesson struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Code       string             `bson:"code" json:"code"`
	Title      string             `bson:"title" json:"title"`
	Content    string             `bson:"content" json:"content"`
	Traits     []string           `bson:"traits" json:"traits"`
	TopicId    interface{}        `bson:"topicId" json:"topic_id,omitempty"`
	Supplement []Supplement       `bson:"supplement" json:"supplement"`
	Tasks      []string           `bson:"tasks" json:"tasks"`
	Author     string             `bson:"author" json:"author"`
}
