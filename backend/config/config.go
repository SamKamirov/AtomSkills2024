package config

import (
	"context"
	"time"

	"github.com/study/models"
	"github.com/study/utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func InitDB() (*mongo.Database, error) {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		return nil, err
	}

	db := client.Database("study")

	// Проверка и создание администратора
	userCollection := db.Collection("users")
	var admin models.User
	err = userCollection.FindOne(ctx, bson.M{"username": "admin"}).Decode(&admin)
	if err == mongo.ErrNoDocuments {
		passwordHash, _ := utils.HashPassword("adminpassword")
		admin = models.User{
			Username: "admin",
			Password: passwordHash,
			Role:     models.RoleAdmin,
		}
		userCollection.InsertOne(ctx, admin)
	} else if err != nil {
		return nil, err
	}

	return db, nil
}
