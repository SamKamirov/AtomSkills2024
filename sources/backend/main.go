package main

import (
	"log"
	"os"

	"github.com/study/config"
	"github.com/study/routes"
	"github.com/study/utils"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Настройка CORS
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	corsConfig.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Access-Control-Allow-Origin"}
	router.Use(cors.New(corsConfig))

	// Инициализация базы данных
	db, err := config.InitDB()
	if err != nil {
		log.Fatal(err)
	}

	// Настройка маршрутов
	routes.RegisterRoutes(router, db)

	// CSRF Middleware
	//router.Use(utils.CSRFMiddleware())

	// OAuth 2.0 Middleware
	router.Use(utils.OAuth2Middleware())

	// Запуск сервера
	port := "8082"
	if p := os.Getenv("PORT"); p != "" {
		port = p
	}
	err = router.Run(":" + port)
	if err != nil {
		log.Fatal(err)
	}
}
