package main

import (
	"context"
	"encoding/json"
	"fmt"
	_ "log"
	"net/http"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	dbUser = "mongo_db_admin"
	dbPass = "EXAMPLE_PASSWORD"
	dbName = "study"
)

func main() {
	mux := http.NewServeMux() 
 mux.HandleFunc("/api/teachers", requestHandler) 
 
 cors := cors.New(cors.Options{ 
  AllowedOrigins: []string{"*"}, 
  AllowedMethods: []string{ 
   http.MethodPost, 
   http.MethodGet, 
   http.MethodDelete, 
  }, 
  AllowedHeaders: []string{"*"}, 
 }) 
 
 handler := cors.Handler(mux) 
 http.ListenAndServe(":8082", handler)
}

func requestHandler(w http.ResponseWriter, req *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	response := map[string]interface{}{}

	ctx := context.Background()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))

	if err != nil {
		fmt.Println(err.Error())
	}

	collection := client.Database(dbName).Collection("teachers")

	data := map[string]interface{}{}

	err = json.NewDecoder(req.Body).Decode(&data)

	if err != nil {
		fmt.Println(err.Error())
	}

	switch req.Method {
	case "POST":
		response, err = createTeacher(collection, ctx, data)
	case "GET":
		response, err = getTeachers(collection, ctx)
	case "PUT":
		response, err = updateTeachers(collection, ctx, data)
	case "DELETE":
		response, err = deleteTeacher(collection, ctx, data)
	}

	if err != nil {
		response = map[string]interface{}{"error": err.Error()}
	}

	enc := json.NewEncoder(w)
	enc.SetIndent("", "  ")

	if err := enc.Encode(response); err != nil {
		fmt.Println(err.Error())
	}
}
