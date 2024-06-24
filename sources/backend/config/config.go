package config

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/study/models"
	"github.com/study/utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func InitDB() (*mongo.Database, error) {
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}

	var clientOptions *options.ClientOptions

	mongodb_uri, exists := os.LookupEnv("MONGODB_URI")

	if exists {
		clientOptions = options.Client().ApplyURI(mongodb_uri)
	}

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
