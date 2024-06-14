package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Teacher struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	FIO      string             `bson:"fio" json:"fio"`
	Age      int                `bson:"age" json:"age"`
	Courses  []string           `bson:"courses" json:"courses"`
	Schedule string             `bson:"schedule" json:"schedule"`
}
