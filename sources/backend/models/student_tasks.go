package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Tasks struct {
	Code       string       `bson:"code" json:"code"`
	Status     string       `bson:"status" json:"status"`
	Mark       int          `bson:"mark" json:"mark"`
	Comment    string       `bson:"comment" json:"comment"`
	Supplement []Supplement `bson:"supplement" json:"supplement"`
}

type StudentTasks struct {
	ID      primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Code    string             `bson:"code" json:"code"`
	Student string             `bson:"student" json:"student"`
	Tasks   []Tasks            `bson:"tasks" json:"tasks"`
}
