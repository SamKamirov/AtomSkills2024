package main

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func getTeachers(collection *mongo.Collection, ctx context.Context) (map[string]interface{}, error) {

	cur, err := collection.Find(ctx, bson.D{})

	if err != nil {
		return nil, err
	}

	defer cur.Close(ctx)

	var teachers []bson.M

	for cur.Next(ctx) {

		var teacher bson.M

		if err = cur.Decode(&teacher); err != nil {
			return nil, err
		}

		teachers = append(teachers, teacher)

	}

	res := map[string]interface{}{}

	res = map[string]interface{}{
		"data": teachers,
	}

	return res, nil
}
