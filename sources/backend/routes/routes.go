package routes

import (
	"net/http"

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
	studentService := services.NewStudentService(db)
	studentTasksService := services.NewStudentTasksService(db)
	lessonService := services.NewLessonService(db)
	taskService := services.NewTaskService(db)
	topicService := services.NewTopicService(db)
	traitService := services.NewTraitService(db)

	authController := controllers.NewAuthController(userService)
	//userController := controllers.NewUserController(userService)
	teacherController := controllers.NewTeacherController(teacherService)
	studentController := controllers.NewStudentController(studentService)
	studentTasksController := controllers.NewStudentTasksController(studentTasksService)
	lessonController := controllers.NewLessonController(lessonService)
	taskController := controllers.NewTaskController(taskService)
	topicController := controllers.NewTopicController(topicService)
	traitController := controllers.NewTraitController(traitService)
	externalServiceController := controllers.NewExternalServiceController()

	router.Static("/resources", "./store/resources/")

	router.GET("/csrf-token", func(c *gin.Context) {
		token, err := utils.GenerateCSRFToken()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate CSRF token"})
			return
		}
		c.Header("X-CSRF-Token", token)
		c.JSON(http.StatusOK, gin.H{"csrf_token": token})
	})

	loginRoutes := router.Group("/login")
	{
		loginRoutes.POST("/admin", authController.Login)
		loginRoutes.POST("/teacher", teacherController.LoginTeacher)
		loginRoutes.POST("/student", studentController.LoginStudent)
		loginRoutes.GET("/check", utils.CheckToken(), func(c *gin.Context) {
			id := c.MustGet("_id").(string)
			username := c.MustGet("username").(string)
			role := c.MustGet("role").(string)
			token := c.MustGet("token").(string)
			c.JSON(http.StatusOK, gin.H{
				"username": username,
				"role":     role,
				"token":    token,
				"_id":      id,
			})
		})
	}

	authRoutes := router.Group("/admin")
	authRoutes.Use(utils.OAuth2Middleware())
	{
		authRoutes.POST("/register", utils.RoleAuth(models.RoleAdmin), authController.Register)
	}

	teacherRoutes := router.Group("/teachers")
	teacherRoutes.Use(utils.OAuth2Middleware())
	{
		teacherRoutes.POST("/uploadTeacher", utils.RoleAuth(models.RoleAdmin), teacherController.CreateTeacher)
		teacherRoutes.GET("/getTeachers", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), teacherController.GetTeachers)
		teacherRoutes.GET("/getTeacherByID/:id", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), teacherController.GetTeacherByID)
		teacherRoutes.PUT("/updateTeacher/:id", utils.RoleAuth(models.RoleAdmin), teacherController.UpdateTeacher)
		teacherRoutes.DELETE("/deleteTeacher/:id", utils.RoleAuth(models.RoleAdmin), teacherController.DeleteTeacher)
	}

	studentRoutes := router.Group("/students")
	studentRoutes.Use(utils.OAuth2Middleware())
	{
		studentRoutes.POST("/uploadStudent", utils.RoleAuth(models.RoleAdmin), studentController.CreateStudent)
		studentRoutes.GET("/getStudents", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), studentController.GetStudents)
		studentRoutes.GET("/getStudentByID/:code", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), studentController.GetStudentByID)
		studentRoutes.PUT("/updateStudent/:id", utils.RoleAuth(models.RoleAdmin), studentController.UpdateStudent)
		studentRoutes.DELETE("/deleteStudent/:id", utils.RoleAuth(models.RoleAdmin), studentController.DeleteStudent)
		studentRoutes.GET("/external-data", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), externalServiceController.PostExternalData)
	}

	studentTasksRoutes := router.Group("/studentTasks")
	studentTasksRoutes.Use(utils.OAuth2Middleware())
	{
		studentTasksRoutes.POST("/uploadStudentTasks", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), studentTasksController.CreateStudentTasks)
		studentTasksRoutes.GET("/getStudentTasks", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), studentTasksController.GetStudentTasks)
		studentTasksRoutes.GET("/getStudentTasksByID/:code", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), studentTasksController.GetStudentTasksByID)
		studentTasksRoutes.PUT("/updateTasksStudent/:id", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), studentTasksController.UpdateStudentTasks)
		studentTasksRoutes.DELETE("/deleteTasksStudent/:id", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), studentTasksController.DeleteStudentTasks)
	}

	lessonRoutes := router.Group("/lessons")
	lessonRoutes.Use(utils.OAuth2Middleware())
	{
		lessonRoutes.GET("/getLessons", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), lessonController.GetLessons)
		lessonRoutes.GET("/getLessonByID/:code", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), lessonController.GetLessonByID)
	}

	taskRoutes := router.Group("/tasks")
	taskRoutes.Use(utils.OAuth2Middleware())
	{
		taskRoutes.GET("/getTasks", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), taskController.GetTasks)
		taskRoutes.GET("/getTaskByID/:code", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), taskController.GetTaskByID)
	}

	topicRoutes := router.Group("/topics")
	topicRoutes.Use(utils.OAuth2Middleware())
	{
		topicRoutes.GET("/getTopics", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), topicController.GetTopics)
		topicRoutes.GET("/getTopicByID:code", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), topicController.GetTopicByID)
	}

	traitRoutes := router.Group("/traits")
	traitRoutes.Use(utils.OAuth2Middleware())
	{
		traitRoutes.GET("/getTraits", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), traitController.GetTraits)
		traitRoutes.GET("/getTraitByID/:code", utils.RoleAuth(models.RoleAdmin, models.RoleTeacher, models.RoleStudent), traitController.GetTraitByID)
	}
}
