package main

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func deleteTeacher(collection *mongo.Collection, ctx context.Context, data map[string]interface{}) (map[string]interface{}, error) {

	_, err := collection.DeleteOne(ctx, bson.M{"teacher_id": data["teacher_id"]})

	if err != nil {
		return nil, err
	}

	res := map[string]interface{}{
		"data": "Document deleted successfully.",
	}

	return res, nil
}
