package controllers

import (
	"net/http"

	"github.com/study/models"
	"github.com/study/services"

	"github.com/gin-gonic/gin"
)

type StudentTasksController struct {
	service *services.StudentTasksService
}

func NewStudentTasksController(service *services.StudentTasksService) *StudentTasksController {
	return &StudentTasksController{service: service}
}

func (c *StudentTasksController) CreateStudentTasks(ctx *gin.Context) {
	var student_tasks models.StudentTasks
	if err := ctx.ShouldBindJSON(&student_tasks); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.service.CreateStudentTasks(student_tasks); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "Student tasks created successfully"})
}

func (c *StudentTasksController) GetStudentTasks(ctx *gin.Context) {
	student_tasks, err := c.service.GetStudentTasks()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, student_tasks)
}

func (c *StudentTasksController) GetStudentTasksByID(ctx *gin.Context) {
	code := ctx.Param("code")

	student_tasks, err := c.service.GetStudentTasksByID(code)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, student_tasks)
}

func (c *StudentTasksController) UpdateStudentTasks(ctx *gin.Context) {
	id := ctx.Param("id")
	var student_tasks models.StudentTasks
	if err := ctx.ShouldBindJSON(&student_tasks); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.service.UpdateStudentTasks(id, student_tasks); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Student tasks updated successfully"})
}

func (c *StudentTasksController) DeleteStudentTasks(ctx *gin.Context) {
	id := ctx.Param("id")
	if err := c.service.DeleteStudentTasks(id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Student tasks deleted successfully"})
}
