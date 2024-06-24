package utils

import (
	"context"

	"github.com/study/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetTasks(db *mongo.Database, code string) models.Task {
	coll := db.Client().Database("study").Collection("tasks")

	filter := bson.D{{"code", code}}

	res := coll.FindOne(context.Background(), filter)

	var task models.Task
	res.Decode(task)

	return task
}