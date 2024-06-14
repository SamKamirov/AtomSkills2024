package routes

import (
	"github.com/study/controllers"
	"github.com/study/models"
	"github.com/study/services"
	"github.com/study/utils"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func RegisterRoutes(router *gin.Engine, db *mongo.Database) {
	userService := services.NewUserService(db)
	teacherService := services.NewTeacherService(db)

	authController := controllers.NewAuthController(userService)
	userController := controllers.NewUserController(userService)
	teacherController := controllers.NewTeacherController(teacherService)

	authRoutes := router.Group("/auth")
	{
		authRoutes.POST("/register", authController.Register)
		authRoutes.POST("/login", authController.Login)
	}

	userRoutes := router.Group("/users")
	userRoutes.Use(utils.OAuth2Middleware())
	{
		userRoutes.PUT("/:id/assign-role", utils.RoleAuth(models.RoleAdmin), userController.AssignRole)
	}

	teacherRoutes := router.Group("/teachers")
	teacherRoutes.Use(utils.OAuth2Middleware())
	{
		teacherRoutes.POST("/", utils.RoleAuth(models.RoleAdmin, models.RoleFullPermission), teacherController.CreateTeacher)
		teacherRoutes.GET("/", utils.RoleAuth(models.RoleAdmin, models.RoleFullPermission, models.RoleViewAndEdit, models.RoleViewOnly), teacherController.GetTeachers)
		teacherRoutes.PUT("/:id", utils.RoleAuth(models.RoleAdmin, models.RoleFullPermission), teacherController.UpdateTeacher)
		teacherRoutes.DELETE("/:id", utils.RoleAuth(models.RoleAdmin, models.RoleFullPermission), teacherController.DeleteTeacher)
	}
}
